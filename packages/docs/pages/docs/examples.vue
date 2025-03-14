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
              Practical examples showing how to use @formkit/jsonreader in real-world
              scenarios.
            </p>
          </div>
        </div>
      </div>

      <div class="doc-section">
        <h2 class="doc-heading-2 fade-in-delayed">Processing AI Tool Calls</h2>

        <p class="doc-text fade-in-delayed">
          One of the most powerful use cases for @formkit/jsonreader is processing JSON
          responses from AI services. These responses can be large and take time
          to generate, but with @formkit/jsonreader, you can start processing the data as
          it arrives.
        </p>

        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.2s">
          Streaming Function Call Results
        </h3>

        <div
          class="code-block card-noise fade-in-delayed"
          style="animation-delay: 0.3s"
        >
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">
              AI Function Call Example
            </div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre
              class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left"
            >
<span class="text-accent">import</span> { jsonReader } <span class="text-accent">from</span> <span class="text-white">'@formkit/jsonreader'</span>;

<span class="text-accent">async</span> <span class="text-accent">function</span> <span class="text-white">processAIFunctionCall</span>() {
  <span class="text-gray-400">// Call an AI model with function calling enabled</span>
  <span class="text-accent">const</span> response = <span class="text-accent">await</span> fetch(<span class="text-white">'https://api.openai.com/v1/chat/completions'</span>, {
    method: <span class="text-white">'POST'</span>,
    headers: {
      <span class="text-white">'Content-Type'</span>: <span class="text-white">'application/json'</span>,
      <span class="text-white">'Authorization'</span>: <span class="text-white">`Bearer ${API_KEY}`</span>
    },
    body: JSON.stringify({
      model: <span class="text-white">"gpt-4-turbo"</span>,
      messages: [
        { role: <span class="text-white">"user"</span>, content: <span class="text-white">"Generate a list of 50 product ideas"</span> }
      ],
      tools: [{
        type: <span class="text-white">"function"</span>,
        function: {
          name: <span class="text-white">"generate_startup_ideas"</span>
        }
      }],
      stream: <span class="text-accent">true</span>
    })
  });

  <span class="text-accent">const</span> reader = response.body.getReader();
  
  <span class="text-gray-400">// Track ideas we've seen</span>
  <span class="text-accent">const</span> processedIdeas = <span class="text-accent">new</span> Set();
  <span class="text-accent">const</span> startTime = Date.now();
  
  <span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> partialData <span class="text-accent">of</span> jsonReader(reader)) {
    <span class="text-accent">try</span> {
      <span class="text-accent">if</span> (partialData.choices && 
          partialData.choices[<span class="text-accent">0</span>]?.tool_calls) {
        <span class="text-gray-400">// Process partial function call data</span>
        <span class="text-accent">try</span> {
          <span class="text-accent">const</span> args = JSON.parse(partialData.choices[<span class="text-accent">0</span>].tool_calls[<span class="text-accent">0</span>].function.arguments);
          
          <span class="text-accent">if</span> (args.ideas) {
            <span class="text-accent">const</span> newIdeas = args.ideas.filter(idea => !processedIdeas.has(idea.name));
            
            <span class="text-gray-400">// Process only new ideas</span>
            <span class="text-accent">for</span> (<span class="text-accent">const</span> idea <span class="text-accent">of</span> newIdeas) {
              console.log(<span class="text-white">`New idea: ${idea.name}`</span>);
              processedIdeas.add(idea.name);
              updateUI(idea);
            }
          }
        } <span class="text-accent">catch</span> (parseError) {
          <span class="text-gray-400">// This is expected for partial JSON</span>
        }
      }
    } <span class="text-accent">catch</span> (error) {
      console.error(<span class="text-white">'Error processing data:'</span>, error);
    }
  }
  
  console.log(<span class="text-white">`Received ${processedIdeas.size} ideas in ${(Date.now() - startTime) / 1000}s`</span>);
}</pre>
          </div>
        </div>

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

        <div class="code-block card-noise">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">
              Path Extraction Example
            </div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre
              class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left"
            >
<span class="text-accent">import</span> { jsonPathReader } <span class="text-accent">from</span> <span class="text-white">'@formkit/jsonreader'</span>;

