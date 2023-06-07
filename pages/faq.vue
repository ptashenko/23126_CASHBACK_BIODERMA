<script lang="ts" setup>
import type { IAccordion } from '~/types/types'

useHead({ title: 'FAQ' })

const route = useRoute()

const faq: IAccordion[] = [
  {
    title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit 01`,
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit 02`,
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]
</script>

<template>
  <div class="container md:w-3/4 mx-auto mt-130px">
    <div class="text-4xl text-green font-black mb-7" v-text="'FAQ'" />
    <BaseAccordion :active-item="route.query.item" :items="faq" />
  </div>
</template>
