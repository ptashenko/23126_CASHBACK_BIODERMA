<script lang="ts" setup>
import award1 from 'assets/img/award1.png'
import award2 from 'assets/img/award2.png'
// import { useIsMobile } from '~/composables/useVueUse'
import divider from 'assets/img/divider.png'
// const isMobile = useIsMobile()

</script>
<template>
  <div
    id="premi"
    class="relative min-h-[80vh]"
  >
    <div class="title-gradient">
      <h2 class="title font-bold text-center py-2 relative" v-text="'IN PALIO FANTASTICI PREMI!'" />
    </div>
    <div class="container px-8 mx-auto md:max-w-3/4 md:grid md:grid-cols-[40%_40%] items-center justify-center">
      <BaseResponsiveImage class="howerImage" :src="award1" />
      <BaseResponsiveImage class="howerImage2" :src="award2" />
    </div>
    <h4 class="py-4vh">
      <a class="font-bold text-2xl uppercase no-underline" target="_blank" href="/regolamento.pdf">Regolamento</a>
      <BaseResponsiveImage class="max-w-160px m-auto" :src="divider" />
    </h4>
    <BaseButton
      to="/play"
      target="_self"
      class="my-8"
      label="Partecipa"
      position="center"
    />
  </div>
</template>
