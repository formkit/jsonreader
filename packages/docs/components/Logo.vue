<template>
  <span :class="['text-accent flex items-center', sizeClasses.container]">
    <span
      :class="[
        'inline-flex items-center justify-center bg-accent text-white rounded-full leading-none tracking-tighter',
        sizeClasses.icon,
      ]"
      >{&hellip;}</span
    >
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
        icon: "w-8 h-8 mr-2 text-xs",
        text: "font-semibold",
      }
    case "medium":
      return {
        container: "text-2xl",
        icon: "w-10 h-10 mr-2.5 text-xl",
        text: "font-bold",
      }
    case "large":
    default:
      return {
        container: "text-3xl md:text-4xl",
        icon: "w-16 h-16 md:w-20 md:h-20 mr-3 md:mr-4 text-2xl md:text-3xl",
        text: "font-bold",
      }
  }
})
</script>

<style scoped>
/* Component-specific styles can be added here */
</style>
