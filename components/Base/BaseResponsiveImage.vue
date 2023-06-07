<script lang="ts" setup>
interface Props {
  src: string
  alt?: string
  addclass?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Some Image',
  addclass: '',
})

const elHeight = ref(0)
const imgEl = ref<HTMLImageElement | null>(null)
const isLoaded = ref(false)
const errorImageUrl = 'https://via.placeholder.com/100.png?text=No+Image'

const handleLoad = () => { isLoaded.value = true }
const handleError = () => { if (imgEl.value) { imgEl.value.src = errorImageUrl } }

const imageH = setInterval(function () {
  if (imgEl.value && imgEl.value.height > 0) {
    elHeight.value = imgEl.value.height
    clearInterval(imageH)
  }
}, 10)

</script>
<template>
  <div class="relative w-full h-full">
    <!-- TODO: Add width and height for greater average on insights -->
    <img
      ref="imgEl"
      :alt="'altImg'"
      :class="addclass + isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'"
      :src="props.src"
      class="filter w-full transition-lazy-image duration-700"
      @error="handleError"
      @load="handleLoad"
    >

    <div v-if="!isLoaded && elHeight > 0" class="center-the-unknown">
      <BaseLoaderSvg />
    </div>
  </div>
</template>
