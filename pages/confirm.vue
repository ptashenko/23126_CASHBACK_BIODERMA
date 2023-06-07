<script lang="ts" setup>
import type { IDragonConfig } from '~/types/types'

definePageMeta({ middleware: ['confirm-token', 'already-auth', 'has-login'] })
useHead({ title: 'Conferma di Registrazione' })

const route = useRoute()
const result = ref({
  valid: false,
  message: '',
})

await useFetchCall('confirmAccount', {
  body: { temp_token_player: route.query.token },
})
  .then(({ data, valid }) => {
    const { message } = data

    result.value.message = 'Token non presente'

    if (valid) {
      const { HAS_DIRECT_LOGIN_AFTER_CONFIRM }: IDragonConfig = decrypt(dragonConfig)
      if (message) {
        result.value.message = 'Il tuo account è stato attivato. <br> Accedi per partecipare al concorso.'
        result.value.valid = true
      }

      if (HAS_DIRECT_LOGIN_AFTER_CONFIRM) {
        // TODO: handle direct login and redirect
        // this.$store.dispatch(AUTH_REQUEST, { message, go: true })
      }
    } else if (message === 'player_not_found') {
      result.value.message = 'Il token è scaduto o non è presente'
    }
  })
  .catch()

</script>

<template>
  <div class="min-h-62vh">
    <!--     eslint-disable-next-line vue/no-v-html -->
    <div class="text-xl  pt-10vh font-bold py-2 text-primary" v-html="result.message" />

    <div v-if="result.valid" class="mt-5">
      <BaseButton
        label="Accedi"
        to="/login"
      />
    </div>
  </div>
</template>
