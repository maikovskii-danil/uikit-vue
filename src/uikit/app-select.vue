<template>
  <div class="w-full relative">
    <button
      ref="select-btn"
      :class="[
        'w-full',
        'flex items-center',
        'p-4 border focus:outline-2',
        'cursor-pointer rounded',
        'bg-white dark:bg-gray-900',
        'border-gray-400 dark:border-gray-900',
        'focus:outline-violet-500 focus:border-violet-500',
      ]"
    >
      <div
        v-if="currentDisplayName"
        class="text-gray-950 dark:text-white"
      >
        {{ currentDisplayName }}
      </div>
      <div
        v-else
        class="text-gray-400"
      >
        Не выбрано
      </div>
      <div
        :class="[
          'absolute top-2/4 -translate-1/2 right-3',
          'w-4 h-4',
          'before:block before:w-1 before:h-3.5',
          'before:absolute before:top-1/4 before:-translate-1/2 before:right-1',
          'before:-rotate-45',
          'before:bg-gray-500',
          'before:rounded',
          'after:block after:w-1 after:h-3.5',
          'after:absolute after:top-3/4 after:-translate-1/2 after:right-1',
          'after:rotate-45',
          'after:bg-gray-500',
          'after:rounded',
          hasDropdown && 'rotate-90',
        ]"
      />
    </button>
    <div
      ref="select-dropdown"
      :class="[
        'w-full',
        'px-2 py-1 dark:border',
        'absolute z-1',
        'cursor-default rounded',
        'bg-gray-900 dark:bg-gray-800 dark:border-gray-700',
        !hasDropdown && 'hidden',
      ]"
    >
      <template
        v-for="option in options"
        :key="option.id"
      >
        <button
          v-if="option.displayName"
          ref="select-options"
          :class="[
            'w-full',
            'cursor-pointer rounded',
            'px-4 py-2 my-1 outline-0 focus:outline-2',
            'text-white text-left',
            'hover:bg-violet-700',
            'focus:outline-violet-700',
          ]"
          @click="selectOption(option.id)"
        >
          {{ option.displayName }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from 'vue';
import { useEventListener, useToggle } from '@vueuse/core';

const { options } = defineProps<{
  options: Array<{ id: string; displayName: string }>;
}>();
const model = defineModel<string>();

const optionsMap = computed(() =>
  options.reduce(
    (acc, option) => ({ ...acc, [option.id]: option.displayName }),
    {} as Record<string, string>,
  ),
);

const currentDisplayName = computed(() => {
  if (model.value) {
    const key = model.value as keyof typeof optionsMap.value;
    const value = optionsMap.value[key];

    if (typeof value === 'string' && value) {
      return value;
    }
  }

  return undefined;
});

const button = useTemplateRef('select-btn');
const dropdown = useTemplateRef('select-dropdown');
const refOptions = useTemplateRef<HTMLButtonElement[]>('select-options');

const hasDropdown = ref(false);
const toggleHasDropdown = useToggle(hasDropdown);

const selectOption = (optionId: string) => {
  model.value = optionId;

  if (!dropdown.value) {
    return;
  }

  toggleHasDropdown();
};

useEventListener(button, 'click', async () => {
  if (!dropdown.value) {
    return;
  }

  toggleHasDropdown();
  await nextTick();

  if (refOptions.value) {
    refOptions.value[0]?.focus();
  }
});

useEventListener(document, 'click', (evt) => {
  if (!button.value || !dropdown.value || !evt.target) {
    return;
  }

  const target = evt.target as Node;

  if (!button.value.contains(target) && !dropdown.value.contains(target)) {
    toggleHasDropdown(false);
  }
});
</script>
