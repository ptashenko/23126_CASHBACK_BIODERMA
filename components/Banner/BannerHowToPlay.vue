<script lang="ts" setup>
import howToPlay from 'assets/img/how-to-play.png'
import howToPlaySm from 'assets/img/how-to-play-sm.png'
import howToPlayAnim from 'assets/img/how-to-play_anim.png'
import howToPlayAnimSm from 'assets/img/how-to-play_anim_mob.png'

const isMobile = useIsMobile()
</script>
<template>
  <div class="">
    <div
      id="come-partecipare"
      class="my-30 font-bold"
    >
      <div class="title-gradient">
        <h2 class="title font-bold text-center py-2 relative" v-text="'Come Partecipare'" />
      </div>
      <div class="w-full">
        <h5 class="title-description font-body py-4vh">
          Acquista 6€ di prodotti
          <br v-if="isMobile">Birra Peroni
          <br v-if="isMobile">di cui almeno 2 prodotti
          <br v-if="!isMobile">Peroni Nastro Azzurro
          <br v-if="isMobile"> e scopri subito
          se hai vinto
        </h5>
      </div>
      <div class="mt-0 md:-mt-2vw">
        <BaseResponsiveImage :src="isMobile ? howToPlayAnimSm : howToPlayAnim" class="leafanimation" alt="prodotti Birra Peroni" />
        <BaseResponsiveImage :src="isMobile ? howToPlaySm : howToPlay" class="relative z-2" alt="prodotti Birra Peroni" />
      </div>
      <BaseButton v-if="isMobile" :to="{ path: '/play' }" class="my-8 mt-7vh z-2 relative" label="PARTECIPA" />
    </div>
  </div>
</template>
