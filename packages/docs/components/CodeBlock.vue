<template>
  <div class="code-window my-6 shadow-lg border border-gray-100 rounded-lg overflow-hidden">
    <div class="code-window-header flex justify-between items-center bg-gray-50 border-b border-gray-100 px-4 py-2">
      <div class="code-window-dots">
        <div class="code-window-dot bg-accent-6"></div>
        <div class="code-window-dot bg-accent-5"></div>
        <div class="code-window-dot bg-accent-4"></div>
      </div>
      <div class="language-label text-gray-500 text-xs">{{ language }}</div>
      <button 
        v-if="code" 
        @click="copyCode" 
        class="text-xs text-gray-500 hover:text-accent-1 transition-colors px-2 py-1 rounded hover:bg-gray-100"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <div class="code-window-content relative p-6 bg-black text-white overflow-auto">
      <!-- Code content -->
      <div class="relative z-10">
        <slot></slot>
      </div>
      
      <!-- Line numbers -->
      <div v-if="showLineNumbers" class="absolute top-6 left-4 text-opacity-50 select-none">
        <div v-for="n in lineCount" :key="n" class="text-gray-500 text-right pr-4">{{ n }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  language: {
    type: String,
    default: 'typescript'
  },
  showLineNumbers: {
    type: Boolean,
    default: true
  },
  code: {
    type: String,
    default: ''
  }
});

const copied = ref(false);
const lineCount = computed(() => {
  if (!props.code) return 0;
  return props.code.split('\n').length;
});

const copyCode = () => {
  navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
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
</style> 