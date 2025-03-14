<template>
  <div class="doc-container relative">
    <div class="absolute inset-0 noise-bg opacity-40"></div>
    <div class="relative z-10">
      <h1 class="doc-heading-1 shimmer-effect">API Reference</h1>

      <div class="doc-section">
        <h2 class="doc-heading-2 fade-in">jsonReader</h2>

        <p class="doc-text fade-in-delayed">
          The main function for processing streaming JSON data. It yields
          progressively more complete JSON objects as data arrives.
        </p>

        <CodeBlock
          language="javascript"
          code="import { jsonReader } from '@formkit/jsonreader';

for await (const partialData of jsonReader(reader)) {
  // Process the partial data
  console.log(partialData);
}"
          class="card-noise fade-in-delayed"
          style="animation-delay: 0.2s"
        />

        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.3s">
          Parameters
        </h3>

        <div
          class="overflow-x-auto mt-4 mb-6 fade-in-delayed"
          style="animation-delay: 0.4s"
        >
          <table class="w-full border-collapse card-noise">
            <thead>
              <tr class="bg-accent/5">
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Parameter
                </th>
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Type
                </th>
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">reader</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">ReadableStreamDefaultReader</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  A reader object from a readable stream, typically obtained
                  from
                  <code class="inline-code">response.body.getReader()</code>.
                </td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">options</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">Object</code> (optional)
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  Configuration options for the reader.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.5s">
          Options
        </h3>

        <div
          class="overflow-x-auto mt-4 mb-6 fade-in-delayed"
          style="animation-delay: 0.6s"
        >
          <table class="w-full border-collapse card-noise">
            <thead>
              <tr class="bg-accent/5">
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Option
                </th>
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Type
                </th>
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">required</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">string[]</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  Array of paths that must be present before yielding a result.
                </td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">silent</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">string[]</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  Array of paths to exclude from the yielded results.
                </td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">assign</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">Object</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  Object with properties to add to each yielded result.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.7s">
          Advanced Usage
        </h3>

        <p class="doc-text fade-in-delayed" style="animation-delay: 0.8s">
          Using options to customize behavior:
        </p>

        <CodeBlock
          language="javascript"
          code="import { jsonReader } from '@formkit/jsonreader';

for await (const partialData of jsonReader(reader, {
  // Only yield when these properties are present
  required: ['status', 'results', 'metadata.timing'],
  
  // Don't include these properties in results
  silent: ['sensitiveData'],
  
  // Add these properties to each yielded object
  assign: {
    timestamp: Date.now(),
    requestId: '12345'
  }
})) {
  updateUI(partialData);
}"
          class="card-noise fade-in-delayed"
          style="animation-delay: 0.9s"
        />
      </div>

      <div class="doc-section fade-in-delayed" style="animation-delay: 1s">
        <h2 class="doc-heading-2">jsonPathReader</h2>

        <p class="doc-text fade-in-delayed">
          A specialized function for extracting values from specific JSON paths
          as data arrives. This is useful when you only care about certain paths
          within a larger JSON structure.
        </p>

        <CodeBlock
          language="javascript"
          code="import { jsonPathReader } from '@formkit/jsonreader';

const reader = response.body.getReader();
const paths = [
  'results',
  'metadata.timing',
  'users.*.name' // Wildcard to match names of all users
];

