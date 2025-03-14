// Import Prism's default theme (closest to Monokai)
import "prismjs/themes/prism-tomorrow.css"
import Prism from "prismjs"

// Add additional languages
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-css"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-markup" // For HTML

export default defineNuxtPlugin(() => {
  return {
    provide: {
      prism: Prism,
    },
  }
})
