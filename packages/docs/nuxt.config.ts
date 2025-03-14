// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],

  // We can remove the custom CSS import since the Tailwind module will handle it
  // css: ['~/assets/css/main.css'],

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
        { name: "theme-color", content: "#007AFF" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
    highlight: {
      theme: {
        default: "monokai",
        dark: "monokai",
        sepia: "monokai",
      },
      preload: [
        "json",
        "js",
        "ts",
        "html",
        "css",
        "vue",
        "diff",
        "shell",
        "markdown",
        "yaml",
        "bash",
      ],
    },
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
