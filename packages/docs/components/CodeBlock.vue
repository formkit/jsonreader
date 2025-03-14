<template>
  <div
    class="code-window my-6 border border-gray-200 rounded-lg overflow-hidden"
  >
    <div
      class="code-window-header flex justify-between items-center bg-gray-50 border-b border-gray-100 px-4 py-2"
    >
      <div class="code-window-dots">
        <div class="code-window-dot bg-error"></div>
        <div class="code-window-dot bg-warning"></div>
        <div class="code-window-dot bg-success"></div>
      </div>
      <div class="language-label text-gray-500 text-xs">
        {{ language.toUpperCase() }}
      </div>
      <button
        v-if="code"
        @click="copyCode"
        class="text-xs text-gray-500 hover:text-accent-1 transition-colors px-2 py-1 rounded hover:bg-gray-100"
      >
        {{ copied ? "Copied!" : "Copy" }}
      </button>
    </div>
    <div class="code-window-content relative p-6 bg-[#272822] text-white">
      <ClientOnly>
        <!-- Prism-highlighted code (client-side only) -->
        <div class="flex">
          <!-- Line numbers -->
          <div
            v-if="showLineNumbers"
            class="line-numbers select-none pr-4 opacity-50 text-right"
          >
            <div
              v-for="n in lineCount"
              :key="n"
              class="text-gray-500 leading-relaxed"
            >
              {{ n }}
            </div>
          </div>

          <!-- Code content -->
          <pre
            class="flex-1 relative z-10 m-0 p-0 bg-transparent overflow-x-auto whitespace-pre"
          ><code :class="`language-${prismLanguage}`" v-html="highlightedCode"></code></pre>
        </div>
        <template #fallback>
          <!-- Non-highlighted fallback for SSR -->
          <div class="flex">
            <!-- Line numbers -->
            <div
              v-if="showLineNumbers"
              class="line-numbers select-none pr-4 opacity-50 text-right"
            >
              <div
                v-for="n in lineCount"
                :key="n"
                class="text-gray-500 leading-relaxed"
              >
                {{ n }}
              </div>
            </div>

            <!-- Code content -->
            <pre
              class="flex-1 relative z-10 m-0 p-0 bg-transparent overflow-x-auto whitespace-pre"
            ><code>{{ code }}</code></pre>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"

const props = defineProps({
  language: {
    type: String,
    default: "typescript",
  },
  showLineNumbers: {
    type: Boolean,
    default: true,
  },
  code: {
    type: String,
    default: "",
  },
})

// Map language aliases to Prism language names
const languageMap = {
  js: "javascript",
  ts: "typescript",
  bash: "bash",
  shell: "bash",
  sh: "bash",
  html: "markup",
  xml: "markup",
  yml: "yaml",
  py: "python",
}

const prismLanguage = computed(() => {
  return (
    languageMap[props.language.toLowerCase()] || props.language.toLowerCase()
  )
})

const nuxtApp = useNuxtApp()
const copied = ref(false)
const highlightedCode = ref("")

const lineCount = computed(() => {
  if (!props.code) return 0
  return props.code.split("\n").length
})

const highlightCode = () => {
  if (!process.client || !props.code) {
    highlightedCode.value = props.code
    return
  }

  try {
    const Prism = nuxtApp.$prism
    if (!Prism) {
      console.warn("Prism.js not available")
      highlightedCode.value = props.code
      return
    }

    // Use the mapped language
    const lang = prismLanguage.value

    // Check if language is loaded
    if (Prism.languages[lang]) {
      highlightedCode.value = Prism.highlight(
        props.code,
        Prism.languages[lang],
        lang
      )
    } else {
      console.warn(`Language '${lang}' not loaded in Prism`)
      highlightedCode.value = props.code
    }
  } catch (error) {
    console.error("Error highlighting code:", error)
    highlightedCode.value = props.code
  }
}

onMounted(() => {
  if (process.client) {
    highlightCode()
  }
})

watch(() => props.code, highlightCode)
watch(() => props.language, highlightCode)

const copyCode = () => {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.language-label {
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.code-window-dot {
  @apply w-2.5 h-2.5 rounded-full mr-1;
}

:deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent !important;
  text-shadow: none !important;
  tab-size: 2;
}

:deep(code) {
  font-family: "JetBrains Mono", monospace !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  background: transparent !important;
  text-shadow: none !important;
  color: #f8f8f2 !important;
  white-space: pre !important;
}

.line-numbers {
  min-width: 2rem;
  font-size: 0.9rem;
  line-height: 1.5;
  font-family: "JetBrains Mono", monospace;
}

/* Override Prism.js token colors to match Monokai theme */
:deep(.token.comment),
:deep(.token.prolog),
:deep(.token.doctype),
:deep(.token.cdata) {
  color: #8292a2 !important;
}

:deep(.token.punctuation) {
  color: #f8f8f2 !important;
}

:deep(.token.property),
:deep(.token.tag),
:deep(.token.constant),
:deep(.token.symbol),
:deep(.token.deleted) {
  color: #f92672 !important;
}

:deep(.token.boolean),
:deep(.token.number) {
  color: #ae81ff !important;
}

:deep(.token.selector),
:deep(.token.attr-name),
:deep(.token.string),
:deep(.token.char),
:deep(.token.builtin),
:deep(.token.inserted) {
  color: #a6e22e !important;
}

:deep(.token.operator),
:deep(.token.entity),
:deep(.token.url),
:deep(.language-css .token.string),
:deep(.style .token.string),
:deep(.token.variable) {
  color: #f8f8f2 !important;
}

:deep(.token.atrule),
:deep(.token.attr-value),
:deep(.token.function) {
  color: #e6db74 !important;
}

:deep(.token.keyword) {
  color: #66d9ef !important;
}

:deep(.token.regex),
:deep(.token.important) {
  color: #fd971f !important;
}
</style>
