<template>
  <div
    class="overflow-hidden transition-[height] duration-1000"
    :style="`height: ${currentHeightDebounced}px`"
  >
    <Transition
      name="opacity"
      mode="out-in"
    >
      <div
        v-if="!isEmptyThrottled"
        class="w-full flex flex-col"
      >
        <div
          :class="[
            'flex items-center',
            'cursor-default',
            'px-4 py-6',
            'bg-violet-200 dark:text-gray-100 dark:bg-gray-900',
          ]"
          :style="`height: ${initialRowHeight}px`"
        >
          <div
            v-for="header in computedTable.headers"
            :key="header.id"
            :class="header.twStyle"
          >
            {{ header.displayName }}
          </div>
        </div>
        <div class="w-full flex flex-col">
          <template
            v-for="row in computedTable.rows"
            :key="row.id"
          >
            <div
              :class="[
                'flex items-center',
                'px-4 py-6',
                'odd:bg-white even:bg-violet-200',
                'dark:odd:bg-gray-800 dark:even:bg-gray-900 dark:text-gray-100',
              ]"
              :style="`height: ${initialRowHeight}px`"
            >
              <div
                v-for="(cell, index) in row.cells"
                :key="computedTable.headers[index]?.id ?? 'unknown'"
                :class="cell.twStyle"
              >
                <slot
                  :row
                  :cell
                  :name="computedTable.headers[index]?.id ?? 'unknown'"
                >
                  {{ cell.value }}
                </slot>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div
        v-else
        :style="`height: ${initialRowHeight * emptyHeightInRows}px`"
        class="w-full flex items-center justify-center dark:text-gray-100"
      >
        {{ emptyText }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { ITable, ITableProps } from '@/types/table';
import { refDebounced, refThrottled } from '@vueuse/core';
import { DEBOUNCE_DELAY } from '@/consts';
import { computed } from 'vue';

const EMPTY_HEIGHT_IN_ROWS = 6;
const INITIAL_ROW_HEIGHT = 52;

const {
  table = { headers: [], rows: [] },
  emptyText = 'Ничего нет',
  emptyHeightInRows = EMPTY_HEIGHT_IN_ROWS,
  initialRowHeight = INITIAL_ROW_HEIGHT,
} = defineProps<{
  table?: ITableProps | ITable;
  emptyText?: string;
  emptyHeightInRows?: number;
  initialRowHeight?: number;
}>();

const computedTable = computed<ITable>(() => {
  if (table && table.headers?.length && table.rows?.length) {
    return {
      headers: table.headers,
      rows: table.rows.map((item, index) => ({
        ...item,
        id: table.headers[index]?.id ?? '== UNKNOWN HEADER ==',
      })),
    } as ITable;
  }

  return { headers: [], rows: [] };
});

const isEmpty = computed(() => !computedTable.value.rows.length);
const isEmptyThrottled = refThrottled<boolean>(isEmpty, DEBOUNCE_DELAY);

const currentHeight = computed(() => {
  const HEADER_ROW_LENGTH = 1;
  const rowsLength =
    isEmpty.value ? emptyHeightInRows : (
      computedTable.value.rows.length + HEADER_ROW_LENGTH
    );

  return rowsLength * initialRowHeight;
});

const currentHeightDebounced = refDebounced<number>(
  currentHeight,
  DEBOUNCE_DELAY,
);
</script>
