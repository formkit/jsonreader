<template>
  <div class="min-h-screen">
    <!-- Hero Section with enhanced design -->
    <section class="relative py-20 overflow-hidden">
      <!-- Background falling blocks animation -->
      <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div class="falling-blocks-container">
          <div
            v-for="i in 20"
            :key="i"
            class="falling-block"
            :style="generateBlockStyle()"
          ></div>
          <!-- JSON symbol blocks -->
          <div
            v-for="i in 10"
            :key="`json-${i}`"
            class="falling-json-symbol"
            :style="generateJsonSymbolStyle()"
          >
            {{ getRandomJsonSymbol() }}
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center mb-12">
          <!-- Title with enhanced animation -->
          <div class="inline-block mb-6 relative fade-in">
            <div class="shimmer-effect px-4 py-3">
              <h1
                class="text-5xl md:text-7xl font-bold text-black leading-relaxed pb-2"
              >
                <Logo size="large" />
              </h1>
            </div>
          </div>

          <p
            class="text-xl text-balance md:text-2xl mb-8 text-black leading-loose fade-in-delayed"
          >
            Stream and process
            <span class="accent-text inline-block">JSON responses</span> from
            <span class="accent-text inline-block">AI tool calls</span> as they
            arrive—<br class="hidden md:block" />
            intelligently tracking state to produce valid JSON
            <span class="accent-text inline-block">before it's complete</span>
          </p>

          <div
            class="flex flex-wrap justify-center gap-4 mb-12 slide-up-delayed"
          >
            <a href="#get-started" class="btn">
              <span>Get Started</span>
            </a>
            <a
              href="https://github.com/formkit/jsonreader"
              target="_blank"
              class="btn relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 bg-white text-accent border border-accent hover:bg-accent/10 group github-btn"
            >
              <span class="flex items-center relative z-10">
                <!-- GitHub Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                Star on GitHub
                <span
                  class="ml-1 transition-transform group-hover:translate-x-1"
                  >→</span
                >
              </span>
            </a>
          </div>

          <!-- Simple Code Example -->
          <CodeBlock
            language="javascript"
            code="import { jsonReader } from '@formkit/jsonreader';

// Get a reader from a streaming response
const reader = response.body.getReader();

