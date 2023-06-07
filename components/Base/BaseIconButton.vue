<script lang="ts" setup>
import type { colors, iconVariants, IGenericTypesForVue, sizes } from '~/types/types'

interface Props {
  icon?: string
  size?: sizes | IGenericTypesForVue['string']
  color?: colors | IGenericTypesForVue['string']
  iconVariant?: iconVariants
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'close',
  size: 'md',
  color: 'primary',
  iconVariant: 'slim',
})

const buttonSize = computed(() => ({
  sm: 'text-base',
  md: 'text-3xl',
  lg: 'text-6xl',
})[props.size]) || props.size

</script>
<template>
  <button
    v-bind="$attrs"
    class="flex items-center p-3 cursor-pointer transition-colors duration-500"
    :class="[buttonSize]"
  >
    <BaseMsIcon :icon="props.icon" :color="props.color" :variant="props.iconVariant" :size="props.size" />
  </button>
</template>
