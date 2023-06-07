<script lang="ts">
export default { inheritAttrs: false }
</script>

<script lang="ts" setup>
import type { CurrencyInputOptions } from 'vue-currency-input'
import { useCurrencyInput } from 'vue-currency-input'
import { useField } from 'vee-validate'

interface Props {
  name: string
  options: CurrencyInputOptions
  label: string
  rules: Record<string, any> | string
  initialValue?: string | number
}

const emit = defineEmits<{(e: 'keydown', data: any): void,
  (e: 'blur', data: Event): void,
  (e: 'paste', data: Event): void,
}>()

const props = withDefaults(defineProps<Props>(), {
  initialValue: 0,
})
const attrs = useAttrs()
const isRequired = computed(() => fieldIsRequired(attrs.required as boolean, props.rules))

const {
  formattedValue,
  inputRef,
} = useCurrencyInput(props.options)
const { handleChange } =
  useField(
    props.name,
    props.rules,
    {
      label: props.label,
      ...(props.initialValue && { initialValue: props.initialValue }),
    })

watch(formattedValue, (newValue) => {
  if (newValue === '') {
    handleChange(undefined)
    return
  }

  const newNumber = Number(newValue).toFixed(2)
  if (Number.isNaN(newNumber)) {
    return
  }

  handleChange(newNumber)
})

const validationListeners = computed(() => {
  return {
    paste: (e: Event) => emit('paste', e),
    keydown: (e: KeyboardEvent) => emit('keydown', e),
    blur: (e: Event) => {
      handleChange(e)
    },
    change: handleChange,
    input: (e: any) => handleChange(e),
  }
})

</script>
<template>
  <div>
    <div class="text-left">
      <div class="flex justify-center items-center gap-2">
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
            ref="inputRef"
            :class="useFloatingLabel ?
              'bg-transparent border-transparent border-b-body focus:placeholder-transparent placeholder-transparent px-2' :
              'bg-white border-body focus:border-b-info placeholder-gray-light'"
            :placeholder="useFloatingLabel ? props.label : $attrs.placeholder"
            :value="formattedValue || initialValue"
            class="rounded-0.8rem peer h-10 px-2 w-full border font-bold max-h-50px min-h-50px
              focus:outline-none autofill:(!text-black border-secondary !shadow-input)
              disabled:(text-primary opacity-70 cursor-not-allowed)"
            type="text"
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
      <ErrorMessage :name="props.name" as="span" class="block text-sm text-error mt-1" />
    </div>
  </div>
</template>
