<template>
  <div class="min-h-screen">
    <!-- Floating dots background effect -->
    <div class="floating-dots fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div v-for="n in 30" :key="n" class="dot absolute" 
           :style="{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             width: `${Math.random() * 15 + 5}px`,
             height: `${Math.random() * 15 + 5}px`,
             opacity: `${Math.random() * 0.2}`,
             animationDelay: `${Math.random() * 5}s`,
             animationDuration: `${Math.random() * 10 + 10}s`,
             transform: `scale(${Math.random() * 1 + 0.5})`
           }"
           :class="{ 'float': true }">
      </div>
    </div>

    <!-- Hero Section with enhanced design -->
    <section class="relative py-20 overflow-hidden bg-white hero-bg">
      <div class="absolute inset-0 noise-bg opacity-50"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center mb-12">
          <!-- Title with enhanced animation -->
          <div class="inline-block mb-6 relative fade-in">
            <div class="shimmer-effect px-4 py-3">
              <h1 class="text-5xl md:text-7xl font-bold text-black leading-relaxed pb-2">
                <span class="text-accent pulse-glow">jsonreader</span>
              </h1>
            </div>
          </div>
          
          <p class="text-xl md:text-2xl mb-8 text-black leading-relaxed fade-in-delayed">
            Stream and process <span class="accent-text">JSON responses</span> from <span class="accent-text">AI tool calls</span> as they arrive—<br class="hidden md:block">
            intelligently tracking state to produce JSON <span class="accent-text">before it's complete</span>
          </p>
          
          <div class="flex flex-wrap justify-center gap-4 mb-12 slide-up-delayed">
            <a href="#get-started" class="btn">
              <span>Get Started</span>
            </a>
            <a href="https://github.com/formkit/jsonreader" target="_blank" class="btn relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 bg-white text-accent border border-accent hover:bg-accent/10 group github-btn">
              <span class="flex items-center relative z-10">
                <!-- GitHub Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub <span class="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          </div>

          <!-- Simple Code Example -->
          <div class="code-window mt-12 max-w-3xl mx-auto fade-in card-noise">
            <div class="code-window-header flex justify-between items-center">
              <div class="code-window-dots flex gap-1">
                <div class="code-window-dot"></div>
                <div class="code-window-dot"></div>
                <div class="code-window-dot"></div>
              </div>
              <div class="text-black text-xs font-bold">Simple Usage Example</div>
            </div>
            <div class="p-6 bg-black overflow-hidden relative text-left">
              <!-- Code content with typing effect -->
              <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed">
<span class="text-accent">import</span> { jsonReader } <span class="text-accent">from</span> <span class="text-white">'jsonreader'</span>;

<span class="text-gray-400">// Get a reader from a streaming response</span>
<span class="text-accent">const</span> reader = response.body.getReader();