// Process JSON as it comes in
for await (const data of jsonReader(reader)) {
  // Use partial results immediately
  updateUI(data);
}"
            class="mt-12 max-w-3xl mx-auto fade-in"
          />
        </div>
      </div>
    </section>

    <!-- Features Section with enhanced cards -->
    <section class="py-16 bg-gray-50 border-t border-gray-200 relative">
      <div class="absolute inset-0 noise-bg opacity-30"></div>
      <div class="container mx-auto px-4 relative z-10">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-16 text-black relative"
        >
          Key Features
          <span
            class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-accent to-accent/20 rounded-full"
          ></span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
            class="feature-card slide-up-delayed card-noise"
            style="animation-delay: 0.1s"
          >
            <div class="feature-card-icon">
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
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">
              Ideal for AI Tool Calls
            </h3>
            <p class="text-black">
              Process JSON from AI tool calls as they stream, without waiting
              for the complete payload.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="feature-card slide-up-delayed card-noise"
            style="animation-delay: 0.3s"
          >
            <div class="feature-card-icon">
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
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">
              Incremental Updates
            </h3>
            <p class="text-black">
              Update your UI in real-time as data arrives, providing a more
              responsive user experience.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="feature-card slide-up-delayed card-noise"
            style="animation-delay: 0.5s"
          >
            <div class="feature-card-icon">
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
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">Path Extraction</h3>
            <p class="text-black">
              Target specific paths in your JSON and extract data as soon as
              those paths are available.
            </p>
          </div>

          <!-- Feature 4 -->
          <div
            class="feature-card slide-up-delayed card-noise"
            style="animation-delay: 0.7s"
          >
            <div class="feature-card-icon">
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
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">
              Smart State Tracking
            </h3>
            <p class="text-black">
              Intelligently tracks JSON state during streaming, allowing you to
              work with usable data before it's fully received.
            </p>
          </div>

          <!-- Feature 5 -->
          <div
            class="feature-card slide-up-delayed card-noise"
            style="animation-delay: 0.9s"
          >
            <div class="feature-card-icon">
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
                  d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">
              Developer Friendly
            </h3>
            <p class="text-black">
              Simple API with full TypeScript support and intuitive
              configuration, making integration into your project effortless.
            </p>
          </div>

          <!-- Feature 6 -->
          <div
            class="feature-card slide-up-delayed card-noise"
            style="animation-delay: 1.1s"
          >
            <div class="feature-card-icon">
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
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">
              Lightweight & Fast
            </h3>
            <p class="text-black">
              Super lightweight (1.6Kb min-gzip) and minimal overhead, ensuring
              maximum performance even with large streaming datasets.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Get Started Section (consolidated from getting-started page) -->
    <section id="get-started" class="py-16 border-t border-gray-200 relative">
      <div class="absolute inset-0 noise-bg opacity-30"></div>
      <div class="container mx-auto px-4 relative z-10 max-w-4xl">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-16 text-black relative"
        >
          Getting Started
          <span
            class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-accent to-accent/20 rounded-full"
          ></span>
        </h2>

        <!-- Dual License Section -->
        <div class="mb-16 fade-in">
          <h3
            class="text-2xl font-bold text-center mb-8 text-black relative inline-block"
          >
            Dual License
            <span
              class="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200 rounded-full"
            ></span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <!-- Free for Individual Use Card -->
            <div
              class="p-8 rounded-lg bg-white border border-gray-200 transition-all duration-300 flex flex-col h-full bg-gradient-to-br from-emerald-50/30 to-white"
            >
              <div class="flex items-center mb-6">
                <div
                  class="w-10 h-10 text-accent flex items-center justify-center bg-accent/5 rounded-full mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-black">
                  100% Free for Personal Use
                </h4>
              </div>
              <p class="text-gray-600 mb-8 flex-grow">
                Use jsonreader in your personal projects, open source
                contributions, and learning experiences at no cost.
              </p>
              <div class="flex items-end justify-between mt-auto">
                <span class="text-4xl font-bold text-black">$0</span>
                <span class="text-gray-500">Forever free</span>
              </div>
            </div>

            <!-- Commercial License Card -->
            <div
              class="p-8 rounded-lg bg-white border border-accent/20 transition-all duration-300 flex flex-col h-full bg-gradient-to-br from-accent/5 to-white"
            >
              <div class="flex items-center mb-6">
                <div
                  class="w-10 h-10 text-accent flex items-center justify-center bg-accent/5 rounded-full mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-black">Commercial License</h4>
              </div>
              <p class="text-gray-600 mb-8 flex-grow">
                For use in commercial projects and applications. Each license
                covers one commercial project.
              </p>
              <div class="flex items-end justify-between mb-6 mt-auto">
                <div>
                  <span class="text-4xl font-bold text-black">$10</span>
                  <span class="text-gray-500 ml-2">per project</span>
                </div>
                <span class="text-accent font-medium">One-time payment</span>
              </div>
              <a
                href="https://buy.stripe.com/14k7uU7jqc7x4jmdQS"
                target="_blank"
                class="w-full btn text-center bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-md transition-all duration-200 flex items-center justify-center"
              >
                <span>Buy Commercial License</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          <p class="text-sm text-gray-500 mt-4 text-center fade-in-delayed">
            Commercial license applies to one commercial project only. Each
            additional project requires a separate license.
          </p>
        </div>

        <h3
          class="text-2xl font-bold mb-6 text-black relative inline-block fade-in-delayed mt-24"
        >
          Installation
          <span
            class="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200 rounded-full"
          ></span>
        </h3>

        <CodeBlock
          language="bash"
          code="# Using npm
npm install jsonreader

# Using yarn
yarn add jsonreader

