<script lang="ts" setup>
definePageMeta({ middleware: ['has-login', 'already-auth'], alias: '/password-dimenticata' })
useHead({ title: 'Password Dimenticata' })

interface IForgotPwdForm {
  username_player: string,
}

const formWasSubmitted = ref(false)

const onSubmit = async ({ username_player }: IForgotPwdForm, actions: any) => {
  const { data, valid } = await useFetchCall('resendEmailForUser', {
    body: {
      username_player,
      from: 'forgot_pwd_email',
    },
  })

  if (valid) {
    formWasSubmitted.value = true
    return
  }

  const { statusCode } = data
  // The user haven't confirmed its registration
  if (statusCode === 1401) { useNotConfirmedUser(username_player) }
  // Handle the invalid respond
  if (!valid) {
    actions.setFieldError('Email', getCodeMessage(statusCode as number))

    await SweetAlertFeedback.fire({
      icon: 'error',
      title: 'Ops...',
      text: getCodeMessage(statusCode as number),
      timer: 7000,
      confirmButtonText: 'CHIUDI',
    })
  }
}

</script>

<template>
  <div class="pb-30 pt-15 md:w-1/2 lg:w-1/3 mx-auto text-center min-h-62vh">
    <h1 class="text-center text-primary mb-10" v-text="' Ripristina Password '" />
    <div v-if="!formWasSubmitted" class="px-10">
      <Form
        v-slot="{ isSubmitting }"
        @submit="onSubmit"
        @invalid-submit="handleInvalidSubmit"
      >
        <div class="mx-auto">
          <BaseInputField
            label="La tua mail"
            name="username_player"
            rules="required|email|temporaryEmail|plusIssueEmail|max:56"
            type="email"
          />
          <BaseButton :disabled="isSubmitting" class="mt-8" label="Recupera" type="submit" />
        </div>
      </Form>
    </div>
    <div v-else class=" mx-auto">
      <div class="text-h4 mb-4">
        <p class="center Regular">
          Ti è stata inviata una mail con il link per reimpostare la tua
          password di accesso, controlla nella tua posta in arrivo.
        </p>

        <p>Se non dovessi trovarla controlla anche nella casella spam.</p>
      </div>
      <BaseButton label="Continua" to="/" />
    </div>
  </div>
</template>
