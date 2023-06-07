<script lang="ts" setup>
import type { IAccordion } from '~/types/types'

interface Props {
  items: IAccordion[]
  activeItem?: string
}

const props = defineProps<Props>()

const activeItem = ref(props.activeItem)
const setItem = (id: string) => {
  activeItem.value = activeItem.value === id ? '' : id
}

const start = (el: HTMLDivElement) => {
  el.style.height = `${el.scrollHeight}px`
}

const end = (el: HTMLDivElement) => {
  el.style.height = ''
}
</script>
<template>
  <div class="wrapper">
    <div v-for="({title, content}) in props.items" :key="title.replaceAll(' ', '-')" class="mb-4">
      <div class="w-full bg-white">
        <slot name="accordion-trigger">
          <button class="w-full p-4 flex text-left text-black sans700 text-xl items-center justify-between" @click="setItem(title)">
            <span v-text="title" />
            <BaseMsIcon variant="strong" :icon="activeItem === title ? 'remove' : 'add'" />
          </button>
        </slot>
      </div>
      <transition
        name="accordion"
        @enter="start"
        @after-enter="end"
        @before-leave="start"
        @after-leave="end"
      >
        <div v-if="activeItem === title" class="bg-white">
          <slot name="accordion-content">
            <div class="text-left p-4">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="text-normal text-black" v-html="content" />
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  will-change: height;
  transition: height 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from, .accordion-leave-to {
  height: 0 !important;
}

</style>
