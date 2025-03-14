import JSON5 from "json5";
import { eq } from "@formkit/utils";

/**
 * Options for controlling how the JSON reader yields progress
 */
export interface JsonReaderOptions {
  /**
   * Required properties that must be present before yielding a result
   */
  required?: string[];
  
  /**
   * Properties to exclude from partial results
   */
  silent?: string[];
  
  /**
   * Additional values to assign to each yielded result
   */
  assign?: Record<string, any>;
}

/**
 * An async generator function that reads the stream as it arrives and yields a progressively updated input until it
 * is complete.
 * @param reader - ReadableStreamDefaultReader<Uint8Array>
 * @param options - Options for how to yield the progress.
 */
export async function* jsonReader(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  options?: JsonReaderOptions
) {
  const decoder = new TextDecoder();
  const buffer: string[] = [];
  const propertyPath: string[] = [];
  const depthMap: Array<"{" | "["> = [];
  let readingProperty = false;
  let willBeReadingProperty = false;
  // let readingValue = false;
  let currentProperty = "";
  let currentValue = "";
  let idx = 0;
  let lastChar = "";
  let isQuoted = false;
  let requiredPropertiesCompleted: boolean | undefined =
    !options?.required?.length;
  let completedProperties: string[] = [];
  let propertyComplete = false;
  let lastYield = {};
  let didYield = false;
  let isEscaped = false;

  const parentIsObject = () => depthMap[depthMap.length - 1] === "{";
  const parentIsArray = () => depthMap[depthMap.length - 1] === "[";

  for await (const chunk of read(reader)) {
    buffer.push(...[...decoder.decode(chunk)]);
    while (idx < buffer.length) {
      const char = buffer[idx++];
      isEscaped = lastChar === "\\";
      lastChar = char;

      if (willBeReadingProperty && char.trim() !== "") {
        readingProperty = true;
        willBeReadingProperty = false;
      }

      if (propertyComplete && char.trim() !== "") {
        readingProperty = false;
        propertyComplete = false;
      }
      // Skip escaped characters
      if (!isEscaped && (!isQuoted || char === '"')) {
        switch (char) {
          case '"':
            isQuoted = !isQuoted;
            break;
          case "{":
            currentProperty = "";
            willBeReadingProperty = true;
            depthMap.push(char);
            continue;
          case "[":
            readingProperty = false;
            depthMap.push(char);
            propertyPath.push("0");
            continue;
          case ":":
            propertyComplete = true;
            currentValue = "";
            propertyPath.push(trim(currentProperty, /["' \n]/));
            continue;
          case "}":
          case "]":
            depthMap.pop();
            currentProperty = "";
            currentValue = "";
            completedProperties.push(propertyPath.join("."));
            propertyPath.pop();
            continue;
          case ",":
            if (parentIsObject() && !readingProperty) {
              willBeReadingProperty = true;
              currentProperty = "";
              completedProperties.push(propertyPath.join("."));
              currentValue = "";
              propertyPath.pop();
            } else if (parentIsArray()) {
              const newIndex =
                parseInt(propertyPath[propertyPath.length - 1]) + 1;
              propertyPath.pop();
              propertyPath.push(newIndex.toString());
              completedProperties.push(propertyPath.join("."));
              currentValue = "";
            }
            continue;
        }
      }
      if (readingProperty) {
        currentProperty += char;
      } else if (isQuoted || !/\s/.test(char) || isBool(currentValue, char)) {
        currentValue += char;
      }
    }
    if (isEscaped) {
      // We dont track the "level" of the escape, so we skip it.
      continue;
    }
    if (isBool(currentValue, "", false)) {
      // If it is an incomplete boolean, like "tru" or "fal" we skip it.
      continue;
    }
    // Determine whether or not to yield a chunk. We should yield if
    // 1. All the required properties have been completed
    // 2. Any new properties were completed
    // 3. We are not processing the property of an object
    // 4. The current property being read is not "silent"
    if (!requiredPropertiesCompleted) {
      requiredPropertiesCompleted = options?.required?.every((prop) =>
        completedProperties.includes(prop)
      );
    }

    if (propertyComplete && currentValue.trim() === "") {
      // We are at a position like: `{ type: `, so we cannot parse the value yet.
      continue;
    }

    let currentSilentPropertyPath: string[] | false = false;
    if (options?.silent) {
      for (const silentPath of options.silent) {
        if (isSilentPath(propertyPath, silentPath)) {
          currentSilentPropertyPath = propertyPath.slice(
            0,
            silentPath.split(".").length
          );
        }
      }
    }

    if (requiredPropertiesCompleted && !readingProperty) {
      let incompleteJSON = buffer.join("");
      if (incompleteJSON.trim() === "") {
        continue;
      }
      if (isQuoted) {
        if (lastChar === "\\") {
          incompleteJSON = incompleteJSON.slice(0, -1);
        }
        incompleteJSON += '"';
      }
      for (let i = depthMap.length - 1; i >= 0; i--) {
        incompleteJSON += depthMap[i] === "{" ? "}" : "]";
      }

      try {
        let parsedValue = Object.assign(
          {},
          options?.assign ?? {},
          JSON5.parse(incompleteJSON)
        );

        // Delete the silent properties that are not yet completed.
        if (currentSilentPropertyPath) {
          let current = parsedValue;
          for (const [index, segment] of currentSilentPropertyPath.entries()) {
            if (index < currentSilentPropertyPath.length - 1) {
              current = current[segment];
            } else {
              delete current[segment];
            }
          }
        }

        parsedValue = removeEmptyValues(parsedValue);
        if (!eq(parsedValue, lastYield)) {
          lastYield = parsedValue;
          didYield = true;
          yield parsedValue;
        }
      } catch (err) {
        console.warn(
          `Could not parse JSON: ${incompleteJSON}, buffer: ${buffer.join()}`
        );
      }
    }
  }
  if (!didYield && buffer.join("").trim() !== "") {
    yield Object.assign(
      {},
      options?.assign ?? {},
      JSON5.parse(buffer.join(""))
    );
  }
}

/**
 * Checks if a property path should be silenced based on a silent path pattern
 * 
 * @param propertyPath - Current property path as an array of segments
 * @param silentPath - Path pattern to check against (supports * as wildcard)
 * @returns True if the property should be silenced
 */
function isSilentPath(propertyPath: string[], silentPath: string) {
  const silentSegments = silentPath.split(".");
  const currentSegments = propertyPath;
  return (
    silentSegments.length <= currentSegments.length &&
    silentSegments.every((segment, index) => {
      if (segment === "*") return true;
      return segment === currentSegments[index];
    })
  );
}

/**
 * Removes empty values from an object or array recursively.
 * @param obj - The object or array to clean.
 * @returns A new object or array with empty values removed.
 */
export function removeEmptyValues<
  T extends Record<string, unknown> | unknown[] | unknown
>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyValues)
      .filter((v) => v !== null && v !== undefined) as T;
  }

  const result: Record<string, any> = {};
  for (const key in obj) {
    const value = removeEmptyValues(obj[key]);
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  }
  return result as T;
}

