<script lang="ts" setup>
const showCookiesModal = useShowCookiesModal()
const acceptCookies = useAcceptCookies()

const openCookiesModal = () => {
  showCookiesModal.value = true
}

const handleCloseBanner = () => {
  acceptCookies.value = 'yes'
  showCookiesModal.value = false
}

const handleAcceptAll = () => {
  updateCookies('yes')
  handleCloseBanner()
}
</script>
<template>
  <div class="fixed w-full bottom-0 bg-white z-1000">
    <div class="relative py-4">
      <div class="container mx-auto pt-20 pb-6 px-4 md:px-8">
        <p>
          Utilizziamo i cookie al fine di personalizzare e migliorare la tua
          esperienza sul nostro sito. Visita la nostra
          <router-link to="/cookies.pdf" class="text-primary underline">
            Cookies Policy
          </router-link>
          per acquisire maggiori informazioni.
          <br>Utilizzando il nostro
          sito accetti l'utilizzo dei cookie da parte nostra.
        </p>
      </div>
      <div class="flex gap-6 pb-6">
        <BaseButton
          label="Personalizza cookie"
          position="right"
          size="sm"

          shape="rounded"
          @click="openCookiesModal"
        />
        <BaseButton
          label="Accetta tutto"
          position="left"
          size="sm"

          shape="rounded"
          @click="handleAcceptAll"
        />
      </div>
      <BaseIconButton class="absolute top-4 right-4" @click="handleCloseBanner" />
    </div>
  </div>
</template>
