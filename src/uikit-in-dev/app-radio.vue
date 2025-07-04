<template>
  <label class="flex items-center gap-4 cursor-pointer">
    <input
      v-model="model"
      type="radio"
      class="radio"
      :="$attrs"
    />
    <div><slot /></div>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<style scoped>
.radio {
  all: unset;
  box-sizing: border-box;
  border: 1px solid #909ca9;
  border-radius: 8px;
  width: 16px;
  height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;

  &:checked {
    background: #0363c9;
    border: 1px solid #0363c9;
  }
  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #fff;
  }
}
</style>
