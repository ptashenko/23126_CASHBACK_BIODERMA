<script lang="ts" setup>
const showCookiesModal = useShowCookiesModal()
const acceptGA = useAcceptGA()
const relay42 = useRelay42()
const cookieConf1 = computed(() => acceptGA.value === 'yes')
const cookieConf2 = computed(() => relay42.value === 'yes')

const updateAcceptGA = (value: 'yes' | 'no') => {
  acceptGA.value = value
}

const updateRelay42 = (value: 'yes' | 'no') => {
  relay42.value = value
}

const saveCookies = () => {
  showCookiesModal.value = false
}

</script>

<template>
  <div class="fixed h-screen w-full top-0 left-0 bg-white/80 z-40" @click.self="saveCookies">
    <div
      class="center-the-unknown w-[90%] md:w-[50%] bg-white p-6 shadow-md shadow-gray text-body max-h-[calc(100vh_-_80px)] overflow-auto"
    >
      <div class="text-h3 text-center text-primary" v-text="'IMPOSTAZIONI DEI COOKIE'" />
      <p class="border-b pb-2">
        QUESTA SEZIONE TI PERMETTE DI MODIFICARE I`IMPOSTAZIONE DEI COOKIE PER QUESTO SITO.<br>
        UNA VOLTA MODIFICATE LE IMPOSTAZIONI, OCCORRE CLICCARE SUR PULSANTE “SALVA LE MIE IMPOSTAZIONI”.
      </p>
      <div class="text-h4 text-primary" v-text="'COOKIE TECNICI'" />
      <p class="border-b pb-2">
        QUESTI COOKIE ABILITANO FUNZIONI, SENZA LE QUALI NON SAREBBE POSSIBILE UTILIZZARE APPIENO IL SITO.
      </p>
      <div class="flex">
        <div class="text-h4 text-primary" v-text="'COOKIE ANALITICI'" />
        <BaseSwitchButton
          id="analytical"
          v-model="cookieConf1"
          true-value="yes"
          false-value="no"
          :checked="cookieConf1"
          class="ml-auto"
          @change:model-value="updateAcceptGA"
        />
      </div>
      <h5 class="text-left configText color-3">
        QUESTI COOKIE PERMETTONO DI ANALIZZARE L’UTILIZZO DEL SITO IN MANIERA DA MISURARNE E MIGLIORARNE LA PERFORMANCE
      </h5>
      <p class="border-b pb-2">
        - Google Analytics
      </p>
      <div class="flex hidden">
        <div class="text-h4 text-primary" v-text="'COOKIE DI PROFILAZIONE'" />
        <BaseSwitchButton
          id="profiling"
          v-model="cookieConf2"
          true-value="yes"
          false-value="no"
          :checked="cookieConf2"
          class="ml-auto"
          @change:model-value="updateRelay42"
        />
      </div>
      <p class="hidden">
        QUESTI COOKIE SONO UTILIZZATI PER INVIARE PUBBLICITÀ,<br>
        PROMOZIONI E OFFERTE COMMERCIALI IN LINEA CON LE PREFERENZE MANIFESTATE DALL’UTENTE DURANTE LA NAVIGAZIONE
        ALL’INTERNO DEL SITO O NELLA RETE
      </p>
      <p class="hidden">
        - Relay 42
      </p>
      <p class="border-b pb-2">
        Per maggiori informazioni:
        <router-link to="/cookies.pdf" class="color-3 underline hoverInv">
          Cookie Policy
        </router-link>
      </p>
      <div class="flex justify-center gap-6">
        <BaseButton
          label="ACCETTA TUTTO"
          position="right"
          size="sm"
          shape="rounded"
          @click="updateCookies('yes')"
        />
        <BaseButton
          label="RIFIUTA TUTTO (eccetto cookie tecnici)"
          position="left"
          size="sm"
          shape="rounded"
          @click="updateCookies('no')"
        />
      </div>
      <div class="mt-6">
        <BaseButton
          label="SALVA LE MIE IMPOSTAZIONI"
          size="sm"
          shape="rounded"
          @click="saveCookies"
        />
      </div>
    </div>
  </div>
</template>