<span class="text-accent">async</span> <span class="text-accent">function</span> <span class="text-white">progressiveProfileLoader</span>() {
  <span class="text-accent">const</span> response = <span class="text-accent">await</span> fetch(<span class="text-white">'/api/user/profile'</span>);
  <span class="text-accent">const</span> reader = response.body.getReader();
  
  <span class="text-gray-400">// Define critical paths to extract as they become available</span>
  <span class="text-accent">const</span> paths = [
    <span class="text-white">'user.name'</span>,              <span class="text-gray-400">// Critical information</span>
    <span class="text-white">'user.avatar_url'</span>,
    <span class="text-white">'user.email'</span>,             <span class="text-gray-400">// Important but not critical</span>
    <span class="text-white">'user.preferences.theme'</span>, <span class="text-gray-400">// Less important details</span>
    <span class="text-white">'user.recent_activity.*.id'</span>,
    <span class="text-white">'user.recent_activity.*.title'</span>
  ];
  
  <span class="text-gray-400">// Show loading UI</span>
  showLoadingState();
  
  <span class="text-gray-400">// Process each path as it arrives</span>
  <span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> [value, path] <span class="text-accent">of</span> jsonPathReader(reader, paths)) {
    console.log(<span class="text-white">`Received ${path}`</span>);
    
    <span class="text-gray-400">// Update UI based on what data we received</span>
    <span class="text-accent">if</span> (path === <span class="text-white">'user.name'</span>) {
      updateHeader(value);
      document.title = <span class="text-white">`${value}'s Profile`</span>;
    } 
    <span class="text-accent">else if</span> (path === <span class="text-white">'user.avatar_url'</span>) {
      updateAvatar(value);
    }
    <span class="text-accent">else if</span> (path === <span class="text-white">'user.email'</span>) {
      updateContactInfo(value);
    }
    <span class="text-accent">else if</span> (path === <span class="text-white">'user.preferences.theme'</span>) {
      applyTheme(value);
    }
    <span class="text-accent">else if</span> (path.match(<span class="text-white">/user\.recent_activity\.\d+\.title/</span>)) {
      <span class="text-accent">const</span> index = <span class="text-accent">parseInt</span>(path.match(<span class="text-white">/user\.recent_activity\.(\d+)\.title/</span>)[<span class="text-accent">1</span>]);
      updateActivityTitle(index, value);
    }
  }
  
  <span class="text-gray-400">// Complete loading</span>
  hideLoadingStates();
}</pre>
          </div>
        </div>

        <p class="doc-text">
          This pattern allows you to update different parts of your UI as soon
          as the corresponding data becomes available, creating a more
          responsive experience.
        </p>
      </div>

      <div class="doc-section">
        <h2 class="doc-heading-2">Processing Large Files</h2>

        <p class="doc-text">
          @formkit/jsonreader is great for processing large JSON files without loading
          them entirely into memory:
        </p>

        <div class="code-block card-noise">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">
              Large File Processing
            </div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre
              class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left"
            >
<span class="text-accent">import</span> { createReadStream } <span class="text-accent">from</span> <span class="text-white">'fs'</span>;
<span class="text-accent">import</span> { jsonReader } <span class="text-accent">from</span> <span class="text-white">'@formkit/jsonreader'</span>;

<span class="text-accent">async</span> <span class="text-accent">function</span> <span class="text-white">processLargeJsonFile</span>(filePath) {
  <span class="text-gray-400">// Create a file stream</span>
  <span class="text-accent">const</span> fileStream = createReadStream(filePath);
  
  <span class="text-gray-400">// Convert to a web-standard ReadableStream</span>
  <span class="text-accent">const</span> webStream = <span class="text-accent">new</span> ReadableStream({
    start(controller) {
      fileStream.on(<span class="text-white">'data'</span>, chunk => {
        controller.enqueue(<span class="text-accent">new</span> Uint8Array(chunk));
      });
      fileStream.on(<span class="text-white">'end'</span>, () => controller.close());
      fileStream.on(<span class="text-white">'error'</span>, error => controller.error(error));
    }
  });
  
  <span class="text-accent">const</span> reader = webStream.getReader();
  
  <span class="text-accent">let</span> recordCount = <span class="text-accent">0</span>;
  <span class="text-accent">const</span> startTime = Date.now();
  
  <span class="text-gray-400">// Use JSON reader to process the file</span>
  <span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> partialData <span class="text-accent">of</span> jsonReader(reader)) {
    <span class="text-accent">if</span> (partialData.records && Array.isArray(partialData.records)) {
      <span class="text-accent">const</span> newCount = partialData.records.length;
      
      <span class="text-accent">if</span> (newCount > recordCount) {
        console.log(<span class="text-white">`Processed ${newCount - recordCount} new records`</span>);
        recordCount = newCount;
      }
    }
  }
  
  console.log(<span class="text-white">`Completed in ${(Date.now() - startTime) / 1000}s`</span>);
}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Float to top button -->
    <div
      class="fixed bottom-8 right-8 bg-accent hover:bg-accent/90 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-110"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
// Create a scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
</script>
