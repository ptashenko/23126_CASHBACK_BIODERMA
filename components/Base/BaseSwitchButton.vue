<script lang="ts">
export default { inheritAttrs: false }
</script>

<script lang="ts" setup>

interface Props {
  modelValue: boolean
}

const attrs = useAttrs()
const props = defineProps<Props>()

const emit = defineEmits<{(e: 'change:modelValue', data: string | boolean): void }>()
const handleChange = ($event: Event) => {
  const target = $event.target as HTMLInputElement
  emit('change:modelValue', attrs['true-value'] ? attrs[`${target.checked}-value`] as string : target.checked)
}

</script>
<template>
  <div class="relative w-50px h-22px rounded-pill" :class="$attrs.class">
    <input
      v-bind="$attrs"
      :value="props.modelValue"
      type="checkbox"
      class="peer sr-only"
      @change="handleChange"
    >
    <label
      :for="$attrs.id"
      class="block relative cursor-pointer w-full h-full rounded-pill bg-gray
     transition-colors duration-500 peer-checked:bg-success"
    />
    <span
      class="transform absolute top-1/2 left-2 -translate-y-1/2 -translate-x-1 block w-4 h-4 rounded-full bg-white pointer-events-none
     peer-checked:translate-x-[140%] transition-transform duration-500"
    />
  </div>
</template>
