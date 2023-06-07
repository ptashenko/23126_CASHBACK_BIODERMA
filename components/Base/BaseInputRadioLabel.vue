<script lang="ts" setup>

interface Props {
  for: string
  label: string
}

const props = defineProps<Props>()

</script>
<template>
  <label
    :for="props.for"
    class="
      cursor-pointer transform text-body font-light
      pl-6 peer-checked:after:(bg-primary scale-100)
      before:(border-1 border-primary bg-transparent w-18px h-18px)
      before:(content-DEFAULT transform absolute top-1/2 left-0 -translate-y-1/2 rounded-full)
      after:(content-DEFAULT transform scale-0 transition-[background-color,_transform] duration-500)
      after:(absolute top-1/2 left-[4px] -translate-y-1/2 rounded-full bg-primary w-10px h-10px)
      peer-focus:before:border-primary
    "
    v-text="props.label"
  />
</template>
