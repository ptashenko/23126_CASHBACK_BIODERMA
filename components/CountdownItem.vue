<script lang="ts" setup>

/* We could define an object like {singular: 'minuto', plural: 'minuti'} */
/* As it is we expect an array with this order ['singular', 'plural']   */
interface Props {
  labelArr: string[]
  number: number
}

const props = defineProps<Props>()

const label = computed<string>(() => props.labelArr[props.number === 1 ? 0 : 1])
</script>

<template>
  <div class="text-center">
    <div class="flex mx-auto bg-primary rounded-full h-15 w-15 :md(h-20 w-20)">
      <span class="leading-none m-auto text-white text-2xl" v-text="number" />
    </div>
    <div class="mt-4 text-primary capitalize" v-text="label" />
  </div>
</template>
