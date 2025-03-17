<template>
  <span :class="['text-accent flex items-center', sizeClasses.container]">
    <svg
      :class="['inline-flex', sizeClasses.icon]"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Background circle -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="currentColor"
        class="text-accent"
      />
      
      <!-- JSON-like syntax -->
      <text
        x="50"
        y="50"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="white"
        :font-size="sizeClasses.fontSize"
        font-family="monospace"
        font-weight="bold"
      >
        {&hellip;}
      </text>
    </svg>
    <span :class="sizeClasses.text">jsonreader</span>
  </span>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  size: {
    type: String,
    default: "large", // 'large', 'medium', or 'small'
  },
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case "small":
      return {
        container: "text-xl",
        icon: "w-8 h-8 mr-2",
        fontSize: "24",
        text: "font-semibold",
      }
    case "medium":
      return {
        container: "text-2xl",
        icon: "w-10 h-10 mr-2.5",
        fontSize: "32",
        text: "font-bold",
      }
    case "large":
    default:
      return {
        container: "text-3xl md:text-4xl",
        icon: "w-16 h-16 md:w-20 md:h-20 mr-3 md:mr-4",
        fontSize: "48",
        text: "font-bold",
      }
  }
})
</script>

<style scoped>
/* Component-specific styles can be added here */
</style>
