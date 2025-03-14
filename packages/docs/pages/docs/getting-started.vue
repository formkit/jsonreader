<template>
  <div class="doc-container relative">
    <div class="absolute inset-0 noise-bg opacity-40"></div>
    <div class="relative z-10">
      <h1 class="doc-heading-1 shimmer-effect">
        Getting Started with jsonreader
      </h1>

      <div
        class="bg-accent/10 p-4 mb-8 rounded-lg border border-accent/30 card-noise fade-in"
      >
        <div class="flex items-start">
          <div class="text-accent mr-3 pulse-glow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
          <div>
            <p class="text-black">
              jsonreader is a specialized utility for processing JSON data from
              streams in real-time, with a particular focus on handling
              responses from AI tool calls efficiently.
            </p>
          </div>
        </div>
      </div>

      <h2 class="doc-heading-2 fade-in">Installation</h2>

      <p class="doc-text fade-in-delayed">
        Add jsonreader to your project using your preferred package manager:
      </p>

      <CodeBlock
        language="bash"
        code="# Using npm
npm install jsonreader

# Using yarn
yarn add jsonreader

# Using pnpm
pnpm add jsonreader"
        class="fade-in-delayed"
        style="animation-delay: 0.2s"
      />

      <h2 class="doc-heading-2 fade-in-delayed" style="animation-delay: 0.3s">
        Why Use jsonreader?
      </h2>

      <p class="doc-text fade-in-delayed" style="animation-delay: 0.4s">
        When working with AI tool calls or any large JSON responses, jsonreader
        provides several key advantages:
      </p>

      <ol class="doc-list fade-in-delayed" style="animation-delay: 0.5s">
        <li class="doc-list-item">
          <span class="accent-text">Process data as it arrives</span>: Don't
          wait for the entire API response to complete.
        </li>
        <li class="doc-list-item">
          <span class="accent-text">Early UI updates</span>: Show users results
          immediately as they become available.
        </li>
        <li class="doc-list-item">
          <span class="accent-text">Path-specific extraction</span>: Access
          specific parts of the JSON as soon as they appear in the stream.
        </li>
        <li class="doc-list-item">
          <span class="accent-text">Optimized for AI tools</span>: Perfect for
          processing responses from AI function calls that can be large and slow
          to complete.
        </li>
      </ol>

      <h2 class="doc-heading-2 fade-in-delayed" style="animation-delay: 0.6s">
        Basic Usage
      </h2>

      <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.7s">
        Streaming JSON Processing
      </h3>

      <p class="doc-text fade-in-delayed" style="animation-delay: 0.8s">
        The simplest way to use jsonreader is to process JSON data as it streams
        in:
      </p>

      <CodeBlock
        language="javascript"
        code="import { jsonReader } from 'jsonreader';

async function processStreamingData() {
  // Get a stream from somewhere (e.g., fetch API)
  const response = await fetch('https://api.ai-service.com/v1/generate');
  const reader = response.body.getReader();
  
  // Process JSON as it comes in
  for await (const partialData of jsonReader(reader)) {
    console.log('Received partial data:', partialData);
    
    // Update your UI with partial data
    updateUI(partialData);
  }
}"
        class="fade-in-delayed"
        style="animation-delay: 0.9s"
      />

      <p class="doc-text">
        In this example, <code class="inline-code">partialData</code> will
        contain progressively more complete JSON objects as the data streams in.
        Each iteration yields the most complete JSON structure possible with the
        data received so far.
      </p>

      <h3 class="doc-heading-3">Extracting Specific Paths</h3>

      <p class="doc-text">
        You can also extract specific paths from the JSON as they become
        available:
      </p>

      <CodeBlock
        language="javascript"
        code="import { jsonReader } from 'jsonreader';

async function processToolResults() {
  const response = await fetch('https://api.ai-service.com/v1/generate');
  const reader = response.body.getReader();
  
  // Extract the 'results' array as soon as elements appear
  for await (const { results } of jsonReader(reader, {
    required: ['results']
  })) {
    if (results?.length) {
      // Process each batch of results as they arrive
      for (const item of results) {
        renderResultItem(item);
      }
    }
  }
}"
      />

      <p class="doc-text">
        This approach is particularly useful when working with AI tool calls
        that may return large arrays of results that you want to display
        incrementally as they become available.
      </p>

      <h2 class="doc-heading-2">Using jsonPathReader</h2>

      <p class="doc-text">
        For more targeted extraction of specific JSON paths, you can use the
        <code class="inline-code">jsonPathReader</code> function:
      </p>

      <CodeBlock
        language="javascript"
        code="import { jsonPathReader } from 'jsonreader';

// Define paths to extract
const paths = [
  'results',
  'progress',
  'metadata.timing',
  'items.*.id' // Use wildcard to match all item IDs
];

for await (const [value, path] of jsonPathReader(reader, paths)) {
  if (path === 'results') {
    updateResultsList(value);
  } else if (path === 'progress') {
    updateProgressBar(value);
  } else if (path.startsWith('items.') && path.endsWith('.id')) {
    // Handle individual item IDs matched by the wildcard
    trackItem(value);
  }
}"
        class="fade-in-delayed"
        :style="{ animationDelay: '0.3s' }"
      />

      <p class="doc-text">
        The <code class="inline-code">jsonPathReader</code> approach is ideal
        when you need to handle updates to multiple specific paths
        independently. It yields each value and path as a tuple ([value, path])
        as soon as they change in the stream. You can use the
        <code class="inline-code">'*'</code> wildcard character in path segments
        to match any property name or array index at that position.
      </p>

      <h2 class="doc-heading-2">Error Handling</h2>

      <p class="doc-text">JSONReader will throw an error when parsing fails:</p>

      <CodeBlock
        language="javascript"
        code="try {
  for await (const data of jsonReader(reader)) {
    // Process JSON data
    updateUI(data);
  }
} catch (error) {
  // Handle any errors
  console.error('Error processing JSON:', error);
}"
        class="fade-in-delayed"
        :style="{ animationDelay: '0.3s' }"
      />

      <NavigationCard
        title="Next Steps"
        :links="[
          {
            title: 'API Reference',
            url: '/docs/api-reference',
            description: 'Explore the complete API documentation',
          },
          {
            title: 'Examples',
            url: '/docs/examples',
            description: 'See more detailed examples',
          },
          {
            title: 'GitHub Repository',
            url: 'https://github.com/formkit/jsonreader',
            description: 'View the source code and contribute',
            external: true,
          },
        ]"
      />
    </div>

    <!-- Decorative elements -->
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
