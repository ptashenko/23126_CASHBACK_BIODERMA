<script lang="ts" setup>
import Datepicker from 'vue3-datepicker'
import { it } from 'date-fns/locale'
import { useField } from 'vee-validate'
import type { IDragonConfig } from '~/types/types'

interface Props {
  name: string
  label: string
  upperLimit?: Date | null
  lowerLimit?: Date | null
  startingView?: 'time' | 'day' | 'month' | 'year'
  minimumView?: 'time' | 'day' | 'month' | 'year'
  initialValue?: Date | string
  inputFormat?: string
  clearable?: boolean
  helperText?: string
  disabled?: boolean
}

const { DATE_FORMAT }: IDragonConfig = decrypt(dragonConfig)
const props = withDefaults(defineProps<Props>(), {
  upperLimit: null,
  lowerLimit: null,
  startingView: 'month',
  minimumView: 'day',
  initialValue: '',
  inputFormat: '',
  clearable: false,
  helperText: '',
  disabled: false,
})

const {
  value,
  handleChange,
} = useField(
  toRef(props, 'name'),
  'required',
  {
    label: props.label,
    ...(props.initialValue && { initialValue: props.initialValue }),
  }
)

</script>
<template>
  <div>
    <!-- FixMe: clearable icon in floating label UI -->
    <div :class="{'isTimePicker': startingView && minimumView === 'time'}" class="relative relative w-full">
      <!-- Standard label UI -->
      <label
        v-if="!useFloatingLabel"
        :for="name"
        class="text-body text-sm font-bold text-left block leading-6"
      >{{ label }}<span>*</span>
      </label>
      <!-- Share input UI -->
      <Datepicker
        :id="name"
        :class="useFloatingLabel ?
          'bg-transparent border-transparent border-b-body focus:placeholder-transparent placeholder-transparent px-2' :
          'bg-white border-body focus:border-b-info placeholder-gray-light'"
        :clearable="clearable"
        :disabled="disabled"
        :input-format="inputFormat || DATE_FORMAT"
        :locale="it"
        :lower-limit="lowerLimit"
        :minimum-view="minimumView"
        :model-value="value"
        :placeholder="useFloatingLabel ? props.label : `${$attrs.placeholder}`"
        :starting-view="startingView"
        :upper-limit="upperLimit"
        class="rounded-0.8rem font-bold peer min-h-50px max-h-50px px-2 w-full border
              focus:outline-none autofill:(!text-black border-secondary !shadow-input)
              disabled:(text-primary opacity-70 cursor-not-allowed)"
        @update:model-value="handleChange"
      />
      <!-- Floating label UI -->
      <label
        v-if="useFloatingLabel"
        :class="[value ? 'text-sm translate-y-[-170%]' : 'text-base -translate-y-1/2']"
        :for="name"
        class="transform absolute left-2 top-1/2 select-none pointer-events-none transition-floating-label text-body"
        data-after=" *"
      >{{ label }}</label>
    </div>
    <div v-if="helperText" class="text-sm text-body" v-text="helperText" />
    <ErrorMessage :name="props.name" as="span" class="block text-sm text-error mt-1" />
  </div>
</template>
