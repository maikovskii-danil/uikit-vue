<template>
  <Transition name="opacity">
    <div
      v-if="visible"
      class="border border-solid border-l-8 p-8 bg-white dark:bg-gray-900"
      :class="twCSS"
    >
      <div class="text-3xl">{{ title }}</div>
      <div
        ref="before-close-button"
        class="my-7 pl-3 text-black dark:text-gray-100"
      >
        {{ textCache }}
      </div>
      <app-button
        type="button"
        :style-strategy="styleStrategy"
        @click="emit('close')"
      >
        Закрыть
      </app-button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useFocus } from '@vueuse/core';

const emit = defineEmits<{ (e: 'close'): void }>();

useFocus(useTemplateRef<HTMLDivElement>('before-close-button'), {
  initialValue: true,
});

const {
  styleStrategy = 'primary',
  title = 'Alert Title',
  text = 'Some text description',
  visible = false,
} = defineProps<{
  styleStrategy?: 'primary' | 'danger';
  title?: string;
  text?: string;
  visible?: boolean;
}>();

const textCache = computed((previous) => text || previous);
const twCSS = computed(() => {
  switch (styleStrategy) {
    case 'danger': {
      return 'text-red-500 border-red-500 dark:text-red-600 dark:border-red-600';
    }
    case 'primary':
    default: {
      return 'text-green-500 border-green-500 dark:text-green-600 dark:border-green-600';
    }
  }
});
</script>
