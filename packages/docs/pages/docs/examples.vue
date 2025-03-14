<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-4xl font-bold mb-8 text-white">Examples</h1>

    <div class="cyber-box p-4 mb-8">
      <div class="flex items-start">
        <div class="text-cyber-yellow text-xl mr-3">💡</div>
        <div>
          <p class="text-gray-300">Practical examples showing how to use jsonreader in real-world scenarios.</p>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold mb-4 text-cyber-teal mt-8">Processing AI Tool Calls</h2>

    <p class="mb-4 text-gray-300">One of the most powerful use cases for jsonreader is processing JSON responses from AI services. These responses can be large and take time to generate, but with jsonreader, you can start processing the data as it arrives.</p>

    <h3 class="text-xl font-bold mb-3 text-cyber-pink">Streaming Function Call Results</h3>

    <div class="cyber-box p-1 mb-6">
      <div class="code-window-header flex justify-between items-center px-4 py-2">
        <div class="code-window-dots flex gap-1">
          <div class="code-window-dot bg-cyber-red"></div>
          <div class="code-window-dot bg-cyber-yellow"></div>
          <div class="code-window-dot bg-cyber-green"></div>
        </div>
        <div class="text-cyber-teal/70 text-xs font-mono">AI Function Call Example</div>
      </div>
      <div class="p-6 bg-black/80 overflow-hidden">
        <pre class="text-gray-300 overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-cyber-blue">import</span> { jsonReader } <span class="text-cyber-blue">from</span> <span class="text-cyber-green">'jsonreader'</span>;

<span class="text-cyber-pink">async</span> <span class="text-cyber-blue">function</span> <span class="text-cyber-teal">processAIFunctionCall</span>() {
  <span class="text-gray-500">// Call an AI model with function calling enabled</span>
  <span class="text-cyber-blue">const</span> response = <span class="text-cyber-pink">await</span> fetch(<span class="text-cyber-green">'https://api.openai.com/v1/chat/completions'</span>, {
    method: <span class="text-cyber-green">'POST'</span>,
    headers: {
      <span class="text-cyber-green">'Content-Type'</span>: <span class="text-cyber-green">'application/json'</span>,
      <span class="text-cyber-green">'Authorization'</span>: <span class="text-cyber-green">`Bearer ${API_KEY}`</span>
    },
    body: JSON.stringify({
      model: <span class="text-cyber-green">"gpt-4-turbo"</span>,
      messages: [
        { role: <span class="text-cyber-green">"user"</span>, content: <span class="text-cyber-green">"Generate a list of 50 product ideas"</span> }
      ],
      tools: [{
        type: <span class="text-cyber-green">"function"</span>,
        function: {
          name: <span class="text-cyber-green">"generate_startup_ideas"</span>
        }
      }],
      stream: <span class="text-cyber-orange">true</span>
    })
  });

  <span class="text-cyber-blue">const</span> reader = response.body.getReader();
  
  <span class="text-gray-500">// Track ideas we've seen</span>
  <span class="text-cyber-blue">const</span> processedIdeas = <span class="text-cyber-blue">new</span> Set();
  <span class="text-cyber-blue">const</span> startTime = Date.now();
  
  <span class="text-cyber-pink">for</span> <span class="text-cyber-pink">await</span> (<span class="text-cyber-blue">const</span> partialData <span class="text-cyber-blue">of</span> jsonReader(reader)) {
    <span class="text-cyber-pink">try</span> {
      <span class="text-cyber-pink">if</span> (partialData.choices && 
          partialData.choices[<span class="text-cyber-orange">0</span>]?.tool_calls) {
        <span class="text-gray-500">// Process partial function call data</span>
        <span class="text-cyber-pink">try</span> {
          <span class="text-cyber-blue">const</span> args = JSON.parse(partialData.choices[<span class="text-cyber-orange">0</span>].tool_calls[<span class="text-cyber-orange">0</span>].function.arguments);
          
          <span class="text-cyber-pink">if</span> (args.ideas) {
            <span class="text-cyber-blue">const</span> newIdeas = args.ideas.filter(idea => !processedIdeas.has(idea.name));
            
            <span class="text-gray-500">// Process only new ideas</span>
            <span class="text-cyber-pink">for</span> (<span class="text-cyber-blue">const</span> idea <span class="text-cyber-blue">of</span> newIdeas) {
              console.log(<span class="text-cyber-green">`New idea: ${idea.name}`</span>);
              processedIdeas.add(idea.name);
              updateUI(idea);
            }
          }
        } <span class="text-cyber-pink">catch</span> (parseError) {
          <span class="text-gray-500">// This is expected for partial JSON</span>
        }
      }
    } <span class="text-cyber-pink">catch</span> (error) {
      console.error(<span class="text-cyber-green">'Error processing data:'</span>, error);
    }
  }
  
  console.log(<span class="text-cyber-green">`Received ${processedIdeas.size} ideas in ${(Date.now() - startTime) / 1000}s`</span>);
}</pre>
      </div>
    </div>

    <p class="mb-6 text-gray-300">This example shows how to process streaming AI function call results, updating the UI as new ideas arrive without waiting for the entire response.</p>

    <h2 class="text-2xl font-bold mb-4 text-cyber-teal mt-8">Path-Based Extraction Examples</h2>

    <p class="mb-4 text-gray-300">The path-based reader is perfect for progressively updating UIs as different parts of the JSON become available:</p>

    <div class="cyber-box p-1 mb-6">
      <div class="code-window-header flex justify-between items-center px-4 py-2">
        <div class="code-window-dots flex gap-1">
          <div class="code-window-dot bg-cyber-red"></div>
          <div class="code-window-dot bg-cyber-yellow"></div>
          <div class="code-window-dot bg-cyber-green"></div>
        </div>
        <div class="text-cyber-teal/70 text-xs font-mono">Path Extraction Example</div>
      </div>
      <div class="p-6 bg-black/80 overflow-hidden">
        <pre class="text-gray-300 overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-cyber-blue">import</span> { jsonPathReader } <span class="text-cyber-blue">from</span> <span class="text-cyber-green">'jsonreader'</span>;

