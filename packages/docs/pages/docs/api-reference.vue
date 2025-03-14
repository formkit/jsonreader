<template>
  <div class="doc-container relative">
    <div class="absolute inset-0 noise-bg opacity-40"></div>
    <div class="relative z-10">
      <h1 class="doc-heading-1 shimmer-effect">API Reference</h1>

      <div class="doc-section">
        <h2 class="doc-heading-2 fade-in">jsonReader</h2>
        
        <p class="doc-text fade-in-delayed">
          The main function for processing streaming JSON data. It yields progressively more complete JSON objects as data arrives.
        </p>
        
        <div class="code-block card-noise fade-in-delayed" style="animation-delay: 0.2s;">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">Basic Usage</div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-accent">import</span> { jsonReader } <span class="text-accent">from</span> <span class="text-white">'jsonreader'</span>;

<span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> partialData <span class="text-accent">of</span> jsonReader(reader)) {
  <span class="text-gray-400">// Process the partial data</span>
  console.log(partialData);
}</pre>
          </div>
        </div>
        
        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.3s;">Parameters</h3>
        
        <div class="overflow-x-auto mt-4 mb-6 fade-in-delayed" style="animation-delay: 0.4s;">
          <table class="w-full border-collapse card-noise">
            <thead>
              <tr class="bg-accent/5">
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Parameter</th>
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Type</th>
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">reader</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">ReadableStreamDefaultReader</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">A reader object from a readable stream, typically obtained from <code class="inline-code">response.body.getReader()</code>.</td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">options</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">Object</code> (optional)</td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">Configuration options for the reader.</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.5s;">Options</h3>
        
        <div class="overflow-x-auto mt-4 mb-6 fade-in-delayed" style="animation-delay: 0.6s;">
          <table class="w-full border-collapse card-noise">
            <thead>
              <tr class="bg-accent/5">
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Option</th>
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Type</th>
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">required</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">string[]</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">Array of paths that must be present before yielding a result.</td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">silent</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">string[]</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">Array of paths to exclude from the yielded results.</td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">assign</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">Object</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">Object with properties to add to each yielded result.</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.7s;">Advanced Usage</h3>
        
        <p class="doc-text fade-in-delayed" style="animation-delay: 0.8s;">
          Using options to customize behavior:
        </p>
        
        <div class="code-block card-noise fade-in-delayed" style="animation-delay: 0.9s;">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">Advanced Options</div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-accent">import</span> { jsonReader } <span class="text-accent">from</span> <span class="text-white">'jsonreader'</span>;

<span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> partialData <span class="text-accent">of</span> jsonReader(reader, {
  <span class="text-gray-400">// Only yield when these properties are present</span>
  required: [<span class="text-white">'status'</span>, <span class="text-white">'results'</span>, <span class="text-white">'metadata.timing'</span>],
  
  <span class="text-gray-400">// Don't include these properties in results</span>
  silent: [<span class="text-white">'debug_info'</span>],
  
  <span class="text-gray-400">// Add these values to each result</span>
  assign: {
    timestamp: Date.now(),
    version: <span class="text-white">'1.0.0'</span>
  }
})) {
  <span class="text-gray-400">// Process the partial data</span>
  updateUI(partialData);
}</pre>
          </div>
        </div>
      </div>

      <div class="doc-section fade-in-delayed" style="animation-delay: 1s;">
        <h2 class="doc-heading-2">jsonPathReader</h2>
        
        <p class="doc-text fade-in-delayed">
          A specialized function for extracting values from specific JSON paths as data arrives. This is useful when you only care about certain paths within a larger JSON structure.
        </p>
        
        <div class="code-block card-noise fade-in-delayed" style="animation-delay: 0.2s;">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">Basic Usage</div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-accent">import</span> { jsonPathReader } <span class="text-accent">from</span> <span class="text-white">'jsonreader'</span>;

<span class="text-accent">const</span> reader = response.body.getReader();
<span class="text-accent">const</span> paths = [
  <span class="text-white">'results'</span>, 
  <span class="text-white">'metadata.timing'</span>, 
  <span class="text-white">'users.*.name'</span> <span class="text-gray-400">// Wildcard to match names of all users</span>
];

