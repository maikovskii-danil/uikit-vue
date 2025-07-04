<template>
  <Transition name="opacity">
    <div
      v-if="visible"
      class="fixed z-1"
    >
      <div
        class="fixed top-0 left-0 right-0 bottom-0 opacity-40 bg-black"
        @click="emit('close')"
      />
      <div
        class="fixed top-2/4 left-2/4 flex items-center justify-center m-auto -translate-1/2"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'close'): void }>();
const { visible } = defineProps<{ visible: boolean }>();
</script>
