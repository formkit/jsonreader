// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],

  // Add our custom CSS files
  css: ["~/assets/css/prism-override.css"],

  tailwindcss: {
    // Tailwind module configuration
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.js",
    exposeConfig: {
      level: 2, // exposes resolved tailwind config at runtime
    },
    viewer: true, // enables the Tailwind viewer at /tailwind-viewer
  },

  // Set the default layout for all pages
  app: {
    head: {
      title: "jsonreader - Stream Processing for AI Tool Calls",
      meta: [
        {
          name: "description",
          content:
            "Stream JSON responses from AI tool calls in real-time - no waiting for complete payloads",
        },
        // Basic meta tags
        { name: "theme-color", content: "#007AFF" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "robots", content: "index, follow" },

        // Open Graph tags for social sharing
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://jsonreader.com" },
        {
          property: "og:title",
          content: "jsonreader - Stream Processing for AI Tool Calls",
        },
        {
          property: "og:description",
          content:
            "Stream JSON responses from AI tool calls in real-time - no waiting for complete payloads",
        },
        {
          property: "og:image",
          content: "https://jsonreader.com/og-image.png",
        },

        // Twitter Card tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:url", content: "https://jsonreader.com" },
        {
          name: "twitter:title",
          content: "jsonreader - Stream Processing for AI Tool Calls",
        },
        {
          name: "twitter:description",
          content:
            "Stream JSON responses from AI tool calls in real-time - no waiting for complete payloads",
        },
        {
          name: "twitter:image",
          content: "https://jsonreader.com/og-image.png",
        },
      ],
      link: [
        // Updated favicon with multiple formats for better cross-browser support
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
    },
    // This will apply the default layout to all pages
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
  },

  content: {
    // Content module configuration
    highlight: false, // Disable Nuxt Content's built-in highlighting since we're using Prism.js
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },

  // Light mode by default
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  compatibilityDate: "2025-03-13",
}
