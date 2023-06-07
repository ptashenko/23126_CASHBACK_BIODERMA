<script lang="ts" setup>
/* import type { IProvince, TSelectData } from '~/types/types'
import type { Routes } from '~/types/enums'
import { ApiServices } from '~/composables/useApiServices'
import { IPlay } from '~/types/interfaces'

interface Props {
  play: IPlay
}

const props = defineProps<Props>()

// const router = useRouter()
const service = new ApiServices()
const formShipmentPlay = useFormShipmentPlay()
const formEl = ref(null)
const provinces = ref<TSelectData[]>([])
const municipalities = ref<TSelectData[]>([])
const postalCodes = ref<TSelectData[]>([]);

(async () => {
  // Get the provinces from BE and prepare the data for the select component
  provinces.value = (await service.getProvinces())
    .map((province: IProvince) => ({ label: `${province.sigla} - ${province.provincia}`, value: province.sigla }))

  formShipmentPlay.value = {
    ...formShipmentPlay.value,
    practice_code_manage_play: props.play.practice_code_play,
    shipping_address_manage_play: props.play.shipping_address_manage_play,
    shipping_city_manage_play: props.play.shipping_city_manage_play,
    shipping_civic_number_manage_play: props.play.shipping_civic_number_manage_play,
    shipping_first_name_manage_play: props.play.shipping_first_name_manage_play,
    shipping_last_name_manage_play: props.play.shipping_last_name_manage_play,
    shipping_notes_manage_play: props.play.shipping_notes_manage_play,
    shipping_phone_manage_play: props.play.shipping_phone_manage_play,
    shipping_province_manage_play: props.play.shipping_province_manage_play,
    shipping_zip_manage_play: props.play.shipping_zip_manage_play,
  }

  // Since these values got reset on every function we need to save a shallow local copy
  const localProvinceValue = props.play.shipping_province_manage_play
  let localMunicipalityLabel: string | number = props.play.shipping_city_manage_play
  // let localMunicipalityValue: string | number = props.play.shipping_city_manage_play
  const localPostalCode = props.play.shipping_zip_manage_play

  if (localMunicipalityLabel && !!provinces.value.length) {
    await updateProvince(localProvinceValue)

    localMunicipalityLabel = municipalities.value.find(el => el.label.toLowerCase() === `${localMunicipalityLabel}`.toLowerCase()).value
  }

  if (props.play.shipping_city_manage_play && localMunicipalityLabel) {
    await updateMunicipality(localMunicipalityLabel)
  }

  if (localPostalCode) {
    await updatePostalCode(localPostalCode)
  }
})()

const updateProvince = async (value) => {
  // Reset Municipality and Cap values
  formShipmentPlay.value.shipping_city_manage_play = ''
  formShipmentPlay.value.shipping_zip_manage_play = ''
  municipalities.value = []
  postalCodes.value = []
  // Update the model value, with Nuxt 3 this won't be necessary
  formShipmentPlay.value.shipping_province_manage_play = value
  await useAxiosCall(Routes.GET_MUNICIPALITIES, { province: value }, AxiosType.POST, true)
    .then(({ data }) => {
      municipalities.value = data.map(municipality => ({
        label: municipality.comune,
        value: JSON.stringify({ istat: municipality.istat, municipality: municipality.comune }),
      }))
    })
}

const updateMunicipality = async (value) => {
  // Reset Cap values
  formShipmentPlay.value.shipping_zip_manage_play = ''
  postalCodes.value = []
  // Update the model value, with Nuxt 3 this won't be necessary
  const municipalityObj = JSON.parse(value)
  formShipmentPlay.value.shipping_city_manage_play = value
  await useAxiosCall(Routes.GET_ZIP, { istat: municipalityObj.istat }, AxiosType.POST, true)
    .then(({ data }) => {
      postalCodes.value = data.map((postalCode: { cap: any }) => ({ label: postalCode.cap, value: postalCode.cap }))
    })
}

const updatePostalCode = (value) => {
  // Update the model value, with Nuxt 3 this won't be necessary
  formShipmentPlay.value.shipping_zip_manage_play = value
}

const onSubmit = async () => {
  const { isValid } = await formEl.value.validateWithInfo()
  if (isValid) {
    const formData = {
      manage_play: {
        ...formShipmentPlay.value,
        shipping_city_manage_play: JSON.parse(formShipmentPlay.value.shipping_city_manage_play).municipality,
      },
    }
    const { data, valid } = await useAxiosCall(Routes.SHIPPING_DATA, formData, AxiosType.POST)
    // statusCode == 1200 && shipping.length > 0
    if (valid && data.statusCode === 1200 && !!data.message.length) {
      await SweetAlertFeedback.fire({
        text: 'Dati salvati correttamente',
        icon: 'success',
        didClose () {
          // router.push('/')
        },
      })
    }
  }
} */

