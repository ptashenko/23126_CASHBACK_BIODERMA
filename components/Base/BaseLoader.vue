<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'

const loading = useLoading()
const ocrLoading = useOcrLoading()

const messages = [
  'Attendere prego',
  'Caricamento immagine',
  'Lettura dello scontrino',
  'Estrapolazione dei dati',
  'Salvataggio dei risultati',
  'Completamento del processo',
]

const messageLimit = messages.length - 2
const currentMessage = ref(0)
const { pause, resume } = useIntervalFn(() => {
  if (currentMessage.value >= messageLimit) {
    pause()
  }
  currentMessage.value = currentMessage.value + 1
}, 1000)

const resetOcrLoader = () => {
  currentMessage.value = 0
  pause()
}

watchEffect(() => {
  ocrLoading.value ? resume() : resetOcrLoader()
})
</script>

<template>
  <div v-if="loading" class="fixed w-full h-screen top-0 left-0 flex text-center p-1 bg-black/80 z-50">
    <div v-if="ocrLoading" class="w-full h-full flex">
      <div class="m-auto">
        <div class="flex text-white">
          <transition name="fade" mode="out-in">
            <span :key="currentMessage" class="font-bold text-white/80 uppercase">{{ messages[currentMessage] }}</span>
          </transition>
          <div
            class="relative w-50px
            after:(content-DEFAULT block w-10px h-10px rounded-full transform absolute top-[110%] left-1/2 animate-dot-pulse -translate-x-1/2 -translate-y-1/2)
            "
          />
        </div>
      </div>
    </div>
    <BaseLoaderSvg v-else fill="fill-primary" />
  </div>
</template>
