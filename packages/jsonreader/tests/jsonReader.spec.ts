import { describe, it, vi } from "vitest";
import { createStream } from "./helpers/streamHelpers";
import { jsonReader, jsonPathReader } from "../src";

describe("streaming json", () => {
  it("doesnt warn when empty", async ({ expect }) => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const stream = createStream(" ");
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {
      required: [],
      silent: undefined,
      assign: { foo: "bar" },
    })) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`[]`);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
  it("can yield an empty object", async ({ expect }) => {
    const stream = createStream("{}");
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {
      required: [],
      silent: undefined,
      assign: { foo: "bar" },
    })) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "foo": "bar",
        },
      ]
    `);
  });
  it("can only yields when values are being read", async ({ expect }) => {
    const stream = createStream('{ "foo": "bar" }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader())) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "foo": "",
        },
        {
          "foo": "b",
        },
        {
          "foo": "ba",
        },
        {
          "foo": "bar",
        },
      ]
    `);
  });

  it("only yields when values are read with multiple properties", async ({
    expect,
  }) => {
    const stream = createStream('{ "foo": "b", "cat": 123 }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader())) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "foo": "",
        },
        {
          "foo": "b",
        },
        {
          "cat": 1,
          "foo": "b",
        },
        {
          "cat": 12,
          "foo": "b",
        },
        {
          "cat": 123,
          "foo": "b",
        },
      ]
    `);
  });

  it("only yields when required properties are complete", async ({
    expect,
  }) => {
    const stream = createStream('{ "foo": "bar", "baz": 123 }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {
      required: ["foo"],
    })) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "foo": "bar",
        },
        {
          "baz": 1,
          "foo": "bar",
        },
        {
          "baz": 12,
          "foo": "bar",
        },
        {
          "baz": 123,
          "foo": "bar",
        },
      ]
    `);
  });

  it("can yield array property values", async ({ expect }) => {
    const stream = createStream('{ "foo": ["one", "two", 123], "baz": [123] }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader())) {
      yields.push(obj);
    }
    expect(yields).toMatchSnapshot();
  });

  it("is fault tolerant to missing quote marks", async ({ expect }) => {
    const stream = createStream('{ foo: "bar" }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {})) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "foo": "",
        },
        {
          "foo": "b",
        },
        {
          "foo": "ba",
        },
        {
          "foo": "bar",
        },
      ]
    `);
  });

  it("can have required properties that are arrays", async ({ expect }) => {
    const stream = createStream('{ foo: ["first", "last"], bar: 10 }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {
      required: ["foo"],
    })) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "foo": [
            "first",
            "last",
          ],
        },
        {
          "bar": 1,
          "foo": [
            "first",
            "last",
          ],
        },
        {
          "bar": 10,
          "foo": [
            "first",
            "last",
          ],
        },
      ]
    `);
  });
  it("can have required properties that are nested", async ({ expect }) => {
    const stream = createStream(
      '{ foo: { bim: "here", baz: 123 }, "hello": "world" }'
    );
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {
      required: ["foo.bim"],
    })) {
      yields.push(obj);
    }
    expect(yields).toMatchSnapshot();
  });

  it("wont emit when reading a silent property value", async ({ expect }) => {
    const stream = createStream(
      '{ type: "str", "format": ["123", 465], "value": "1" }'
    );
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {
      required: ["type"],
      silent: ["format"],
    })) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "type": "str",
        },
        {
          "format": [
            "123",
            465,
          ],
          "type": "str",
        },
        {
          "format": [
            "123",
            465,
          ],
          "type": "str",
          "value": "",
        },
        {
          "format": [
            "123",
            465,
          ],
          "type": "str",
          "value": "1",
        },
      ]
    `);
  });
  it("can handle escaped double quotes", async ({ expect }) => {
    const stream = createStream('{ "foo": "bar\\"baz\\"" }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader())) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "foo": "",
        },
        {
          "foo": "b",
        },
        {
          "foo": "ba",
        },
        {
          "foo": "bar",
        },
        {
          "foo": "bar\"b",
        },
        {
          "foo": "bar\"ba",
        },
        {
          "foo": "bar\"baz",
        },
        {
          "foo": "bar\"baz\"",
        },
      ]
    `);
  });

  it("can be silent for all items in an array", async ({ expect }) => {
    const stream = createStream('{ "foo": [{f: 1}, {b: 2, c: 3}, "345"] }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {
      silent: ["foo.*"],
    })) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "foo": [],
        },
        {
          "foo": [
            {
              "f": 1,
            },
          ],
        },
        {
          "foo": [
            {
              "f": 1,
            },
            {
              "b": 2,
              "c": 3,
            },
          ],
        },
        {
          "foo": [
            {
              "f": 1,
            },
            {
              "b": 2,
              "c": 3,
            },
            "345",
          ],
        },
      ]
    `);
  });

  it("does not return early when dealing with nested strings of json", async ({
    expect,
  }) => {
    const stream = createStream(
      `{"response":{"routes":[{"prompt_name":"routeEditInput","instructions_for_prompt":"Translate this input to German","arguments_for_prompt":[{"key":"rewritten_prompt","value":"Translate this input to German"},{"key":"rewritten_input","value":"{\\"type\\":\\"page_break\\",\\"idx\\":\\"1\\",\\"key\\":\\"fvumampbuem\\",\\"content\\":\\"$: \\\\\\"User Login\\\\\\"\\"}"}]}]}}`
    );
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader(), {
      silent: ["response.routes.*"],
    })) {
      yields.push(obj);
    }
    expect(yields).toMatchSnapshot();
  });

  it("does not yield incomplete boolean values", async ({ expect }) => {
    const stream = createStream('{ "isComplete": true }');
    const yields: any[] = [];
    for await (const obj of jsonReader(stream.getReader())) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        {
          "isComplete": true,
        },
      ]
    `);
  });
});

describe("jsonPathReader", () => {
  it("yields values when array items match wildcard paths", async ({
    expect,
  }) => {
    const stream = createStream(`
      {
        "items": [
          {
            "id": 1,
            "data": "first"
          },
          {
            "id": 2,
            "data": "second"
          },
          {
            "id": 3,
            "data": "third"
          }
        ]
      }
    `);

    const yields: any[] = [];
    for await (const obj of jsonPathReader(stream.getReader(), ["items.*"])) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        [
          {
            "data": "first",
            "id": 1,
          },
          "items.*",
        ],
        [
          {
            "data": "second",
            "id": 2,
          },
          "items.*",
        ],
        [
          {
            "data": "third",
            "id": 3,
          },
          "items.*",
        ],
      ]
    `);
  });

  it("yields values for deep properties and root properties", async ({
    expect,
  }) => {
    const stream = createStream(`{
        "rootProp": "root value",
        "nested": {
          "deep": {
            "property": "deep value",
            "other": "ignored"
          },
          "ignored": true
        },
        "alsoIgnored": false
      }`);

    const yields: any[] = [];
    for await (const obj of jsonPathReader(stream.getReader(), [
      "rootProp",
      "nested.deep.property",
    ])) {
      yields.push(obj);
    }
    expect(yields).toMatchInlineSnapshot(`
      [
        [
          "root value",
          "rootProp",
        ],
        [
          "deep value",
          "nested.deep.property",
        ],
      ]
    `);
  });
});
