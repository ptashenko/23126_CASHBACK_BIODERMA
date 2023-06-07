<script lang="ts" setup>
import type { IDragonConfig } from '~/types/types'

const { WIZARD_HAS_SHIPPING_DATA }: IDragonConfig = decrypt(dragonConfig)

interface Props {
  prizeId: number
}

const props = defineProps<Props>()

</script>

<template>
  <div>
    <div v-if="props.prizeId === 2">
      <h1 class="text-center uppercase text-3xl md:text-5xl font-bold" v-text="'Complimenti Hai Vinto!'" />
      <p class="text-3xl">
        WEEKEND PER 2
      </p>

      <img src="~/assets/img/weekend.png" class="w-[85%] md:w-[30%] mx-auto">
      <div class="divider relative w-[80%] md:w-[20%] bg-primary h-2px mt-15 mx-auto" />
      <img src="~/assets/img/line-weekend.png" class="absolute left-[-3vw] top-155vw md:top-25vw -z-1">

      <div class="mt-20 md:w-[65%] max-w-800px mx-auto px-5 md:px-0">
        <FormShipment v-if="WIZARD_HAS_SHIPPING_DATA" :prize-id="props.prizeId" />
      </div>
    </div>
    <div v-if="props.prizeId === 1">
      <h1 class="text-center uppercase text-3xl md:text-5xl font-bold" v-text="'COMPLIMENTI HAI VINTO!'" />
      <p class="text-2xl md:text-3xl uppercase">
        <b>Kit -</b> Telo mare e zaino
      </p>

      <img src="~/assets/img/telo.png" class="w-[85%] md:w-[40%] mx-auto mt-20">
      <div class="divider relative w-[80%] md:w-[20%] bg-primary h-2px mt-15 mx-auto" />
      <img src="~/assets/img/telo-line.png" class="absolute left-[-5vw] top-105vw md:top-25vw -z-1">

      <div class="mt-20 md:w-[85%] max-w-1200px mx-auto px-5 md:px-0">
        <FormShipment v-if="WIZARD_HAS_SHIPPING_DATA" :prize-id="props.prizeId" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 5px;
  width: 15%;
  background: #183d7f;
}

</style>