<span class="text-gray-400">// Process JSON as it comes in</span>
<span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> data <span class="text-accent">of</span> jsonReader(reader)) {
  <span class="text-gray-400">// Use partial results immediately</span>
  updateUI(data);
}</pre>
              <!-- Pattern background overlay -->
              <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with enhanced cards -->
    <section class="py-16 bg-gray-50 border-t border-gray-200 relative">
      <div class="absolute inset-0 noise-bg opacity-30"></div>
      <div class="container mx-auto px-4 relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-black relative">
          Key Features
          <span class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-accent to-accent/20 rounded-full"></span>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="feature-card slide-up-delayed card-noise" style="animation-delay: 0.1s;">
            <div class="feature-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">Ideal for AI Tool Calls</h3>
            <p class="text-black">Process JSON from AI tool calls as they stream, without waiting for the complete payload.</p>
          </div>

          <!-- Feature 2 -->
          <div class="feature-card slide-up-delayed card-noise" style="animation-delay: 0.3s;">
            <div class="feature-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">Incremental Updates</h3>
            <p class="text-black">Update your UI in real-time as data arrives, providing a more responsive user experience.</p>
          </div>

          <!-- Feature 3 -->
          <div class="feature-card slide-up-delayed card-noise" style="animation-delay: 0.5s;">
            <div class="feature-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">Path Extraction</h3>
            <p class="text-black">Target specific paths in your JSON and extract data as soon as those paths are available.</p>
          </div>
          
          <!-- Feature 4 -->
          <div class="feature-card slide-up-delayed card-noise" style="animation-delay: 0.7s;">
            <div class="feature-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">Smart State Tracking</h3>
            <p class="text-black">Intelligently tracks JSON state during streaming, allowing you to work with usable data before it's fully received.</p>
          </div>
          
          <!-- Feature 5 -->
          <div class="feature-card slide-up-delayed card-noise" style="animation-delay: 0.9s;">
            <div class="feature-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">Developer Friendly</h3>
            <p class="text-black">Simple API with full TypeScript support and intuitive configuration, making integration into your project effortless.</p>
          </div>
          
          <!-- Feature 6 -->
          <div class="feature-card slide-up-delayed card-noise" style="animation-delay: 1.1s;">
            <div class="feature-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v21m0-21H3.75m0 0h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v21m0 0h-16.5m16.5 0h1.5m-1.5 0H3.75m0 0h-1.5" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-black">Lightweight & Fast</h3>
            <p class="text-black">Zero dependencies and minimal overhead, ensuring maximum performance even with large streaming datasets.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Get Started Section (consolidated from getting-started page) -->
    <section id="get-started" class="py-16 bg-gray-50 border-t border-gray-200 relative">
      <div class="absolute inset-0 noise-bg opacity-30"></div>
      <div class="container mx-auto px-4 relative z-10 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-black relative">
          Getting Started
          <span class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-accent to-accent/20 rounded-full"></span>
        </h2>

        <!-- Dual License Section -->
        <div class="mb-12 fade-in">
          <h3 class="text-2xl font-bold text-center mb-8 text-black">Dual License</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Free for Individual Use Card -->
            <div class="p-6 rounded-lg shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl card-noise">
              <div class="flex items-center justify-center mb-4 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h4 class="text-xl font-bold text-center mb-3 text-emerald-800">100% Free for Personal Use</h4>
              <p class="text-center text-emerald-700 mb-6">Use jsonreader in your personal projects, open source contributions, and learning experiences at no cost.</p>
              <div class="text-center">
                <span class="text-3xl font-bold text-emerald-600">$0</span>
              </div>
            </div>
            
            <!-- Commercial License Card -->
            <div class="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-accent/30 transform transition-all duration-300 hover:scale-105 hover:shadow-xl card-noise">
              <div class="flex items-center justify-center mb-4 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <h4 class="text-xl font-bold text-center mb-3 text-accent">Commercial License</h4>
              <p class="text-center text-black mb-6">For use in commercial projects and applications.</p>
              <div class="text-center mb-4">
                <span class="text-3xl font-bold text-accent">$10</span>
                <span class="text-sm text-black ml-1">per project</span>
              </div>
              <div class="text-center">
                <a href="https://buy.stripe.com/14k7uU7jqc7x4jmdQS" target="_blank" class="btn bg-accent hover:bg-accent/90 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 inline-flex items-center">
                  <span>Buy Commercial License</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <p class="text-sm text-gray-500 mt-4 text-center fade-in-delayed">
            Commercial license applies to one commercial project only. Each additional project requires a separate license.
          </p>
        </div>

        <div class="bg-accent/10 p-4 mb-8 rounded-lg border border-accent/30 card-noise fade-in">
          <div class="flex items-start">
            <div class="text-accent mr-3 pulse-glow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <div>
              <p class="text-black">jsonreader is a specialized utility for processing JSON data from streams in real-time, with a focus on handling responses from AI tool calls efficiently. By tracking the JSON state as it streams in, it enables you to work with partial data intelligently before the complete payload is received.</p>
            </div>
          </div>
        </div>

        <h3 class="doc-heading-3 fade-in-delayed">Installation</h3>

        <div class="code-block card-noise fade-in-delayed" style="animation-delay: 0.2s;">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">INSTALLATION</div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-gray-400"># Using npm</span>
npm install jsonreader

<span class="text-gray-400"># Using yarn</span>
yarn add jsonreader

