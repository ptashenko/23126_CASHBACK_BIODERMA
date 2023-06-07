<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { useUserProfile } from '~/store/user-profile'

definePageMeta({ middleware: ['if-end', 'has-login', 'auth'] })
useHead({ title: 'Il tuo profilo' })

interface IUpdateUserDataForm {
  first_name_player: string
  last_name_player: string
  username_player: string
  confirm_username_player: string
  password_player: string
  confirm_password_player: string
  agreement1_player: string
  agreement2_player: string
  agreement3_player: string
  agreement4_player: string
  agreement5_player: string
  address_player: string
  civic_number_player: string
  province_player: string
  zip_player: string
  phone_player: string
  email_player: string
  confirmed_player: string
  gender_player: string
}

const {
  values: formValues,
  handleSubmit,
  setFieldValue,
  isSubmitting,
} = useForm<IUpdateUserDataForm>()

const userProfile = useUserProfile()
const [dataHasBeenChanged, setDataHasBeenChanged] = useToggle()

const removeUnwantedChars = ({ target: { id = '' } }) => {
  setTimeout(() => {
    setFieldValue(id as keyof IUpdateUserDataForm, toSentenceCase(formValues[id as keyof IUpdateUserDataForm]))
  }, 10)
}

const handleKeydown = ($event: KeyboardEvent) => {
  const {
    key,
    keyCode,
    which,
  } = $event
  const {
    id,
    value,
  } = $event.target as HTMLInputElement
  const kCode = (keyCode || which)

  // Accept all letters, Numbers and apostrophes
  if (!hasAllowChars(key) && kCode !== 32) {
    $event.preventDefault()
  }

  setFieldValue(id as keyof IUpdateUserDataForm, toSentenceCase(value))
}

const onSubmit = handleSubmit(async (values) => {
  // If the user hasn't changed any data avoid calling the API
  if (!dataHasBeenChanged.value) {
    return
  }

  // We need to take just some data, we could also use (...rest) here if the data we need to remove is smaller,
  // for instance, if we need to take out just 'phone_player' and 'agreement4_player' I would rather use ...rest
  // es. const { phone_player, agreement4_player, ...rest } = userProfile.value
  // rest will contain the remaining properties

  const { valid } = await useFetchCall('editUser', {
    body: {
      player: {
        player_token_player: userProfile.userData.player_token_player,
        first_name_player: values.first_name_player,
        last_name_player: values.last_name_player,
        agreement1_player: values.agreement1_player,
        agreement2_player: values.agreement2_player,
        agreement3_player: values.agreement3_player,
      },
    },

  })

  if (valid) {
    dataHasBeenChanged.value = false
    await SweetAlertFeedback.fire({
      icon: 'success',
      text: 'I tuoi dati di registrazione sono stati correttamente aggiornati',
    })
  }
})
</script>

<template>
  <div class="pb-30 md:py-30 px-4">
    <h1 class="text-center" v-text="'I tuoi dati'" />
    <form
      v-if="userProfile.userData"
      @submit="onSubmit"
      @invalid-submit="handleInvalidSubmit"
    >
      <!--  NOTE: You can change the layout wrappers as you like while you get use to TailWind,
              I personally prefer grid layouts but I'll handle this one as a boostrap container|row layout to have more options.
               We could achieve the same result using flex-wrap but its get messy with the alignments on uneven columns -->
      <!--      We can skip the container since we don't need it-->
      <!--      Think on this as a row (md:flex md:gap-6 justify-center), class="row justify-content-center"-->
      <div class="md:flex md:gap-6 justify-center">
        <!--        Think on this as a column (md:w-1/2 lg:w-1/3), class="col-md-6 col-lg-4 mb-3"-->
        <div class="md:w-1/2 lg:w-1/3">
          <BaseInputField
            :initial-value="userProfile.userData.first_name_player"
            name="first_name_player"
            label="Nome"
            rules="required|max:128|min:2"
            @input="setDataHasBeenChanged(true)"
            @keydown="handleKeydown"
            @blur="removeUnwantedChars"
            @paste="removeUnwantedChars"
          />
        </div>
        <div class="md:w-1/2 lg:w-1/3">
          <BaseInputField
            :initial-value="userProfile.userData.last_name_player"
            name="last_name_player"
            label="Cognome"
            rules="required|max:128|min:2"
            @input="setDataHasBeenChanged(true)"
            @keydown="handleKeydown"
            @blur="removeUnwantedChars"
            @paste="removeUnwantedChars"
          />
        </div>
      </div>
      <div class="md:flex md:gap-6 justify-center">
        <div class="md:w-1/2 lg:w-1/3">
          <BaseInputField
            :initial-value="userProfile.userData.username_player"
            name="username_player"
            rules="required|temporaryEmail|plusIssueEmail|max:56|"
            type="email"
            label="Indirizzo E-Mail"
            disabled
          />
        </div>
        <div v-if="userProfile.userData.phone_player && userProfile.userData.phone_player !== '39'" class="md:w-1/2 lg:w-1/3">
          <BaseInputField
            :initial-value="userProfile.userData.phone_player"
            name="phone"
            :rules="{required:true , max:11, min:9, regex: /^[0,3]\d{8,9}$/ }"
            label="Telefono"
          />
        </div>
      </div>
      <BaseButton class="mt-12 !text-lg !p-1rem min-w-275px justify-center" type="submit" label="Modifica dati" :disabled="isSubmitting" />
      <BaseButton class="mt-6 !text-lg !p-1rem min-w-275px justify-center" to="/play" label="Effettua una giocata" />
    </form>
  </div>
</template>
