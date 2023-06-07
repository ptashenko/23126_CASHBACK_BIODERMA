<script lang="ts" setup>
interface Props {
  thumbnail: string
  source: string
  srcset: string
  ignoreObserver?: boolean
  pictureClasses?: string
  imgClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  pictureClasses: 'flex w-full h-auto',
  imgClasses: 'w-full h-auto',
})

const el = ref<HTMLElement | null>(null)
const imgEl = ref<HTMLImageElement | null>(null)
const imageIsLoaded = ref(false)
const options: IntersectionObserverInit = {
  root: null,
  threshold: 0,
}

const loadBigImage = (image: HTMLImageElement) => {
  const previousElementSibling: HTMLImageElement = image.previousElementSibling as HTMLImageElement

  image.addEventListener('load', function handler (this: any) {
    imageIsLoaded.value = true
    this.removeEventListener('load', handler)
  })

  // eslint-disable-next-line no-console
  image.addEventListener('error', () => console.log('error'))

  image.src = image.dataset.src as string
  previousElementSibling.srcset = image.dataset.srcSet as string
}

const loadSmallImage = () => {
  if (imgEl.value) {
    imgEl.value.addEventListener('load', function handler () {
      setTimeout(() => {
        this.removeEventListener('load', handler)
        imgEl.value && loadBigImage(imgEl.value)
      }, 100)
    })
    // eslint-disable-next-line no-console
    imgEl.value.addEventListener('error', () => console.log('error'))
    imgEl.value.src = `${imgEl.value.dataset.thumbnail}`
  }
}

const handleIntersect = (entries: Record<string, any>, observer: IntersectionObserver) => {
  entries.forEach((entry: { isIntersecting: boolean; }) => {
    if (entry.isIntersecting) {
      loadSmallImage()
      el.value && observer.unobserve(el.value)
    }
  })
}

const createObserver = () => {
  const observer = new IntersectionObserver(handleIntersect, options)
  el.value && observer.observe(el.value)
}

onMounted(() => {
  (window.IntersectionObserver && !props.ignoreObserver)
    ? createObserver()
    : loadSmallImage()
})
</script>

<template>
  <div
    ref="el"
    class="w-full"
  >
    <picture :class="props.pictureClasses">
      <source
        media="(min-width: 308px)"
      >
      <img
        ref="imgEl"
        class="filter transition-lazy-image filter w-full h-auto"
        :class="[imgClasses, imageIsLoaded ? 'blur-0' : 'blur-9']"
        :data-src-set="props.srcset"
        :data-src="props.source"
        :data-thumbnail="props.thumbnail"
        alt="alt text"
      >
    </picture>
  </div>
</template>
