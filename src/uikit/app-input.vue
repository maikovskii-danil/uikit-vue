<template>
  <label class="w-full flex flex-col gap-4 has-disabled:cursor-not-allowed">
    <div
      :class="[
        'w-full',
        'cursor-text rounded',
        'border',
        'bg-white dark:bg-gray-900',
        'border-gray-400 dark:border-gray-900',
        'focus-within:outline-2',
        'focus-within:outline-violet-500 focus-within:border-violet-500',
        'has-disabled:cursor-not-allowed',
        'has-disabled:bg-gray-200 dark:has-disabled:bg-gray-800',
        error
          && 'not-has-disabled:outline-2 outline-red-500 dark:outline-red-600',
      ]"
    >
      <input
        v-model="model"
        :class="[
          'w-full p-4 outline-0 dark:text-gray-100',
          'placeholder:text-gray-400',
          'disabled:cursor-not-allowed',
          'disabled:placeholder:text-gray-400 dark:disabled:placeholder:text-gray-600',
          error && 'placeholder:text-red-500',
        ]"
        :="$attrs"
      />
    </div>
    <div
      v-if="withError || error"
      class="text-red-600 dark:text-red-500 cursor-default text-xs min-h-7"
    >
      {{ error || '&nbsp;' }}
    </div>
  </label>
</template>

<script setup lang="ts">
const [model, modifiers] = defineModel<string>({
  set(value: string) {
    if (modifiers.num) {
      if (value === '') {
        return value;
      }

      const newValue =
        Array.from(value)
          .filter((letter) => !isNaN(Number(letter)))
          .join('') || '0';

      return modifiers.positive ?
          Math.abs(Number(newValue)).toString()
        : newValue;
    }

    return value;
  },
});
const { error = '', withError = false } = defineProps<{
  error?: string;
  withError?: boolean;
}>();
</script>
