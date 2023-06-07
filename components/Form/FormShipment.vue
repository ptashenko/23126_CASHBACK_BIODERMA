<script lang="ts" setup>
import { useForm } from 'vee-validate'
import type { IMunicipality, IPostalCode, IProvince, TSelectData } from '~/types/types'

interface IShipmentForm {
  shipping_first_name_manage_play: string
  shipping_province_manage_play: string
  shipping_city_manage_play: string
  shipping_zip_manage_play: string
  shipping_notes_manage_play: string
}

const config = useRuntimeConfig()
const router = useRouter()
const provinces = ref<TSelectData[]>([])
const municipalities = ref<TSelectData[]>([])
const postalCodes = ref<TSelectData[]>([])

const play = usePlay()

const {
  values: formValues,
  handleSubmit,
  setFieldValue,
  isSubmitting,
} = useForm<IShipmentForm>()

// Get the provinces from BE and prepare the data for the select component
await $fetch('getProvinces', {
  baseURL: config.public.apiBase,
  headers: {
    Authorization: `Bearer ${Authorization}`,
  },
  method: 'GET',
}).then((response) => {
  const tempProvinces = (typeof response === 'string' && JSON.parse(response) as IProvince[]) || []

  provinces.value = tempProvinces.map(province => ({
    label: province.provincia,
    value: province.sigla,
  }))
})

const updateProvince = async () => {
  if (!formValues.shipping_province_manage_play) { return }

  // Reset Municipality and Cap values
  if (formValues.shipping_city_manage_play) { setFieldValue('shipping_city_manage_play', '') }
  if (formValues.shipping_zip_manage_play) { setFieldValue('shipping_zip_manage_play', '') }

  municipalities.value = postalCodes.value = []

  await useFetchCall('getMunicipalities', {
    body: {
      province: formValues.shipping_province_manage_play,
    },
  }, true)
    .then(({ data }) => {
      const tempMunicipalities = (typeof data === 'string' && JSON.parse(data) as IMunicipality[]) || []

      municipalities.value = tempMunicipalities.map(municipality => ({
        label: municipality.comune,
        value: JSON.stringify({
          istat: municipality.istat,
          municipality: municipality.comune,
        }),
      }))
    })
}

const updateMunicipality = async () => {
  if (!formValues.shipping_city_manage_play) { return }

  // Reset Cap values
  if (formValues.shipping_zip_manage_play) { setFieldValue('shipping_zip_manage_play', '') }
  postalCodes.value = []

  const municipalityObj = JSON.parse(formValues.shipping_city_manage_play)

  await useFetchCall('getZip', {
    body: { istat: municipalityObj.istat },
  }, true)
    .then(({ data }) => {
      const tempPostalCodes = (typeof data === 'string' && JSON.parse(data) as IPostalCode[]) || []
      postalCodes.value = tempPostalCodes.map((postalCode: { cap: any }) => ({
        label: postalCode.cap,
        value: postalCode.cap,
      }))
    })
}

const onSubmit = handleSubmit(async (values) => {
  await useFetchCall('shippingData', {
    body: {
      manage_play: {
        ...values,
        practice_code_manage_play: play.value.practice_code_play,
        player_token_manage_play: play.value.player_token_play,
        shipping_city_manage_play: props.prizeId === 1 ? JSON.parse(values.shipping_city_manage_play).municipality : 'prize2',
      },
    },
  })
    .then(({
      valid,
      data,
    }) => {
      if (valid && data.statusCode === 1200) {
        SweetAlertFeedback.fire({
          text: 'Dati salvati correttamente',
          icon: 'success',
          didClose () {
            router.push('/')
          },
        })
      }
    })
    .catch(() => {
      SweetAlertFeedback.fire({
        text: 'Dati non salvati correttamente, riprova piu tarde',
        icon: 'error',
      })
    })
}, handleInvalidSubmit)

</script>

<template>
  <form @submit="onSubmit">
    <h2
      class="mt-4 font-bold uppercase"
      v-text="'richiesta del cashback'"
    />

    <p>
      Prosegui con la richiesta compilando il form qui sotto
    </p>
    <div v-if="!play.shipping_city_manage_play" class="mt-4 md:grid md:gap-x-10 md:gap-y-5 md:grid-cols-2 md:px-30">
      <BaseInputField
        label="Nome"
        name="shipping_first_name_manage_play"
        rules="required|max:128|min:2"
      />
      <BaseInputField
        label="Cognome"
        name="shipping_last_name_manage_play"
        rules="required|max:128|min:2"
      />
      <div>
        <BaseInputField
          :rules="{required: true, max:11, min:9, regex: /^[0,3]\d{8,9}$/ }"
          label="Telefono"
          name="shipping_phone_manage_play"
        />
      </div>
      <BaseInputField
        label="Indirizzo"
        name="shipping_address_manage_play"
        rules="required|max:128|min:5"
      />
      <BaseInputField
        label="Civico"
        name="shipping_civic_number_manage_play"
        rules="required|max:15"
      />
      <BaseSelect
        :options="provinces"
        first-option="Seleziona una Provincia"
        label="Provincia"
        name="shipping_province_manage_play"
        rules="required"
        @change="updateProvince"
      />
      <BaseSelect
        :disabled="!formValues.shipping_province_manage_play"
        :label="!formValues.shipping_province_manage_play ? 'Località, Prima scegli Provincia' : 'Località'"
        :options="municipalities"
        first-option="Seleziona un Comune"
        name="shipping_city_manage_play"
        rules="required"
        @change="updateMunicipality"
      />
      <BaseSelect
        :disabled="!formValues.shipping_city_manage_play"
        :label="!formValues.shipping_city_manage_play ? 'Cap, Prima scegli Comune' : 'Cap'"
        :options="postalCodes"
        first-option="Seleziona un Cap"
        name="shipping_zip_manage_play"
        rules="required"
      />
      <BaseInputField
        label="Presso / Nome sul citofono"
        name="shipping_notes_manage_play"
        rules="max:128|min:2"
      />
    </div>

    <div v-else class="mt-4 md:grid md:gap-x-10 md:gap-y-5 md:grid-cols-1 md:px-30 pb-10vh">
      <div>Nome: {{ play.shipping_first_name_manage_play }}</div>
      <div>Cognome: {{ play.shipping_last_name_manage_play }}</div>
      <div>
        Indirizzo: {{ play.shipping_address_manage_play }} {{ play.shipping_civic_number_manage_play }}
      </div>
      <div>
        Località: {{ play.shipping_city_manage_play }} ({{ play.shipping_province_manage_play }})
      </div>
      <div>
        Cap: {{ play.shipping_zip_manage_play }}
      </div>
      <div>Telefono: {{ play.shipping_phone_manage_play }}</div>
      <div>
        Presso: {{ play.shipping_notes_manage_play }}
      </div>
    </div>
    <p v-if="!play.shipping_city_manage_play" class="text-1.5rem mt-15 leading-normal ">
      <b class="uppercase text-2rem">Attenzione:</b><br>
      Cliccando sul tasto conferma non sarà più possibile modificare i dati inseriti
    </p>
    <div v-if="!play.shipping_city_manage_play" class="my-10">
      <BaseButton :disabled="isSubmitting" label="CONFERMA" type="submit" />
    </div>
  </form>
</template>
