<script lang="ts" setup>
// Note: Maybe we can merge this page with not-active
definePageMeta({ middleware: ['if-end'], alias: '/concorso-terminato' })
useHead({ title: 'Concorso terminato!' })
</script>

<template>
  <div class="center-the-unknown w-full">
    <h1 class="text-hero font-bold py-6" v-text="'Concorso terminato!'" />
  </div>
</template>
