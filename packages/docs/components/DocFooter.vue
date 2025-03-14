<template>
  <footer class="mt-16 border-t border-gray-200 py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="fade-in">
          <h3 class="text-xl font-bold text-black mb-4">Documentation</h3>
          <ul class="space-y-2">
            <li><a href="/docs/getting-started" class="text-gray-600 hover:text-accent-1 transition-colors">Getting Started</a></li>
            <li><a href="/docs/api-reference" class="text-gray-600 hover:text-accent-1 transition-colors">API Reference</a></li>
            <li><a href="/docs/examples" class="text-gray-600 hover:text-accent-1 transition-colors">Examples</a></li>
          </ul>
        </div>
        <div class="fade-in" style="animation-delay: 100ms;">
          <h3 class="text-xl font-bold text-black mb-4">Resources</h3>
          <ul class="space-y-2">
            <li><a href="https://github.com/formkit/jsonreader" target="_blank" class="text-gray-600 hover:text-accent-1 transition-colors">GitHub</a></li>
            <li><a href="https://github.com/formkit/jsonreader/issues" target="_blank" class="text-gray-600 hover:text-accent-1 transition-colors">Issues</a></li>
            <li><a href="https://www.npmjs.com/package/jsonreader" target="_blank" class="text-gray-600 hover:text-accent-1 transition-colors">npm Package</a></li>
          </ul>
        </div>
        <div class="fade-in" style="animation-delay: 200ms;">
          <h3 class="text-xl font-bold text-black mb-4">About</h3>
          <p class="text-gray-600 mb-4">
            jsonreader is a utility for processing JSON data from streams in real-time, optimized for AI tool calls and large API responses.
          </p>
          <div class="flex items-center space-x-4">
            <a href="https://github.com/formkit/jsonreader" target="_blank" class="text-gray-500 hover:text-accent-1 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://twitter.com/formkit" target="_blank" class="text-gray-500 hover:text-accent-1 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm slide-up">
        <p>© 2024 <a href="https://formkit.com" target="_blank" class="text-gray-600 hover:text-accent-1">FormKit</a>. Released under the MIT License.</p>
      </div>
    </div>
  </footer>
</template> 