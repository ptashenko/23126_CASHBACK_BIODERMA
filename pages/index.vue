<script lang="ts" setup>
import type { IDragonConfig } from '~/types/types'
import { useTimeStore } from '~/store/time-store'

const timeStore = useTimeStore()
const { HAS_LOGIN }: IDragonConfig = decrypt(dragonConfig)
</script>
<template>
  <div>
    <BannerHero />
    <!-- <BannerFlippingCard />-->
    <!-- <BannerBgParallaxScroll /> -->
    <!-- <BannerLottie /> -->
    <!-- <BannerLazyLoadingImage /> -->
    <!-- <BannerFormElementsExample />-->
    <BannerHowToPlay />
    <BannerPrize />
    <PlayWizard v-if="!HAS_LOGIN && usePlayAtHomePage && timeStore.now" />
  </div>
</template>