# Using pnpm
pnpm add jsonreader"
          class="card-noise fade-in-delayed mb-16"
          style="animation-delay: 0.2s"
        />

        <h3
          class="text-2xl font-bold mb-6 text-black relative inline-block fade-in-delayed mt-24"
        >
          How It Works
          <span
            class="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200 rounded-full"
          ></span>
        </h3>

        <div class="navigation-card fade-in-delayed mb-16">
          <div class="card-content">
            <p class="text-black mb-6">
              The <code class="inline-code">jsonreader</code> utility parses
              JSON data character by character as it arrives from a stream. It
              builds up a syntactically valid JSON structure as data comes in,
              closing any unclosed objects or arrays to create valid partial
              representations.
            </p>

            <div class="card-links">
              <div class="link-item">
                <div class="link-anchor">
                  <span class="link-title"
                    >Character-by-Character Processing</span
                  >
                </div>
                <p class="link-description">
                  For each chunk of data received, the stream is decoded from
                  Uint8Array to text and processed character by character,
                  enabling real-time JSON handling.
                </p>
              </div>

              <div class="link-item">
                <div class="link-anchor">
                  <span class="link-title">Path Tracking</span>
                </div>
                <p class="link-description">
                  Property paths are tracked as the parser encounters them,
                  allowing for targeted extraction of specific values as they
                  become available.
                </p>
              </div>

              <div class="link-item">
                <div class="link-anchor">
                  <span class="link-title">Valid Partial Results</span>
                </div>
                <p class="link-description">
                  When required properties are available, a partial result is
                  yielded with temporarily closed objects/arrays to ensure valid
                  JSON structure.
                </p>
              </div>

              <div class="link-item">
                <div class="link-anchor">
                  <span class="link-title">Continuous Stream Processing</span>
                </div>
                <p class="link-description">
                  The process continues incrementally until the stream is
                  complete, providing progressively more complete JSON objects
                  with each iteration.
                </p>
              </div>
            </div>

            <p class="text-black mt-8">
              This approach allows for real-time processing of JSON data without
              waiting for the entire payload to be received, making it ideal for
              streaming APIs and large datasets.
            </p>
          </div>
        </div>

        <h3
          class="text-2xl font-bold mb-6 text-black relative inline-block mt-24"
        >
          Basic Usage
          <span
            class="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200 rounded-full"
          ></span>
        </h3>

        <p class="doc-text mb-6">
          The simplest way to use jsonreader is to process JSON data as it
          streams in:
        </p>

        <CodeBlock
          language="javascript"
          code="import { jsonReader } from '@formkit/jsonreader';

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
          class="card-noise mb-16"
        />

        <p class="doc-text my-4">
          In this example, <code class="inline-code">partialData</code> will
          contain progressively more complete JSON objects as the data streams
          in.
        </p>

        <h3
          class="text-2xl font-bold mb-6 text-black relative inline-block mt-24"
        >
          Configuration Options
          <span
            class="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200 rounded-full"
          ></span>
        </h3>

        <div
          class="bg-gray-50 p-6 mb-8 rounded-lg border border-gray-200 card-noise"
        >
          <p class="text-black mb-6">
            jsonreader provides three powerful configuration options to control
            how streaming data is processed:
          </p>

          <h4
            class="font-bold text-lg mb-3 pl-4 border-l-4 border-accent text-black"
          >
            1. Required Option
          </h4>
          <p class="text-black mb-6 pl-4 ml-4">
            The <code class="inline-code">required</code> option lets you
            specify properties that must be fully received before any data is
            yielded. This ensures critical data is complete before processing
            begins.
          </p>

          <h4
            class="font-bold text-lg mb-3 pl-4 border-l-4 border-accent text-black"
          >
            2. Silent Option
          </h4>
          <p class="text-black mb-6 pl-4 ml-4">
            The <code class="inline-code">silent</code> option allows normal
            streaming of JSON, but pauses yielding while properties marked as
            "silent" are being received. This is useful for sensitive data that
            should only be processed when complete.
          </p>

          <h4
            class="font-bold text-lg mb-3 pl-4 border-l-4 border-accent text-black"
          >
            3. Assign Option
          </h4>
          <p class="text-black pl-4 ml-4">
            The <code class="inline-code">assign</code> option allows you to
            merge additional properties with each yielded chunk of data. This is
            useful for adding context, timestamps, or other metadata to every
            update.
          </p>
        </div>

        <CodeBlock
          language="javascript"
          code="import { jsonReader } from '@formkit/jsonreader';