<span class="text-gray-400"># Using pnpm</span>
pnpm add jsonreader</pre>
          </div>
        </div>

        <h3 class="doc-heading-3 mt-8 mb-4 fade-in-delayed">How It Works</h3>

        <div class="bg-accent/5 p-6 rounded-lg border border-accent/20 mb-8 card-noise fade-in-delayed">
          <div class="flex">
            <div class="w-full">
              <p class="text-black mb-4">The <code class="inline-code">jsonreader</code> utility parses JSON data character by character as it arrives from a stream. It builds up a syntactically valid JSON structure as data comes in, closing any unclosed objects or arrays to create valid partial representations.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div class="bg-white/50 p-4 rounded-lg shadow-sm">
                  <h4 class="font-bold text-lg mb-2 text-accent">Character-by-Character Processing</h4>
                  <p class="text-black">For each chunk of data received, the stream is decoded from Uint8Array to text and processed character by character, enabling real-time JSON handling.</p>
                </div>
                
                <div class="bg-white/50 p-4 rounded-lg shadow-sm">
                  <h4 class="font-bold text-lg mb-2 text-accent">Path Tracking</h4>
                  <p class="text-black">Property paths are tracked as the parser encounters them, allowing for targeted extraction of specific values as they become available.</p>
                </div>
                
                <div class="bg-white/50 p-4 rounded-lg shadow-sm">
                  <h4 class="font-bold text-lg mb-2 text-accent">Valid Partial Results</h4>
                  <p class="text-black">When required properties are available, a partial result is yielded with temporarily closed objects/arrays to ensure valid JSON structure.</p>
                </div>
                
                <div class="bg-white/50 p-4 rounded-lg shadow-sm">
                  <h4 class="font-bold text-lg mb-2 text-accent">Continuous Stream Processing</h4>
                  <p class="text-black">The process continues incrementally until the stream is complete, providing progressively more complete JSON objects with each iteration.</p>
                </div>
              </div>
              
              <p class="text-black mt-6">This approach allows for real-time processing of JSON data without waiting for the entire payload to be received, making it ideal for streaming APIs and large datasets.</p>
            </div>
          </div>
        </div>

        <h3 class="doc-heading-3 mt-8 mb-4">Basic Usage</h3>

        <p class="doc-text mb-4">The simplest way to use jsonreader is to process JSON data as it streams in:</p>

        <div class="code-block card-noise">
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

<span class="text-accent">async</span> <span class="text-accent">function</span> <span class="text-white">processStreamingData</span>() {
  <span class="text-gray-400">// Get a stream from somewhere (e.g., fetch API)</span>
  <span class="text-accent">const</span> response = <span class="text-accent">await</span> fetch(<span class="text-white">'https://api.ai-service.com/v1/generate'</span>);
  <span class="text-accent">const</span> reader = response.body.getReader();
  
  <span class="text-gray-400">// Process JSON as it comes in</span>
  <span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> partialData <span class="text-accent">of</span> jsonReader(reader)) {
    console.log(<span class="text-white">'Received partial data:'</span>, partialData);
    
    <span class="text-gray-400">// Update your UI with partial data</span>
    updateUI(partialData);
  }
}</pre>
          </div>
        </div>

        <p class="doc-text my-4">In this example, <code class="inline-code">partialData</code> will contain progressively more complete JSON objects as the data streams in.</p>

        <h3 class="doc-heading-3 mt-8 mb-4">Configuration Options</h3>
        
        <div class="bg-gray-50 p-4 mb-6 rounded-lg border border-gray-200 card-noise">
          <p class="text-black mb-4">
            jsonreader provides three powerful configuration options to control how streaming data is processed:
          </p>
          
          <h4 class="font-bold text-lg mb-2">1. Required Option</h4>
          <p class="text-black mb-4">
            The <code class="inline-code">required</code> option lets you specify properties that must be fully received before any data is yielded. This ensures critical data is complete before processing begins.
          </p>
          
          <h4 class="font-bold text-lg mb-2">2. Silent Option</h4>
          <p class="text-black mb-4">
            The <code class="inline-code">silent</code> option allows normal streaming of JSON, but pauses yielding while properties marked as "silent" are being received. This is useful for sensitive data that should only be processed when complete.
          </p>
          
          <h4 class="font-bold text-lg mb-2">3. Assign Option</h4>
          <p class="text-black">
            The <code class="inline-code">assign</code> option allows you to merge additional properties with each yielded chunk of data. This is useful for adding context, timestamps, or other metadata to every update.
          </p>
        </div>

        <div class="code-block card-noise">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">Configuration Options Example</div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-accent">import</span> { jsonReader } <span class="text-accent">from</span> <span class="text-white">'jsonreader'</span>;

