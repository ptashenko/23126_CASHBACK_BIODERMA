<script lang="ts" setup>
definePageMeta({ middleware: ['if-end', 'has-login', 'already-auth'] })
useHead({ title: 'Pagina di registrazione' })

const formWasSubmitted = ref(false)
provide('formWasSubmitted', formWasSubmitted)

</script>

<template>
  <div class="md:w-40vw md:min-w-800px mx-auto text-center pb-20 px-10 md:(py-20 px-0)">
    <template v-if="!formWasSubmitted">
      <h1 class="text-center uppercase" v-text="'Registrati'" />
      <FormRegister />
    </template>
    <template v-else>
      <div class="container px-2 mx-auto md:px-6 lg:px-36 text-center">
        <h3 class="text-h3 py-2 text-primary">
          Conferma la tua email
        </h3>

        <div class="text-h4 mt-4">
          <p class="text-h4">
            Ti abbiamo inviato una mail all’indirizzo che ci hai indicato.
            <br>
            <strong class="text-primary">Controlla la tua casella</strong> di posta, anche nella cartella <strong class="text-primary">spam</strong>.
          </p>
        </div>
        <h4 class="text-h4 mt-4">
          <strong class="text-primary">Clicca sul </strong>link che troverai all’interno del messaggio per confermare la tua registrazione e torna sul sito per giocare.
        </h4>
        <BaseButton class="mt-5" to="/login" label="accedi" target="_self" />
      </div>
    </template>
  </div>
</template>
