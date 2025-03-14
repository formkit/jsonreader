<template>
  <div class="doc-container relative">
    <div class="absolute inset-0 noise-bg opacity-40"></div>
    <div class="relative z-10">
      <h1 class="doc-heading-1 shimmer-effect">Examples</h1>

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
              Practical examples showing how to use jsonreader in real-world
              scenarios.
            </p>
          </div>
        </div>
      </div>

      <div class="doc-section">
        <h2 class="doc-heading-2 fade-in-delayed">Processing AI Tool Calls</h2>

        <p class="doc-text fade-in-delayed">
          One of the most powerful use cases for jsonreader is processing JSON
          responses from AI services. These responses can be large and take time
          to generate, but with jsonreader, you can start processing the data as
          it arrives.
        </p>

        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.2s">
          Streaming Function Call Results
        </h3>

        <CodeBlock
          language="javascript"
          code="import { jsonReader } from 'jsonreader';

async function processAIFunctionCall() {
  // Call an AI model with function calling enabled
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'user', content: 'Generate a list of 50 product ideas' }
      ],
      tools: [{
        type: 'function',
        function: {
          name: 'generate_startup_ideas'
        }
      }],
      stream: true
    })
  });

  const reader = response.body.getReader();
  
  // Track ideas we've seen
  const processedIdeas = new Set();
  const startTime = Date.now();
  
  for await (const partialData of jsonReader(reader)) {
    try {
      // Look for tool calls in the response
      const toolCall = partialData?.choices?.[0]?.delta?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        // Parse the function arguments
        const args = JSON.parse(toolCall.function.arguments);
        
        if (args.ideas && Array.isArray(args.ideas)) {
          // Process each new idea as it arrives
          for (const idea of args.ideas) {
            if (!processedIdeas.has(idea.id)) {
              processedIdeas.add(idea.id);
              console.log(`Idea #${idea.id} received after ${Date.now() - startTime}ms`);
              
              // Update the UI with the new idea
              addIdeaToInterface(idea);
            }
          }
        }
      }
    } catch (error) {
      // Handle parsing errors but continue processing
      console.error('Error processing partial data:', error);
    }
  }
}"
          class="fade-in-delayed"
          style="animation-delay: 0.3s"
        />

        <p class="doc-text fade-in-delayed" style="animation-delay: 0.4s">
          This example shows how to process streaming AI function call results,
          updating the UI as new ideas arrive without waiting for the entire
          response.
        </p>
      </div>

      <div class="doc-section fade-in-delayed" style="animation-delay: 0.5s">
        <h2 class="doc-heading-2">Path-Based Extraction Examples</h2>

        <p class="doc-text">
          The path-based reader is perfect for progressively updating UIs as
          different parts of the JSON become available:
        </p>

        <CodeBlock
          language="javascript"
          code="import { jsonPathReader } from 'jsonreader';

async function progressiveProfileLoader() {
  const response = await fetch('/api/user/profile');
  const reader = response.body.getReader();

  // Define critical paths to extract as they become available
  const paths = [
    'user.name',                  // Critical information
    'user.avatar_url',
    'user.email',                 // Important but not critical
    'user.preferences.theme',     // Less important details
    'user.recent_activity.*.id',
    'user.recent_activity.*.title'
  ];

  // Show loading UI
  showLoadingState();

  // Process each path as it arrives
  for await (const [value, path] of jsonPathReader(reader, paths)) {
    console.log(`Received ${path}`);

    // Update UI based on what data we received
    if (path === 'user.name') {
      updateHeader(value);
      document.title = `${value}'s Profile`;
    } else if (path === 'user.avatar_url') {
      updateAvatar(value);
    } else if (path === 'user.email') {
      updateContactInfo(value);
    } else if (path === 'user.preferences.theme') {
      applyTheme(value);
    } else if (path.match(/user\.recent_activity\.\d+\.title/)) {
      const index = parseInt(path.match(/user\.recent_activity\.(\d+)\.title/)[1]);
      updateActivityTitle(index, value);
    }
  }

  // Complete loading
  hideLoadingStates();
}"
          class="fade-in-delayed"
          :style="{ animationDelay: '0.3s' }"
        />

        <p class="doc-text">
          This pattern allows you to update different parts of your UI as soon
          as the corresponding data becomes available, creating a more
          responsive experience.
        </p>
      </div>

      <div class="doc-section">
        <h2 class="doc-heading-2">Processing Large Files</h2>

        <p class="doc-text">
          jsonreader is great for processing large JSON files without loading
          them entirely into memory:
        </p>

        <CodeBlock
          language="javascript"
          code="import { createReadStream } from 'fs';
import { jsonReader } from 'jsonreader';

async function processLargeJsonFile(filePath) {
  // Create a file stream
  const fileStream = createReadStream(filePath);
  
  // Convert to a web-standard ReadableStream
  const webStream = new ReadableStream({
    start(controller) {
      fileStream.on('data', chunk => {
        controller.enqueue(new Uint8Array(chunk));
      });
      fileStream.on('end', () => controller.close());
      fileStream.on('error', error => controller.error(error));
    }
  });
  
  const reader = webStream.getReader();
  let recordCount = 0;
  const startTime = Date.now();
  
  // Use JSON reader to process the file
  for await (const partialData of jsonReader(reader)) {
    if (partialData.records && Array.isArray(partialData.records)) {
      const newCount = partialData.records.length;
      if (newCount > recordCount) {
        console.log(`Processed ${newCount - recordCount} new records`);
        recordCount = newCount;
      }
    }
  }
  
  console.log(`Completed in ${(Date.now() - startTime) / 1000}s`);
}"
          class="fade-in-delayed"
          :style="{ animationDelay: '0.3s' }"
        />
      </div>
    </div>
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