<span class="text-cyber-pink">async</span> <span class="text-cyber-blue">function</span> <span class="text-cyber-teal">progressiveProfileLoader</span>() {
  <span class="text-cyber-blue">const</span> response = <span class="text-cyber-pink">await</span> fetch(<span class="text-cyber-green">'/api/user/profile'</span>);
  <span class="text-cyber-blue">const</span> reader = response.body.getReader();
  
  <span class="text-gray-500">// Define critical paths to extract as they become available</span>
  <span class="text-cyber-blue">const</span> paths = [
    <span class="text-cyber-green">'user.name'</span>,              <span class="text-gray-500">// Critical information</span>
    <span class="text-cyber-green">'user.avatar_url'</span>,
    <span class="text-cyber-green">'user.email'</span>,             <span class="text-gray-500">// Important but not critical</span>
    <span class="text-cyber-green">'user.preferences.theme'</span>, <span class="text-gray-500">// Less important details</span>
    <span class="text-cyber-green">'user.recent_activity.*.id'</span>,
    <span class="text-cyber-green">'user.recent_activity.*.title'</span>
  ];
  
  <span class="text-gray-500">// Show loading UI</span>
  showLoadingState();
  
  <span class="text-gray-500">// Process each path as it arrives</span>
  <span class="text-cyber-pink">for</span> <span class="text-cyber-pink">await</span> (<span class="text-cyber-blue">const</span> [value, path] <span class="text-cyber-blue">of</span> jsonPathReader(reader, paths)) {
    console.log(<span class="text-cyber-green">`Received ${path}`</span>);
    
    <span class="text-gray-500">// Update UI based on what data we received</span>
    <span class="text-cyber-pink">if</span> (path === <span class="text-cyber-green">'user.name'</span>) {
      updateHeader(value);
      document.title = <span class="text-cyber-green">`${value}'s Profile`</span>;
    } 
    <span class="text-cyber-pink">else if</span> (path === <span class="text-cyber-green">'user.avatar_url'</span>) {
      updateAvatar(value);
    }
    <span class="text-cyber-pink">else if</span> (path === <span class="text-cyber-green">'user.email'</span>) {
      updateContactInfo(value);
    }
    <span class="text-cyber-pink">else if</span> (path === <span class="text-cyber-green">'user.preferences.theme'</span>) {
      applyTheme(value);
    }
    <span class="text-cyber-pink">else if</span> (path.match(<span class="text-cyber-green">/user\.recent_activity\.\d+\.title/</span>)) {
      <span class="text-cyber-blue">const</span> index = <span class="text-cyber-blue">parseInt</span>(path.match(<span class="text-cyber-green">/user\.recent_activity\.(\d+)\.title/</span>)[<span class="text-cyber-orange">1</span>]);
      updateActivityTitle(index, value);
    }
  }
  
  <span class="text-gray-500">// Complete loading</span>
  hideLoadingStates();
}</pre>
      </div>
    </div>

    <p class="mb-6 text-gray-300">This pattern allows you to update different parts of your UI as soon as the corresponding data becomes available, creating a more responsive experience.</p>

    <h2 class="text-2xl font-bold mb-4 text-cyber-teal mt-8">Processing Large Files</h2>

    <p class="mb-4 text-gray-300">jsonreader is great for processing large JSON files without loading them entirely into memory:</p>

    <div class="cyber-box p-1 mb-6">
      <div class="code-window-header flex justify-between items-center px-4 py-2">
        <div class="code-window-dots flex gap-1">
          <div class="code-window-dot bg-cyber-red"></div>
          <div class="code-window-dot bg-cyber-yellow"></div>
          <div class="code-window-dot bg-cyber-green"></div>
        </div>
        <div class="text-cyber-teal/70 text-xs font-mono">Large File Processing</div>
      </div>
      <div class="p-6 bg-black/80 overflow-hidden">
        <pre class="text-gray-300 overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-cyber-blue">import</span> { createReadStream } <span class="text-cyber-blue">from</span> <span class="text-cyber-green">'fs'</span>;
