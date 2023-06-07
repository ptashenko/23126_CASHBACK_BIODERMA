<script lang="ts">
export default { inheritAttrs: false }
</script>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import type { TInputType } from '~/types/types'

interface Props {
  type?: TInputType
  name: string
  label: string
  icon?: string
  helperText?: string
  initialValue?: string
  rules: Record<string, any> | string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  icon: undefined,
  type: 'text',
  helperText: undefined,
  initialValue: '',
})

// Todo. fix this lint to make it work accordingly
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'keydown', data: any): void,
  (e: 'blur', data: Event): void,
  (e: 'paste', data: Event): void
}>()

const attrs = useAttrs()
const isRequired = computed(() => fieldIsRequired(attrs.required as boolean, props.rules))

const {
  value,
  errorMessage,
  handleChange,
} = useField(
  toRef(props, 'name'),
  props.rules,
  {
    label: props.label,
    ...(props.initialValue && { initialValue: props.initialValue }),
  }
)

const validationListeners = computed(() => {
  // If the field is valid or have not been validated yet, lazy validation
  return {
    paste: (e: Event) => emit('paste', e),
    keydown: (e: KeyboardEvent) => emit('keydown', e),
    blur: (e: Event) => {
      handleChange(e)
      emit('blur', e)
    },
    change: handleChange,
    input: (e: any) => handleChange(e, !!errorMessage.value), // only switched this to aggressive
  }
})

</script>
<template>
  <div>
    <div class="text-left">
      <div class="flex justify-center items-center gap-2">
        <BaseMsIcon v-if="props.icon" :icon="icon" class="mt-10" variant="filled" />
        <div class="relative w-full">
          <!-- Standard label UI -->
          <label
            v-if="!useFloatingLabel"
            :for="name"
            class="text-body text-sm font-bold"
          >{{ label }}<span v-if="isRequired">*</span>
          </label>
          <!-- Share input UI -->
          <input
            :id="name"
            v-model="value"
            :class="[
              useFloatingLabel ?
                'bg-transparent border-transparent border-b-body focus:placeholder-transparent placeholder-transparent px-2 h-10' :
                'bg-white border-body placeholder-gray-light py-4',
              {'border-b-error': errorMessage}]"
            :name="name"
            :placeholder="useFloatingLabel ? props.label : $attrs.placeholder"
            :type="props.type"
            class="peer px-2 w-full rounded-0.8rem max-h-50px font-bold border
              focus:(outline-none border-b-info) autofill:(!text-black border-secondary !shadow-input)
              disabled:(text-primary opacity-70 cursor-not-allowed)"
            v-bind="$attrs"
            v-on="validationListeners"
          >
          <!-- Floating label UI -->
          <label
            v-if="useFloatingLabel"
            :class="{'after:(content-[attr(data-after)] text-sm)': isRequired}"
            :for="name"
            class="absolute left-2 -top-3.5 transition-all select-none pointer-events-none text-body
             peer-placeholder-shown:top-2 peer-focus:(-top-3.5 text-sm)"
            data-after=" *"
          >{{ label }}</label>
        </div>
      </div>
      <div v-if="helperText" class="text-sm text-body" v-text="helperText" />
      <ErrorMessage :class="{'pl-10': icon}" :name="props.name" as="span" class="block text-sm text-error mt-1" />
    </div>
  </div>
</template>

<style scoped>
/* Temporary Fix */
input:not([type="date"]):-webkit-autofill ~ label {
  @apply text-gray-600 text-sm -top-3.5;
}

</style>