for await (const data of jsonReader(reader, {
  // Won't yield anything until 'metadata' is complete
  required: ['metadata'],
  
  // Pauses yielding while 'sensitiveData' is streaming
  silent: ['sensitiveData'],
  
  // Add these properties to each yielded object
  assign: {
    timestamp: Date.now(),
    source: 'api-endpoint'
  }
})) {
  // Update UI with augmented data
  updateUI(data);
}"
          class="card-noise mb-16"
        />

        <h3
          class="text-2xl font-bold mb-6 text-black relative inline-block mt-24"
        >
          Using jsonPathReader
          <span
            class="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200 rounded-full"
          ></span>
        </h3>

        <p class="doc-text mb-6">
          Using jsonPathReader you can target specific paths in your JSON and
          yield those paths whenever they are completed. You can also use the
          <code class="inline-code">'*'</code> wildcard to match any property or
          array item at a given position.
        </p>

        <CodeBlock
          language="javascript"
          code="import { jsonPathReader } from '@formkit/jsonreader';

for await (const [value, path] of jsonPathReader(reader, [
  'results',
  'progress',
  'data.*.name'  // Wildcard to match all names
])) {
  if (path === 'results') {
    updateResultsList(value);
  } else if (path === 'progress') {
    updateProgressBar(value);
  } else if (path.includes('.')) {
    // Handle wildcard matches
    handleItem(path, value);
  }
}"
          class="card-noise mb-16"
        />

        <div class="flex justify-center mt-8">
          <a
            href="/docs/api-reference"
            class="btn relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 bg-white text-accent border border-accent hover:bg-accent/10 group github-btn"
          >
            <span class="flex items-center relative z-10">
              View Full API Reference
              <span class="ml-1 transition-transform group-hover:translate-x-1"
                >→</span
              >
            </span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import Logo from "../components/Logo.vue"
import CodeBlock from "../components/CodeBlock.vue"

// Function to get a random JSON symbol
const getRandomJsonSymbol = () => {
  const symbols = ["{", "}", "[", "]", ":", ",", '"', "."]
  return symbols[Math.floor(Math.random() * symbols.length)]
}

// Function to generate styles for JSON symbol blocks
const generateJsonSymbolStyle = () => {
  const left = Math.floor(Math.random() * 100) // Position across the screen
  const delay = Math.random() * 5 // Random delay
  const duration = Math.random() * 15 + 15 // Animation duration between 15-30s
  const size = Math.floor(Math.random() * 20) + 20 // Size between 20px and 40px
  const opacity = Math.random() * 0.1 + 0.05 // Low opacity between 0.05-0.15

  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: opacity,
    fontSize: `${size}px`,
    transform: `rotate(${Math.floor(Math.random() * 20 - 10)}deg)`, // Slight rotation
  }
}

// Function to generate random styles for falling blocks
const generateBlockStyle = () => {
  const size = Math.floor(Math.random() * 40) + 10 // Size between 10px and 50px
  const left = Math.floor(Math.random() * 100) // Position across the screen
  const delay = Math.random() * 5 // Random delay
  const duration = Math.random() * 10 + 10 // Animation duration between 10-20s
  const opacity = Math.random() * 0.08 + 0.02 // Low opacity between 0.02-0.1

  // Choose random shape type
  const shapeTypes = ["square", "rectangle", "circle", "diamond"]
  const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]

  // Base styles
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: opacity,
    transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
  }

  // Apply shape-specific styles
  if (shapeType === "rectangle") {
    styles.width = `${size * 1.5}px`
    styles.height = `${size * 0.7}px`
  } else if (shapeType === "circle") {
    styles.borderRadius = "50%"
  } else if (shapeType === "diamond") {
    styles.transform += " rotate(45deg)"
  }

  // Add subtle shadow
  styles.boxShadow = "0 0 8px rgba(0, 122, 255, 0.1)"

  return styles
}

