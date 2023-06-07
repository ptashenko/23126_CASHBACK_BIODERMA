<script lang="ts" setup>
import { useForm } from 'vee-validate'

interface IShipmentForm {
  iban_manage_play: string
  field1_manage_play: string
  url3_manage_play: string
  url4_manage_play: string
}
const router = useRouter()
const ocrDataNonEncrypted = useOcrDataNonEncrypted()
const play = usePlay()

const {
  handleSubmit,
  isSubmitting,
} = useForm<IShipmentForm>()

const onSubmit = handleSubmit(async (values) => {
  console.warn(ocrDataNonEncrypted.value.front)
  console.warn(values)
  await useFetchCall('shippingData', {
    body: {
      manage_play: {
        practice_code_manage_play: play.value.practice_code_play,
        player_token_manage_play: play.value.player_token_play,
        iban_manage_play: values.iban_manage_play,
        field1_manage_play: values.field1_manage_play,
        url3_manage_play: ocrDataNonEncrypted.value.front,
        url4_manage_play: ocrDataNonEncrypted.value.rear || '',
      },
    },
  })
    .then(({
      valid,
      data,
    }) => {
      if (valid && data.statusCode === 1200) {
        SweetAlertFeedback.fire({
          html: 'Dati salvati correttamente. <br/> entro 5 giorni lavorativi (esclusi i sabati, le domeniche e i giorni festivi), riceverài via e-mail l’esito finale della tua richiesta di rimborso',
          icon: 'success',
          didClose () {
            router.push('/')
          },
        })
      }
    })
    .catch(() => {
      SweetAlertFeedback.fire({
        text: 'Errore, riprova piu tardi',
        icon: 'error',
      })
    })
}, handleInvalidSubmit)

</script>

<template>
  <form @submit="onSubmit" class="min-h-60vh">
    <h2
      class="mt-4 font-bold uppercase"
      v-text="'richiesta del cashback'"
    />

    <p v-if="!play.iban_manage_play">
      Prosegui con la richiesta compilando il form qui sotto
    </p>
    <div v-if="!play.iban_manage_play" class="mt-4 max-w-[1000px] m-auto md:grid md:gap-x-10 md:gap-y-5 md:grid-cols-1 md:px-30">
      <BaseInputField
        label="Iban"
        name="iban_manage_play"
        rules="required|iban"
      />
      <BaseInputField
        label="Codice Fiscale"
        name="field1_manage_play"
        rules="required|phiscalCode"
      />
      <div class="w-full">
        <FormShipmentIdentifyDocs />
      </div>
    </div>

    <div v-else class="mt-4 md:grid md:gap-x-10 md:gap-y-5 md:grid-cols-1 md:px-30 pb-10vh">
      <div class="py-5vh">
        Hai già compilato il form!
      </div>
      <NuxtLink class="underline font-inherit mt-3" to="/">
        Home
      </NuxtLink>
    </div>
    <p v-if="!play.iban_manage_play" class="text-1.5rem mt-15 leading-normal ">
      <b class="uppercase text-2rem">Attenzione:</b><br>
      Cliccando sul tasto conferma non sarà più possibile modificare i dati inseriti
    </p>
    <div v-if="!play.iban_manage_play" class="my-10">
      <BaseButton :disabled="isSubmitting" label="Salva" type="submit" />
    </div>
  </form>
</template>
