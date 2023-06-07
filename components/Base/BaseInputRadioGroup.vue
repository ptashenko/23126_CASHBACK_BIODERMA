<script lang="ts" setup>
import { useField } from 'vee-validate'
import type { IRadioGroup } from '~/types/types'

interface Props {
  id: string
  name: string
  label: string
  isRequired?: boolean
  values: IRadioGroup[]
}

const props = defineProps<Props>()
const rules = computed(() => props.isRequired
  ? `required|one_of:${props.values.map(i => i.value).toString()}`
  : { required: false })

const {
  value,
  handleChange,
} = useField(
  toRef(props, 'name'),
  rules,
  {
    label: props.label,
  }
)

</script>
<template>
  <div class="text-left">
    <slot class="mt-6 mb-2" name="label">
      {{ props.label }}
    </slot>
    <span v-if="isRequired">*</span>
    <div class="w-full overflow-auto">
      <div :id="id" class="flex gap-6 w-[max-content]">
        <div v-for="radio in props.values" :key="radio.id" class="relative">
          <input
            :id="radio.id"
            v-model="value"
            :name="radio.id"
            :value="radio.value"
            class="peer appearance-none default:ring-2 checked:(text-primary bg-primary outline-4)"
            type="radio"
            @change="handleChange"
          >
          <BaseInputRadioLabel :for="`${radio.id}`" :label="radio.label" />
        </div>
      </div>
    </div>
    <ErrorMessage :name="props.name" as="span" class="block text-sm text-error mt-1" />
  </div>
</template>
