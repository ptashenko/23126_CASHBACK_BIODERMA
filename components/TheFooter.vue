<script lang="ts" setup>
// const showCookiesModal = useShowCookiesModal()
import logo from 'assets/img/logo_alco.png'
const route = useRoute()
</script>
<template>
  <footer class="text-center ">
    <p v-if="route.name === 'index'" class="font-body max-w-95vw py-8 md:max-w-60vw m-auto leading-none">
      <small>
        Concorso a premi "Il Gusto Della Tua Estate", riservato ai maggiori di 18 anni,
        valido dal 01/06/2023 al 15/08/2023 tutti i giorni dalle ore 10.00 alle ore 20.00.
        In palio IO Kit zaino+ telo mare al giorno (1 Kit ogni ora dalle 10.00 alle 20.00) per un totale di
        nr. 760 Kit oltre ad 1 weekend in una lornlità estiva italiana ogni settimana di gioco,
        per un totale di nr. 11 weekend. Eventuale estrazione di recupero entro il 15/09/2023.
        Montepremi totale: € 64.876,80. Scopri come partecipare e tutte le specifiche dei premi in palio
        consultando il regolamento completo al sito vinciilgusto.peroninastroazzurro.it.
        Le immagini dei premi riportate nei materiali di comunicazione sono puramente indicative.
        Tutte le caratteristiche sono definite dai Fornitori dei premi.
      </small>
    </p>

    <div class="main-gradient  text-body font-mono pt-8">
      <a href="https://www.aboutalcohol.com/it" target="_blank">
        <BaseResponsiveImage :src="logo" class="block max-w-250px mx-auto py-4" alt="O BEVI O GUIDI" />
      </a>

      <div class="container mx-auto px-4">
        <h4 class="text-white uppercase font-bold">
          concorso valido dal 1 Giugno 2023 al 15 Agosto 2023 dalle ore 10.00 alle ore 20.00
        </h4>
        <div class="flex items-center justify-center flex-col md:flex-row gap-4 py-8">
          <!-- Shall we use an object and loop for all links or we just change what we need? -->
          <a
            :href="papagayoConfig.policyLinks.regolamentoPolicy"
            class="text-white font-body underline transition-colors duration-500 hover:text-white\80"
            target="_self"
          >Regolamento</a>
          <a
            :href="papagayoConfig.policyLinks.privacyPolicy"
            class="text-white  font-body transition-colors duration-500 hover:text-white\80"
            target="_blank"
            v-text="'Privacy Policy'"
          />
          <a
            :href="papagayoConfig.policyLinks.cookiesPolicy"
            class="text-white  font-body transition-colors duration-500 hover:text-white\80"
            target="_blank"
            v-text="'Cookie Policy'"
          />
          <!--
          <button class="text-white underline uppercase font-inherit" @click.stop="showCookiesModal = true">
            Impostazioni Cookies
          </button>
          -->
        </div>
      </div>
    </div>
  </footer>
</template>
