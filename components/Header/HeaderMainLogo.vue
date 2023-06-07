<script lang="ts" setup>
import { useRoute } from 'nuxt/app'
import logoOther from '~/assets/img/logo.png'
import logoHome from '~/assets/img/logo_inverted.png'

interface Props {
  light?: boolean
}

const props = defineProps<Props>()
const isMobile = useIsMobile()
const route = useRoute()
const { y } = useWindowScroll()

const nuxtLinkClass = computed(() => {
  if (isMobile.value) {
    return props.light || y.value > 30 || route.name !== 'index' ? 'main-gradient' : 'bg-white'
  }
})

</script>
<template>
  <NuxtLink to="/" class="min-w-260px py-5 overflow-hidden relative z-999 md:py-0" :class="nuxtLinkClass">
    <img
      class="max-w-150px transition-all duration-300 ease-in-out mx-auto"
      :class="{'!max-w-[150px] !md:(max-w-[260px] pt-35)': y < 30 && route.name === 'index'}"
      :src="route.name === 'index' && y < 30 && !props.light ? logoHome : logoOther"
      alt="test"
    >
    <!-- Note: You can the new <nuxt-icon /> for load fast svg icons saved on the icons folder  logo_inverted.png -->
    <!-- <nuxt-icon name="logo" class="text-[8rem]" /> -->
  </NuxtLink>
  <!-- <NuxtLink to="/">
    <img
      class="max-w-[260px] px-[70px] text-center transition-all duration-300 ease-in-out"
      :class="{'!max-w-[300px] !md:max-w-[330px]': y < 30}"
      :src=" route.name === 'index' && y < 30 ? logoHome : logoOther"
      alt="test"
    >
  </NuxtLink> -->
</template>