</script>

<template>
  jjj
  <!--  <ValidationObserver ref="formEl" slim>
      &lt;!&ndash; NOTE: shall we handle autocomplete in general or can we leave it optional for every contest? &ndash;&gt;
      &lt;!&ndash; NOTE: helpful info about autocomplete feature can be found here,
            https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#the_autocomplete_attribute_and_login_fields &ndash;&gt;
      <form @submit.prevent="onSubmit">
        &lt;!&ndash; autocomplete="off" &ndash;&gt;
        <h2 class="mt-4" v-text="'Inserisci i dati per la spedizione'" />
        <div class="mt-4">
          <BaseInputField
            id="xuserx"
            v-model="formShipmentPlay.shipping_first_name_manage_play"
            rules="max:128|min:2"
            required
            label="Nome"
          />
          <BaseInputField
            id="lastname"
            v-model="formShipmentPlay.shipping_last_name_manage_play"
            rules="max:128|min:2"
            label="Cognome"
            required
          />
          <BaseInputField
            id="phone"
            v-model="formShipmentPlay.shipping_phone_manage_play"
            :rules="{required:true , max:11, min:9, regex: /^[0,3]\d{8,9}$/ }"
            label="Telefono"
          />
          <BaseInputField
            id="address"
            v-model="formShipmentPlay.shipping_address_manage_play"
            rules="max:128|min:5"
            label="Indirizzo"
            required
          />
          <BaseInputField
            id="civic"
            v-model="formShipmentPlay.shipping_civic_number_manage_play"
            rules="max:15"
            label="Civico"
            required
          />
          <BaseSelect
            id="province"
            v-model="formShipmentPlay.shipping_province_manage_play"
            rules="required"
            label="Provincia"
            first-option="Seleziona una Provincia"
            :options="provinces"
            required
            @change="updateProvince"
          />
          <BaseSelect
            id="municipality"
            v-model="formShipmentPlay.shipping_city_manage_play"
            rules="required"
            :label="!formShipmentPlay.shipping_province_manage_play ? 'Località, Prima scegli Provincia' : 'Località'"
            first-option="Seleziona un Comune"
            required
            :options="municipalities"
            :disabled="!formShipmentPlay.shipping_province_manage_play"
            @change="updateMunicipality"
          />
          <BaseSelect
            id="postalCode"
            v-model="formShipmentPlay.shipping_zip_manage_play"
            rules="required"
            :label="!formShipmentPlay.shipping_city_manage_play ? 'Cap, Prima scegli Comune' : 'Cap'"
            first-option="Seleziona un Cap"
            :disabled="!formShipmentPlay.shipping_city_manage_play"
            required
            :options="postalCodes"
            @change="updatePostalCode"
          />
          <BaseInputField
            id="notes"
            v-model="formShipmentPlay.shipping_notes_manage_play"
            rules="max:128|min:2"
            label="Presso / Nome sul citofono"
          />
        </div>
        <div class="mt-10">
          <BaseButton type="submit" label="Salva" />
        </div>
      </form>
    </ValidationObserver>-->
</template>