/**
 * Read the stream as JSON, but only yields values at the given paths when they are complete.
 * @param reader - The reader to read from
 * @param paths - An array of dot-notation paths (where * can be used as a wildcard)
 */
export async function* jsonPathReader<Paths extends string[]>(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  paths: Paths
): AsyncGenerator<[any, Paths[number]]> {
  if (!paths?.length) {
    return;
  }
  const ignoredProperties = new Set<string>();

  // Helper to check if a path is a subpath of any target path
  const isSubpathOfTarget = (path: string) => {
    return paths.some((targetPath) => {
      const targetSegments = targetPath.split(".");
      const pathSegments = path.split(".");
      return (
        pathSegments.length < targetSegments.length &&
        targetSegments.slice(0, pathSegments.length).join(".") === path
      );
    });
  };
  
  // Process each chunk of JSON data as it arrives
  for await (const chunk of jsonReader(reader, { silent: paths })) {
    // Stack for iterative traversal of nested objects/arrays
    const stack: Array<{ obj: any; path: string }> = [{ obj: chunk, path: "" }];

    while (stack.length > 0) {
      const { obj, path } = stack.pop()!;

      if (typeof obj !== "object" || obj === null) continue;

      for (const key in obj) {
        const fullPath = path ? `${path}.${key}` : key;

        if (ignoredProperties.has(fullPath)) {
          delete obj[key];
          continue;
        }

        const value = obj[key];

        for (const p of paths) {
          if (isSilentPath(fullPath.split("."), p)) {
            yield [value, p] as const;
            ignoredProperties.add(fullPath);
            delete obj[key];
            break;
          }
        }

        if (!ignoredProperties.has(fullPath)) {
          if (!isSubpathOfTarget(fullPath)) {
            ignoredProperties.add(fullPath);
            delete obj[key];
          } else if (typeof value === "object" && value !== null) {
            stack.push({ obj: value, path: fullPath });
          }
        }
      }
    }
  }
}

/**
 * Check if the current value is adding up to a boolean.
 * @param currentValue - The current value being read.
 * @param char - The current character being read.
 * @param allowComplete - Whether to allow complete boolean values
 * @returns True if the current value is a boolean, false otherwise.
 */
function isBool(currentValue: string, char: string, allowComplete = true) {
  const partial = `${currentValue.trim()}${char}`;
  if (!partial) return false;
  if (!allowComplete && (partial === "true" || partial === "false")) {
    return false;
  }
  return "true".startsWith(partial) || "false".startsWith(partial);
}

/**
 * An async generator to read the stream one chunk at a time.
 * @param reader - ReadableStreamDefaultReader<Uint8Array>
 */
export async function* read<T>(
  reader: ReadableStreamDefaultReader<T>
): AsyncGenerator<T> {
  let value: T | undefined = undefined;
  let done = false;
  do {
    ({ value, done } = await reader.read());
    if (value !== undefined) yield value;
  } while (!done);
}

/**
 * Trim a string by removing specified characters
 * @param s - String to trim
 * @param chars - Regular expression of characters to trim
 * @returns Trimmed string
 */
export function trim(s: string, chars: RegExp): string {
  // Trim from the start
  let start = 0;
  while (start < s.length && chars.test(s[start])) {
    start++;
  }

  // Trim from the end
  let end = s.length - 1;
  while (end > start && chars.test(s[end])) {
    end--;
  }

  return s.slice(start, end + 1);
}

export default {
  jsonReader,
  jsonPathReader,
  removeEmptyValues,
  read,
  trim
}; 