<span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> data <span class="text-accent">of</span> jsonReader(reader, {
  <span class="text-gray-400">// Won't yield anything until 'metadata' is complete</span>
  required: [<span class="text-white">'metadata'</span>],
  
  <span class="text-gray-400">// Pauses yielding while 'sensitiveData' is streaming</span>
  silent: [<span class="text-white">'sensitiveData'</span>],
  
  <span class="text-gray-400">// Add these properties to each yielded object</span>
  assign: {
    timestamp: Date.now(),
    source: <span class="text-white">'api-endpoint'</span>
  }
})) {
  <span class="text-gray-400">// Update UI with augmented data</span>
  updateUI(data);
}</pre>
          </div>
        </div>

        <h3 class="doc-heading-3 mt-8 mb-4">Using jsonPathReader</h3>

        <p class="doc-text mb-4">Using jsonPathReader you can target specific paths in your JSON and yield those paths whenever they are completed. You can also use the <code class="inline-code">'*'</code> wildcard to match any property or array item at a given position.</p>

        <div class="code-block card-noise">
          <div class="code-window-header flex justify-between items-center">
            <div class="code-window-dots flex gap-1">
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
              <div class="code-window-dot"></div>
            </div>
            <div class="text-black text-xs font-bold">jsonPathReader Example</div>
          </div>
          <div class="p-6 bg-black overflow-hidden">
            <pre class="text-white overflow-x-auto font-mono text-sm leading-relaxed text-left">
<span class="text-accent">import</span> { jsonPathReader } <span class="text-accent">from</span> <span class="text-white">'jsonreader'</span>;

<span class="text-accent">for</span> <span class="text-accent">await</span> (<span class="text-accent">const</span> [value, path] <span class="text-accent">of</span> jsonPathReader(reader, [
  <span class="text-white">'results'</span>,
  <span class="text-white">'progress'</span>,
  <span class="text-white">'data.*.name'</span>  <span class="text-gray-400">// Wildcard to match all names</span>
])) {
  <span class="text-accent">if</span> (path === <span class="text-white">'results'</span>) {
    updateResultsList(value);
  } <span class="text-accent">else if</span> (path === <span class="text-white">'progress'</span>) {
    updateProgressBar(value);
  } <span class="text-accent">else if</span> (path.includes(<span class="text-white">'.'</span>)) {
    <span class="text-gray-400">// Handle wildcard matches</span>
    handleItem(path, value);
  }
}</pre>
          </div>
        </div>

        <div class="flex justify-center mt-8">
          <a href="/docs/api-reference" class="btn relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 bg-white text-accent border border-accent hover:bg-accent/10 group github-btn">
            <span class="flex items-center relative z-10">
              View Full API Reference <span class="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- Simple Footer with enhanced elements -->
    <footer class="bg-white border-t border-gray-200 py-12 relative">
      <div class="absolute inset-0 noise-bg opacity-30"></div>
      <div class="container mx-auto px-4 text-center relative z-10">
        <p class="text-black">
          © 2023 jsonreader. Dual licensed: Free for personal use, $10 per project for commercial use.
        </p>
        <div class="mt-4 flex justify-center space-x-6">
          <a href="https://github.com/formkit/jsonreader" class="text-black hover:text-accent transition-colors duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a href="/docs/api-reference" class="text-black hover:text-accent transition-colors duration-300">API Reference</a>
          <a href="https://buy.stripe.com/14k7uU7jqc7x4jmdQS" class="text-black hover:text-accent transition-colors duration-300">Buy License</a>
        </div>
      </div>
    </footer>
    
    <!-- Float to top button -->
    <div class="fixed bottom-8 right-8 bg-accent hover:bg-accent/90 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-110" @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

// Create a grid pattern background effect for code blocks
const createBackgroundGridPattern = () => {
  if (process.client) {
    setTimeout(() => {
      const codeWindows = document.querySelectorAll('.code-window-content');
      codeWindows.forEach(codeWindow => {
        if (!codeWindow.querySelector('.bg-grid-pattern')) {
          const gridPattern = document.createElement('div');
          gridPattern.classList.add('bg-grid-pattern');
          gridPattern.style.position = 'absolute';
          gridPattern.style.inset = '0';
          gridPattern.style.opacity = '0.05';
          gridPattern.style.pointerEvents = 'none';
          gridPattern.style.backgroundSize = '20px 20px';
          gridPattern.style.backgroundImage = 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)';
          codeWindow.appendChild(gridPattern);
        }
      });
    }, 100);
  }
};

// Create a scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Initialize any client-side effects
onMounted(() => {
  createBackgroundGridPattern();
});
</script>

<style scoped>
.animate-pulse-subtle {
  animation: pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-subtle {
  0%, 100% {
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
  @apply text-xl font-bold mb-3 text-black;
}

.doc-text {
  @apply text-black leading-relaxed;
}

.inline-code {
  @apply font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded text-black border border-gray-200;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
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
    text-shadow: 0 0 10px rgba(0, 122, 255, 0.5), 0 0 20px rgba(0, 122, 255, 0.2);
  }
}
</style> 