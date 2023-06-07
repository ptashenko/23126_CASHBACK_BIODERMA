<script lang="ts">
export default { inheritAttrs: false }
</script>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import type { TSelectData } from '~/types/types'

interface Props {
  name: string
  options: TSelectData[] | null
  label: string
  firstOption?: string
  rules: Record<string, any> | string
}

const props = withDefaults(defineProps<Props>(), {
  firstOption: '',
})

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{ (e: 'change', data: any): void }>()

const attrs = useAttrs()
const isRequired = computed(() => fieldIsRequired(attrs.required as boolean, props.rules))

const {
  value,
  handleChange,
} = useField(
  toRef(props, 'name'),
  props.rules,
  {
    label: props.label,
  }
)

const validationListeners = computed(() => {
  return {
    change: (e: Event) => {
      handleChange(e)
      emit('change', e)
    },
  }
})

</script>

<template>
  <div :class="['text-left']">
    <div class="flex justify-center items-center gap-2">
      <div class="relative w-full">
        <!-- Standard label UI -->
        <label
          v-if="!useFloatingLabel"
          :for="name"
          class="text-body text-sm font-bold"
        >{{ label }}<span v-if="isRequired">*</span>
        </label>
        <select
          :id="name"
          :class="[
            useFloatingLabel ?
              'border-transparent border-b-body h-10' :
              'rounded border-body py-2 text-body'
          ]"
          :name="name"
          :value="value"
          class="peer appearance-none px-2 w-full rounded-0.8rem min-h-50px max-h-50px text-body font-bold bg-transparent border placeholder-transparent
                focus:outline-none focus:border-b-info
                autofill:(!text-black border-secondary !shadow-input)"
          v-bind="$attrs"
          v-on="validationListeners"
        >
          <template v-if="!!options.length">
            <option disabled selected value="" v-text="firstOption" />
            <option v-for="option in options" :key="option.value" :value="option.value" v-text="option.label" />
          </template>
        </select>
        <span
          :class="[$attrs.disabled ? 'text-body/50' : 'text-body',
                   useFloatingLabel ?'top-1/2' : 'top-8/12 text-primary']"
          class="transform absolute right-2 -translate-y-1/2 pointer-events-none"
        >
          <nuxt-icon name="expand-more" />
        </span>
        <!-- Floating label UI -->
        <label
          v-if="useFloatingLabel"
          :class="[(value) ? 'text-sm translate-y-[-170%]' : 'text-base -translate-y-1/2',
                   {'after:(content-[attr(data-after)] text-sm)': isRequired}]"
          :for="name"
          class="transform absolute left-2 top-1/2 select-none pointer-events-none transition-floating-label
                peer-focus:text-sm peer-focus:translate-y-[-170%] peer-focus:opacity-100 peer-disabled:text-body/50
                peer-required:after:content-['_*'] peer-required:after:text-sm"
          data-after=" *"
        >{{ label }}</label>
      </div>
    </div>
    <ErrorMessage :name="props.name" as="span" class="block text-sm text-error mt-1" />
  </div>
</template>
