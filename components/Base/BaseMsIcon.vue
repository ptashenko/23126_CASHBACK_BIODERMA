<script lang="ts" setup>
import type { colors, iconVariants, sizes, IGenericTypesForVue } from '~/types/types'

interface Props {
  icon: string
  variant?: iconVariants
  color?: colors | IGenericTypesForVue['string']
  size?: sizes | IGenericTypesForVue['string']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'empty',
  color: 'primary',
  size: 'md',
})

const getColor = () => ({
  inherit: 'text-inherit',
  primary: 'text-primary',
  white: 'text-white',
  body: 'text-body',
  disabled: 'text-body/50',
})[props.color] || props.color

const getSize = () => ({
  sm: 'text-base',
  md: 'text-3xl',
  lg: 'text-6xl',
})[props.size] || props.size

const getVariant = () => ({
  empty: 'icon-empty',
  filled: 'icon-filled',
  slim: 'icon-slim',
  strong: 'icon-strong',
})[props.variant]

</script>

<template>
  <span
    class="mso font-icon font-normal normal leading-none tracking-normal normal-case whitespace-nowrap inline-block"
    :class="[getVariant(), getColor(), getSize()]"
  >{{ icon }}</span>
</template>