<span class="text-cyber-blue">import</span> { jsonReader } <span class="text-cyber-blue">from</span> <span class="text-cyber-green">'jsonreader'</span>;

<span class="text-cyber-pink">async</span> <span class="text-cyber-blue">function</span> <span class="text-cyber-teal">processLargeJsonFile</span>(filePath) {
  <span class="text-gray-500">// Create a file stream</span>
  <span class="text-cyber-blue">const</span> fileStream = createReadStream(filePath);
  
  <span class="text-gray-500">// Convert to a web-standard ReadableStream</span>
  <span class="text-cyber-blue">const</span> webStream = <span class="text-cyber-blue">new</span> ReadableStream({
    start(controller) {
      fileStream.on(<span class="text-cyber-green">'data'</span>, chunk => {
        controller.enqueue(<span class="text-cyber-blue">new</span> Uint8Array(chunk));
      });
      fileStream.on(<span class="text-cyber-green">'end'</span>, () => controller.close());
      fileStream.on(<span class="text-cyber-green">'error'</span>, error => controller.error(error));
    }
  });
  
  <span class="text-cyber-blue">const</span> reader = webStream.getReader();
  
  <span class="text-cyber-blue">let</span> recordCount = <span class="text-cyber-orange">0</span>;
  <span class="text-cyber-blue">const</span> startTime = Date.now();
  
  <span class="text-gray-500">// Use JSON reader to process the file</span>
  <span class="text-cyber-pink">for</span> <span class="text-cyber-pink">await</span> (<span class="text-cyber-blue">const</span> partialData <span class="text-cyber-blue">of</span> jsonReader(reader)) {
    <span class="text-cyber-pink">if</span> (partialData.records && Array.isArray(partialData.records)) {
      <span class="text-cyber-blue">const</span> newCount = partialData.records.length;
      
      <span class="text-cyber-pink">if</span> (newCount > recordCount) {
        console.log(<span class="text-cyber-green">`Processed ${newCount - recordCount} new records`</span>);
        recordCount = newCount;
      }
    }
  }
  
  console.log(<span class="text-cyber-green">`Completed in ${(Date.now() - startTime) / 1000}s`</span>);
}</pre>
      </div>
    </div>

    <div class="cyber-card mt-12">
      <h3 class="text-cyber-teal text-lg font-bold mb-2">More Examples</h3>
      <p class="mb-4">Check out our GitHub repository for more advanced examples showing different use cases for jsonreader.</p>
      <div class="flex space-x-4">
        <a href="https://github.com/formkit/jsonreader/tree/main/examples" target="_blank" class="cyber-btn group inline-flex">
          <span>GitHub Examples</span>
        </a>
      </div>
    </div>
  </div>
  <DocFooter />
</template>

<script setup>
import DocFooter from '../../components/DocFooter.vue';
</script> 