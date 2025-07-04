<template>
  <button
    :class="[
      'p-4 px-8 rounded-2xl',
      'text-sm',
      'focus:outline-2 outline-offset-2',
      'cursor-pointer',
      ...twCSS,
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { styleStrategy = 'primary' } = defineProps<{
  styleStrategy?: 'primary' | 'confirm' | 'danger' | 'neutral';
}>();

const twCSS = computed(() => {
  switch (styleStrategy) {
    case 'danger': {
      return [
        'bg-red-600 hover:bg-red-700 active:bg-red-800',
        'text-white',
        'focus:outline-red-600',
        'shadow-xl/20',
        'disabled:opacity-60',
        'disabled:cursor-not-allowed',
        'disabled:outline-0',
      ];
    }
    case 'confirm': {
      return [
        'bg-green-500 hover:bg-green-600 active:bg-green-700',
        'text-white',
        'focus:outline-green-500',
        'shadow-xl/20',
        'disabled:opacity-60',
        'disabled:cursor-not-allowed',
        'disabled:outline-0',
      ];
    }
    case 'neutral': {
      return [
        'bg-white dark:bg-gray-800',
        'hover:bg-gray-100 hover:outline-gray-100',
        'dark:hover:bg-gray-800',
        'text-gray-900 dark:text-gray-100',
        'outline-2',
        'outline-white dark:outline-gray-800',
        'focus:outline-gray-300',
        '-outline-offset-3!',
        'shadow-xl/20',
        'active:outline-0',
        'active:bg-gray-200 dark:active:bg-gray-900',
        'disabled:opacity-60',
        'disabled:cursor-not-allowed',
        'disabled:outline-0',
        'disabled:bg-white',
        'disabled:dark:bg-gray-800',
      ];
    }
    case 'primary':
    default: {
      return [
        'bg-violet-500 not-disabled:hover:bg-violet-600 not-disabled:active:bg-violet-700',
        'dark:bg-violet-700 dark:not-disabled:hover:bg-violet-600 dark:not-disabled:active:bg-violet-500',
        'text-white',
        'focus:outline-violet-500',
        'shadow-xl/20',
        'disabled:opacity-60',
        'disabled:cursor-not-allowed',
        'disabled:outline-0',
      ];
    }
  }
});
</script>
