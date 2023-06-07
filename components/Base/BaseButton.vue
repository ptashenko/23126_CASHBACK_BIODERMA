<script lang="ts" setup>
import { IRouterTo, position, shape, sizes, TButtonType, TButtonVariant } from '~/types/types'

interface Props {
  label: string
  type?: TButtonType
  to?: IRouterTo
  variant?: TButtonVariant,
  size?: sizes,
  position?: position,
  shape?: shape
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  to: undefined,
  variant: 'default',
  size: 'md',
  position: 'center',
  shape: 'square',
})

const NuxtLink = resolveComponent('NuxtLink')

const mainClass = computed(() => ({
  default: 'border-primary !button-gradient text-white hover:main-gradient hover:text-[#b4273f]',
  inverse: 'border-white bg-white text-primary hover:main-gradient hover:text-white',
})[props.variant])

const buttonShape = computed(() => ({
  square: '',
  pill: 'rounded-pill',
  rounded: 'rounded',
})[props.shape])

const buttonSize = computed(() => ({
  sm: 'text-sm transform scale-y-110 pt-2 pb-1 px-2',
  md: 'text-3xl transform scale-y-110 pt-1  px-10',
  lg: '',
})[props.size])

const buttonPosition = computed(() => ({
  left: 'mr-auto',
  center: 'mx-auto',
  right: 'ml-auto',
  unset: 'mx-auto',
})[props.position])

</script>
<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :class="[mainClass, buttonSize, buttonPosition, buttonShape]"
    :target="$attrs.target ?? null"
    :to="props.to ?? null"
    :type="type ?? null"
    class="button-gradient font-bold uppercase flex items-center w-fit font-bold shadow-btn cursor-pointer
     transition-colors duration-500 no-underline"
    v-bind="$attrs"
  >
    {{ label }}
  </component>
</template>
