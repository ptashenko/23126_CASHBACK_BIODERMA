<script lang="ts" setup>
import { useIsMobile } from '~/composables/useVueUse'

const isMobile = useIsMobile()

const backkPos = ref(isMobile.value ? 59 : 53)
const backDivider = ref(isMobile.value ? 20 : 30)

const { y } = useWindowScroll()
</script>
<template>
  <div class="relative min-h-[65vh] bg-gray-lightest pt-59 bg max-h-120vh transition-all duration-50" :style="{'marginBottom': ( 'min(' + y/30 + 'vh, 5vh)') }">
    <h1
      class="z-2 relative mt-2vh text-center transition-all duration-250 ease-in-out text-primary font-title my-0 uppercase text-10vw md:text-3.5vw"
      :style="{
        'paddingTop': ( 'min(' + y/20 + 'vh, 15vh)'), 'transform': 'scale(' + (1 - y/( isMobile ? 750 : 690) ) + ')', 'transitionDuration': isMobile ? 0.01 + 's' : 0.35 + 's'
      }"
      v-text="'il gusto della'"
    />
    <h1
      class="z-2 relative text-center transition-all duration-150 ease-in-out text-primary font-title my-0 uppercase text-10vw md:text-3.5vw"
      :style="{'transform': 'scale(' + (1 - y/( isMobile ? 750 : 690) ) + ')', 'transitionDuration': isMobile ? 0.01 + 's' : 0.25 + 's' }"
      v-text="'tua Estate!'"
    />
    <!-- <BaseButton :to="{ path: '/', hash: '#come-partecipare' }" class="my-8 mt-7vh z-2 relative" label="Scopri di più" />-->
    <div
      class="overlay transition-all duration-15 ease-in-out"
      :style="{'backgroundPosition' : '0 ' + ( backkPos - y/backDivider) + 'vh', 'bottom': ( 'max(' + (- y/backDivider) + 'vh, -5vh)') }"
    />
  </div>
</template>

<style scoped>

.bg {
  background: url(~/assets/img/hero-bg.jpg);
  background-size: cover;
  background-position: top;
  min-height: 100vh;
  z-index: 0;
  position: relative;

}

.overlay {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  min-height: 105vh;
  width: 100vw;
  background: url(~/assets/img/hero-bg2.jpg);
  background-repeat: no-repeat;
  overflow: hidden;
  background-size: contain;
}

@media screen and (max-width: 992px) {
  .overlay {
    background: url(~/assets/img/hero-bg2-mob.jpg);
    background-repeat: no-repeat;
    overflow: hidden;
    background-size: contain;
  }
}

</style>