// Create a grid pattern background effect for code blocks
const createBackgroundGridPattern = () => {
  if (process.client) {
    setTimeout(() => {
      const codeWindows = document.querySelectorAll(".code-window-content")
      codeWindows.forEach((codeWindow) => {
        if (!codeWindow.querySelector(".bg-grid-pattern")) {
          const gridPattern = document.createElement("div")
          gridPattern.classList.add("bg-grid-pattern")
          gridPattern.style.position = "absolute"
          gridPattern.style.inset = "0"
          gridPattern.style.opacity = "0.05"
          gridPattern.style.pointerEvents = "none"
          gridPattern.style.backgroundSize = "20px 20px"
          gridPattern.style.backgroundImage =
            "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)"
          codeWindow.appendChild(gridPattern)
        }
      })
    }, 100)
  }
}

// Create a scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Initialize any client-side effects
onMounted(() => {
  createBackgroundGridPattern()
})
</script>

<style scoped>
.animate-pulse-subtle {
  animation: pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

/* GitHub button hover effect */
.github-btn {
  position: relative;
  overflow: hidden;
}

.github-btn::after {
  content: "";
  position: absolute;
  width: 0;
  height: 200%;
  top: -50%;
  left: 50%;
  background: rgba(0, 122, 255, 0.1);
  border-radius: 40%;
  transform: translateX(-50%);
  transition: width 0.6s ease;
  z-index: 0;
}

.github-btn:hover::after {
  width: 110%;
}

/* Documentation styles */
.doc-heading-3 {
  @apply text-xl font-bold mb-6 mt-24 text-black relative;
}

.doc-text {
  @apply text-black leading-relaxed mb-6;
}

.inline-code {
  @apply font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded text-black border border-gray-200;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.pulse-glow {
  animation: glow 2s ease-in-out infinite alternate;
  display: inline-block;
  padding: 0 0.1em;
}

@keyframes glow {
  0% {
    text-shadow: 0 0 5px rgba(0, 122, 255, 0.5), 0 0 10px rgba(0, 122, 255, 0.2);
  }
  100% {
    text-shadow: 0 0 10px rgba(0, 122, 255, 0.5),
      0 0 20px rgba(0, 122, 255, 0.2);
  }
}

/* Navigation Card Styles */
.navigation-card {
  position: relative;
  margin: 2.5rem 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--color-bg-card),
    var(--color-bg-card-secondary)
  );
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(var(--color-accent-rgb), 0.1);
  border-radius: 0.5rem;
}

.navigation-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-accent),
    rgba(var(--color-accent-rgb), 0.5)
  );
}

.card-content {
  padding: 1.75rem;
}

.card-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.link-item {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.link-anchor {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-accent);
  text-decoration: none;
  margin-bottom: 0.375rem;
}

.link-icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  opacity: 0.8;
}

.link-title {
  color: var(--color-accent);
  font-size: 1.1rem;
  font-weight: 600;
}

.link-description {
  font-size: 0.9rem;
  margin-left: 0;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

/* Falling Blocks Animation */
.falling-blocks-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.falling-block {
  position: absolute;
  top: -60px;
  background-color: var(--color-accent, #3b82f6);
  border-radius: 4px;
  animation: fall linear infinite;
  z-index: 0;
}

.falling-json-symbol {
  position: absolute;
  top: -60px;
  color: var(--color-accent, #3b82f6);
  font-family: monospace;
  font-weight: bold;
  animation: fall linear infinite;
  z-index: 0;
  text-shadow: 0 0 5px rgba(59, 130, 246, 0.15);
}

@keyframes fall {
  0% {
    transform: translateY(-100px) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}
</style>
