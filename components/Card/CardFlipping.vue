<script lang="ts" setup>
interface Props {
  height?: `${string}px`
}

const props = withDefaults(defineProps<Props>(), {
  height: '400px',
})

const [isFlipped, setIsFlipping] = useToggle()
</script>
<template>
  <div
    :style="`min-height: ${props.height};`"
    class="
    relative perspect-1200px preserve-3d rounded-lg w-full
    dark:border-secondary"
  >
    <div
      :class="isFlipped ? 'rotate-y-180' : 'rotate-y-0'"
      class="
      shadow p-4 transform transition-transform absolute bg-white
      overflow-hidden backface-hidden origin-center z-1 rounded-lg w-full h-full
"
    >
      <slot name="card-front">
        Card Front Content
      </slot>
      <BaseIconButton
        class="transform absolute bottom-0 left-0"
        color="primary"
        icon="360"
        size="md"
        @click="isFlipped = true"
      />
    </div>
    <div
      :class="isFlipped ? 'rotate-y-0 z-2' : '-rotate-y-180'"
      class="
      shadow p-8 transform transition-transform absolute bg-primary
      overflow-hidden backface-hidden origin-center z-1 rounded-lg w-full h-full
      dark:(shadow-white bg-white)
"
    >
      <BaseIconButton
        class="absolute top-0 right-0"
        color="white"
        icon="close"
        size="md"
        @click="isFlipped = false"
      />
      <slot name="card-back">
        Card Back Content
      </slot>
      <BaseIconButton
        class="transform absolute bottom-0 left-0"
        color="white"
        icon="360"
        size="md"
        @click="setIsFlipping()"
      />
    </div>
  </div>
</template>
