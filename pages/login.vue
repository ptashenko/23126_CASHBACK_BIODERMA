<script lang="ts" setup>

definePageMeta({ middleware: ['if-end', 'has-login', 'already-auth'] })
useHead({ title: 'Pagina di login' })

</script>

<template>
  <div class="py-15">
    <h1 class="text-center text-primary" v-text="'Accedi'" />
    <FormLogin />
  </div>
</template>
