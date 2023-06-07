<script lang="ts">
export default { inheritAttrs: false }
</script>

<script lang="ts" setup>
import { useField } from 'vee-validate'

interface Props {
  value: boolean | number
  name: string
  errorMsg: string
  rules: Record<string, any> | string
}

const props = defineProps<Props>()

const {
  checked,
  handleChange,
  errorMessage,
} = useField(
  toRef(props, 'name'),
  props.rules,
  {
    type: 'checkbox',
    checkedValue: props.value,
  }
)

</script>
<template>
  <div>
    <div class="flex gap-6 my-1 text-left">
      <div class="relative flex items-start gap-4">
        <input
          :id="props.name"
          :name="props.name"
          :value="props.value"
          class="peer block appearance-none flex-[0_0_30px] w-30px h-30px [@supports(-webkit-touch-callout:none)]:scale-[4] default:ring-2 checked:outline-4"
          type="checkbox"
          v-bind="$attrs"
          @change="handleChange"
        >
        <span class="w-[40px] h-[40px] absolute top-0 left-0 text-lg pointer-events-none">
          <BaseMsIcon
            :icon="checked ? 'check_box' : 'check_box_outline_blank'"
            color="primary"
            size="!text-[40px]"
            variant="filled"
            rotation="0"
          />
        </span>
        <label class="text-primary  text-1rem medium:text-1.5rem font-normal  pb-1vh pt-2" :for="props.name">
          <slot name="label" />
        </label>
      </div>
    </div>
    <span v-if="errorMessage" class="block text-left ml-12 text-sm text-error mt-1" v-text="errorMsg" />
  </div>
</template>
