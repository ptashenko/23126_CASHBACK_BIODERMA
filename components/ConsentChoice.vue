<script lang="ts" setup>

import { useField } from 'vee-validate'

interface Props {
  name: string
  content?: string
  errorMsg: string
  isRequired?: boolean
}

const props = withDefaults(defineProps<Props>(), { content: '', isRequired: false })
const rules = props.isRequired ? { required: true, is: 1 } : { required: true, one_of: [0, 1] }
const { value, errorMessage } = useField(props.name, rules, { type: 'radio' })

</script>
<template>
  <div :id="name">
    <slot name="content">
      <div class="text-left text-lg">
        {{ content }}
      </div>
    </slot>
    <div class="flex gap-6 my-6">
      <div class="relative">
        <input
          :id="`${props.name}-si`"
          v-model="value"
          :value="1"
          class="peer appearance-none default:ring-2 checked:(text-primary bg-primary outline-4)"
          :name="props.name"
          type="radio"
        >
        <BaseInputRadioLabel :for="`${props.name}-si`" label="Si" />
      </div>
      <div class="relative">
        <input
          :id="`${props.name}-no`"
          v-model="value"
          :value="0"
          class="peer appearance-none default:ring-2 checked:(text-primary bg-primary outline-4)"
          :name="props.name"
          type="radio"
        >
        <BaseInputRadioLabel :for="`${props.name}-no`" label="No" />
      </div>
    </div>
    <span v-if="errorMessage" class="block text-left text-sm text-error" v-text="errorMsg" />
  </div>
</template>
