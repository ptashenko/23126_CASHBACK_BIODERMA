<script lang="ts" setup>
import { useForm } from 'vee-validate'

definePageMeta({ middleware: ['confirm-token', 'already-auth', 'has-login'] })
useHead({ title: 'Recupera la password' })

interface IRecoveryPwdForm {
  password_player: string
  confirm_password_player: string
}

const { handleSubmit, isSubmitting } = useForm<IRecoveryPwdForm>()

const route = useRoute()
const formWasSubmitted = ref(false)

const result = ref({
  valid: false,
  message: '',
})

const onInvalidSubmit = ({ errors }: Record<string, any>) => handleInvalidSubmit(errors)

const onSubmit = handleSubmit(async (values) => {
  const { confirm_password_player, ...rest } = values

  const {
    valid,
  } = await useFetchCall('changePassword', {
    body: {
      ...rest,
      temp_token_player: route.query.token,
    },
  })

  if (valid) {
    formWasSubmitted.value = true
    scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    result.value.message = 'Il token è scaduto o non è presente'
  }
}, onInvalidSubmit)

</script>

<template>
  <div class="min-h-60vh pt-10vh pb-10vh">
    <h1 class="text-center pb-5" v-text="'Crea nuova password'" />
    <div v-if="!formWasSubmitted">
      <form
        @submit="onSubmit"
        @invalid-submit="handleInvalidSubmit"
      >
        <div class="w-90vw md:w-1/4 mx-auto">
          <BaseInputField
            label="Nuova Password"
            name="password_player"
            rules="required|min:8|max:56|passwordCheck"
            type="password"
          />
          <BaseInputField
            label="Ripeti Password"
            name="confirm_password_player"
            rules="confirmed:@password_player"
            type="password"
            @paste.prevent
          />
          <BaseButton :disabled="isSubmitting" class="mt-8" label="Ripristina" type="submit" />
        </div>
      </form>
    </div>
    <div v-else class="md:w-1/2 mx-auto">
      <div class="text-h4 mb-4">
        <p class="center Regular">
          La password è stata aggiornata correttamente, <br>
          adesso puoi accedere utilizzando la tua nuova password.
        </p>
      </div>
      <BaseButton label="Accedi" to="/login" />
    </div>
  </div>
</template>