for await (const [value, path] of jsonPathReader(reader, paths)) {
  // Each iteration yields a specific value and its path as a tuple
  console.log(`Path: ${path}, Value:`, value);
  
  if (path === 'results' && Array.isArray(value)) {
    // Handle results array
    renderResults(value);
  } else if (path.startsWith('users.') && path.endsWith('.name')) {
    // Handle individual user names matched by wildcard
    updateUserName(path.split('.')[1], value);
  }
}"
          class="card-noise fade-in-delayed"
          style="animation-delay: 0.2s"
        />

        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.3s">
          Parameters
        </h3>

        <div
          class="overflow-x-auto mt-4 mb-6 fade-in-delayed"
          style="animation-delay: 0.4s"
        >
          <table class="w-full border-collapse card-noise">
            <thead>
              <tr class="bg-accent/5">
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Parameter
                </th>
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Type
                </th>
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">reader</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">ReadableStreamDefaultReader</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  A reader object from a readable stream, typically obtained
                  from
                  <code class="inline-code">response.body.getReader()</code>.
                </td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">paths</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">string[] | string</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  One or more path strings to extract from the JSON data. For
                  example,
                  <code class="inline-code"
                    >['results', 'metadata.timing']</code
                  >
                  or <code class="inline-code">'results'</code>. You can use
                  <code class="inline-code">'*'</code> as a wildcard path
                  segment to match any property or array item at that location
                  (e.g., <code class="inline-code">'users.*.name'</code> or
                  <code class="inline-code">'items.*.id'</code>).
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.5s">
          Return Value
        </h3>

        <p class="doc-text fade-in-delayed" style="animation-delay: 0.6s">
          The <code class="inline-code">jsonPathReader</code> function returns
          an async generator that yields tuples containing:
        </p>

        <div
          class="overflow-x-auto mt-4 mb-6 fade-in-delayed"
          style="animation-delay: 0.7s"
        >
          <table class="w-full border-collapse card-noise">
            <thead>
              <tr class="bg-accent/5">
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Element
                </th>
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Type
                </th>
                <th
                  class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">value</code> (index 0)
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">any</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  The value found at the matching path.
                </td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200">
                  <code class="inline-code">path</code> (index 1)
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  <code class="inline-code">string</code>
                </td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">
                  The specific path from your provided paths array that was
                  matched.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.8s">
          Advanced Usage Example
        </h3>

        <CodeBlock
          language="javascript"
          code="import { jsonPathReader } from '@formkit/jsonreader';

async function searchWithRealtimeResults() {
  const response = await fetch('https://api.search-service.com/search?q=jsonreader');
  const reader = response.body.getReader();
  let resultCount = 0;
  let lastTimingUpdate = null;

  // Monitor both search results and timing information
  for await (const [value, path] of jsonPathReader(reader, [
    'results',
    'metadata.timing',
    'status'
  ])) {
    if (path === 'results' && Array.isArray(value)) {
      // New results have arrived
      const newResults = value.slice(resultCount);
      resultCount = value.length;
      
      // Update the UI with just the new results
      appendResultsToUI(newResults);
      updateResultCounter(resultCount);
    }
    
    if (path === 'metadata.timing') {
      // Update performance metrics in real-time
      lastTimingUpdate = value;
      updateTimingDisplay(value);
    }
    
    if (path === 'status' && value === 'complete') {
      // Search is done
      showCompletionMessage();
    }
  }
}"
          class="card-noise fade-in-delayed"
          style="animation-delay: 0.9s"
        />
      </div>

      <div class="doc-section fade-in-delayed" style="animation-delay: 1.1s">
        <h2 class="doc-heading-2">Error Handling</h2>

        <p class="doc-text">
          jsonReader and jsonPathReader will throw an error when parsing fails.
          You should use a try/catch block to handle these errors:
        </p>

        <CodeBlock
          language="javascript"
          code="try {
  for await (const data of jsonReader(reader)) {
    // Process data
    console.log(data);
  }
} catch (error) {
  // Handle error
  console.error('JSON parsing error:', error);
}"
          class="card-noise fade-in-delayed"
          style="animation-delay: 0.3s"
        />
      </div>

      <NavigationCard
        title="Further Reading"
        :links="[
          {
            title: 'Getting Started Guide',
            url: '/docs/getting-started',
            description: 'Basic usage and concepts',
          },
          {
            title: 'Examples',
            url: '/docs/examples',
            description: 'Real-world usage patterns',
          },
          {
            title: 'GitHub Repository',
            url: 'https://github.com/formkit/jsonreader',
            description: 'Source code and issues',
            external: true,
          },
        ]"
      />
    </div>

    <!-- Floating decorative elements -->
    <div
      class="fixed top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl pointer-events-none"
    ></div>
    <div
      class="fixed bottom-40 left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-accent/5 to-transparent blur-3xl pointer-events-none"
    ></div>
  </div>
</template>

<script setup>
import NavigationCard from "../../components/NavigationCard.vue"
import CodeBlock from "../../components/CodeBlock.vue"

// Create a scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
</script>