<span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> [value, path] <span class="text-accent">of</span> jsonPathReader(reader, paths)) {
  <span class="text-gray-400">// Each iteration yields a specific value and its path as a tuple</span>
  console.log(<span class="text-white">`Path: ${path}, Value:`</span>, value);
  
  <span class="text-accent">if</span> (path === <span class="text-white">'results'</span> && Array.isArray(value)) {
    <span class="text-gray-400">// Handle results array</span>
    renderResults(value);
  } <span class="text-accent">else if</span> (path.startsWith(<span class="text-white">'users.'</span>) && path.endsWith(<span class="text-white">'.name'</span>)) {
    <span class="text-gray-400">// Handle individual user names matched by wildcard</span>
    updateUserName(path.split(<span class="text-white">'.'</span>)[1], value);
  }
}</pre>
          </div>
        </div>
        
        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.3s;">Parameters</h3>
        
        <div class="overflow-x-auto mt-4 mb-6 fade-in-delayed" style="animation-delay: 0.4s;">
          <table class="w-full border-collapse card-noise">
            <thead>
              <tr class="bg-accent/5">
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Parameter</th>
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Type</th>
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">reader</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">ReadableStreamDefaultReader</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">A reader object from a readable stream, typically obtained from <code class="inline-code">response.body.getReader()</code>.</td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">paths</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">string[] | string</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">One or more path strings to extract from the JSON data. For example, <code class="inline-code">['results', 'metadata.timing']</code> or <code class="inline-code">'results'</code>. You can use <code class="inline-code">'*'</code> as a wildcard path segment to match any property or array item at that location (e.g., <code class="inline-code">'users.*.name'</code> or <code class="inline-code">'items.*.id'</code>).</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.5s;">Return Value</h3>
        
        <p class="doc-text fade-in-delayed" style="animation-delay: 0.6s;">
          The <code class="inline-code">jsonPathReader</code> function returns an async generator that yields tuples containing:
        </p>
        
        <div class="overflow-x-auto mt-4 mb-6 fade-in-delayed" style="animation-delay: 0.7s;">
          <table class="w-full border-collapse card-noise">
            <thead>
              <tr class="bg-accent/5">
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Element</th>
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Type</th>
                <th class="text-left py-2 px-4 border-b border-gray-200 font-bold text-black">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">value</code> (index 0)</td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">any</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">The value found at the matching path.</td>
              </tr>
              <tr class="hover:bg-accent/5 transition-colors duration-200">
                <td class="py-2 px-4 border-b border-gray-200"><code class="inline-code">path</code> (index 1)</td>
                <td class="py-2 px-4 border-b border-gray-200 text-black"><code class="inline-code">string</code></td>
                <td class="py-2 px-4 border-b border-gray-200 text-black">The specific path from your provided paths array that was matched.</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 class="doc-heading-3 fade-in-delayed" style="animation-delay: 0.8s;">Advanced Usage Example</h3>
        
        <div class="code-block card-noise fade-in-delayed" style="animation-delay: 0.9s;">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">Real-time Search Results</div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-accent">import</span> { jsonPathReader } <span class="text-accent">from</span> <span class="text-white">'jsonreader'</span>;

<span class="text-accent">async</span> <span class="text-accent">function</span> <span class="text-white">searchWithRealtimeResults</span>() {
  <span class="text-accent">const</span> response = <span class="text-accent">await</span> fetch(<span class="text-white">'https://api.search-service.com/search?q=jsonreader'</span>);
  <span class="text-accent">const</span> reader = response.body.getReader();
  
  <span class="text-accent">let</span> resultCount = <span class="text-white">0</span>;
  <span class="text-accent">let</span> lastTimingUpdate = <span class="text-white">null</span>;
  
  <span class="text-gray-400">// Monitor both search results and timing information</span>
  <span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> [value, path] <span class="text-accent">of</span> jsonPathReader(reader, [
    <span class="text-white">'results'</span>,
    <span class="text-white">'metadata.timing'</span>,
    <span class="text-white">'status'</span>
  ])) {
    <span class="text-accent">if</span> (path === <span class="text-white">'results'</span> && Array.isArray(value)) {
      <span class="text-gray-400">// New results have arrived</span>
      <span class="text-accent">const</span> newResults = value.slice(resultCount);
      resultCount = value.length;
      
      <span class="text-gray-400">// Update the UI with just the new results</span>
      appendResultsToUI(newResults);
      updateResultCounter(resultCount);
    }
    
    <span class="text-accent">if</span> (path === <span class="text-white">'metadata.timing'</span>) {
      <span class="text-gray-400">// Update performance metrics in real-time</span>
      lastTimingUpdate = value;
      updateTimingDisplay(value);
    }
    
    <span class="text-accent">if</span> (path === <span class="text-white">'status'</span> && value === <span class="text-white">'complete'</span>) {
      <span class="text-gray-400">// Search is done</span>
      showCompletionMessage();
    }
  }
}</pre>
          </div>
        </div>
      </div>

      <div class="doc-section fade-in-delayed" style="animation-delay: 1.1s;">
        <h2 class="doc-heading-2">Error Handling</h2>
        
        <p class="doc-text">
          jsonReader and jsonPathReader will throw an error when parsing fails. You should use a try/catch block to handle these errors:
        </p>
        
        <div class="code-block card-noise">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">Error Handling Example</div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-accent">try</span> {
  <span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> data <span class="text-accent">of</span> jsonReader(reader)) {
    <span class="text-gray-400">// Process data</span>
    console.log(data);
  }
} <span class="text-accent">catch</span> (error) {
  <span class="text-gray-400">// Handle error</span>
  console.error(<span class="text-white">'JSON parsing error:'</span>, error);
}</pre>
          </div>
        </div>
      </div>

      <div class="bg-accent/10 p-4 mt-8 mb-8 rounded-lg border border-accent/30 card-noise pulse-glow">
        <h3 class="text-lg font-bold mb-2">Further Reading</h3>
        <ul class="space-y-1">
          <li class="transition-transform hover:translate-x-2 duration-300"><a href="/docs/getting-started" class="text-accent hover:underline flex items-center"><span class="mr-2">→</span> Getting Started Guide</a> - Basic usage and concepts</li>
          <li class="transition-transform hover:translate-x-2 duration-300"><a href="/docs/examples" class="text-accent hover:underline flex items-center"><span class="mr-2">→</span> Examples</a> - Real-world usage patterns</li>
          <li class="transition-transform hover:translate-x-2 duration-300"><a href="https://github.com/formkit/jsonreader" class="text-accent hover:underline flex items-center" target="_blank"><span class="mr-2">→</span> GitHub Repository</a> - Source code and issues</li>
        </ul>
      </div>
    </div>
    
    <!-- Float to top button -->
    <div class="fixed bottom-8 right-8 bg-accent hover:bg-accent/90 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-110" @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </div>
    
    <!-- Floating decorative elements -->
    <div class="fixed top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl pointer-events-none"></div>
    <div class="fixed bottom-40 left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-accent/5 to-transparent blur-3xl pointer-events-none"></div>
  </div>
</template>

<script setup>
import DocFooter from '../../components/DocFooter.vue';

// Create a scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script> 