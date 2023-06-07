<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  title?: string
}>()

const emit = defineEmits<{(e: 'update:modelValue', modelValue: boolean): void}>()
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col p-4 bg-white dark:bg-black rounded border max-w-[90%] mx-auto border-gray-100 dark:border-gray-800"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="flex items-center h-10">
      <button class="ml-auto" @click="emit('update:modelValue', false)">
        <BaseMsIcon icon="close" class="w-10 h-10" />
      </button>
    </div>
    <slot name="title" />
    <slot name="body" />
  </VueFinalModal>
</template>
