<script lang="ts" setup>
import dayjs from 'dayjs'
import { useForm } from 'vee-validate'
import type { Ref } from 'vue'
import type { IProvince, TSelectData } from '~/types/types'

interface IRegisterForm {
  first_name_player: string
  last_name_player: string
  username_player: string
  confirm_username_player: string
  password_player: string
  birth_date_player: string
  confirm_password_player: string
  agreement1_player: 0 | 1
  agreement2_player: 0 | 1
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
const config = useRuntimeConfig()
const provinces = ref<TSelectData[]>([])
const agreement1_player = ref(0)
const agreement2_player = ref(0)

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

const {
  values: formValues,
  handleSubmit,
  setFieldValue,
  isSubmitting,
} = useForm<IRegisterForm>()
const formWasSubmitted = inject('formWasSubmitted') as Ref<boolean>

const removeUnwantedChars = ({ target: { id = '' } }) => {
  setTimeout(() => {
    setFieldValue(id as keyof IRegisterForm, toSentenceCase(formValues[id as keyof IRegisterForm]))
  }, 10)
}

const handleKeydown = ($event: KeyboardEvent) => {
  const {
    key,
    code,
    which,
  } = $event
  const {
    id,
    value,
  } = $event.target as HTMLInputElement
  const kCode = (code || which)

  // Accept all letters, Numbers and apostrophes
  if (!hasAllowChars(key) && kCode !== 32) {
    $event.preventDefault()
  }

  setFieldValue(id as keyof IRegisterForm, toSentenceCase(value))
}

const onSubmit = handleSubmit(async (values) => {
  const {
    confirm_password_player,
    confirm_username_player,
    ...rest
  } = values

  const {
    valid,
  } = await useFetchCall('addNewUser', {
    body: {
      player: {
        ...rest,
        agreement1_player: agreement1_player.value,
        agreement2_player: agreement2_player.value,
        birth_date_player: dayjs(values.birth_date_player).format('YYYY-MM-DD '),
        email_player: values.username_player,
      },
    },
  })

  if (valid) {
    formWasSubmitted.value = true
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}, handleInvalidSubmit)

const updateConsents = (e, elem) => {
  if (elem === 1) {
    agreement1_player.value = e.target.checked ? 1 : 0
  }
  if (elem === 2) {
    agreement2_player.value = e.target.checked ? 1 : 0
  }
}

</script>

<template>
  <div>
    <form @submit="onSubmit">
      <div class="container md:grid md:grid-cols-2 md:gap-5 mx-auto mt-15">
        <BaseInputField
          name="username_player"
          label="Indirizzo E-Mail"
          rules="required|email|temporaryEmail|plusIssueEmail|max:56|isDuplicated:play,username_play"
          type="email"
          mode="lazy"
        />
        <BaseInputField
          name="confirm_username_player"
          label="Ripeti Indirizzo E-Mail"
          type="email"
          rules="required|confirmed:@username_player"
          @paste.prevent
        />
        <BaseInputField
          name="first_name_player"
          label="Nome"
          rules="required|max:128|min:2"
          @keydown="handleKeydown"
          @blur="removeUnwantedChars"
          @paste="removeUnwantedChars"
        />
        <BaseInputField
          name="last_name_player"
          label="Cognome"
          rules="required|max:128|min:2"
          @keydown="handleKeydown"
          @blur="removeUnwantedChars"
          @paste="removeUnwantedChars"
        />
        <BaseSelect
          name="gender_player"
          :options="[{value: 'M', label: 'Maschio'}, {value: 'F', label: 'Femmina'},]"
          label="Sesso"
          first-option="Scegli"
          rules="required"
        />
        <BaseDatePicker
          id="birth_date_player"
          name="birth_date_player"
          label="Data di nascita"
          :placeholder="''"
          :upper-limit="dayjs().subtract(18, 'years').$d"
        />
        <BaseInputField
          name="password_player"
          label="Password"
          type="password"
          rules="required|passwordCheck|max:56|min:8"
        />
        <BaseInputField
          name="confirm_password_player"
          label="Ripeti Password"
          rules="confirmed:@password_player"
          type="password"
          @paste.prevent
        />
        <!--
        <div class="col-span-2">
          <BaseSelect
            :options="provinces"
            first-option="Seleziona una Provincia"
            label="Provincia"
            name="province_player"
            rules="required"
          />
        </div>
        -->
      </div>
      <div class="divider relative w-[50%] bg-primary h-2px mt-15 mx-auto" />
      <div class="container mx-auto mt-12">
        <p class="text-left text-lg pb-4 md:ml-0rem">
          * Campi obbligatori
        </p>
        <p class="text-left text-lg pb-4 md:ml-0rem">
          Dichiaro di essere maggiorenne, di aver preso visione del
          <NuxtLink class="underline" to="/regolamento.pdf" target="_blank">
            Regolamento
          </NuxtLink> e dell'<NuxtLink class="underline" to="/regolamento.pdf" target="_blank">
            Informativa sulla privacy
          </NuxtLink> e ne accetto il contenuto per:
        </p>
        <BaseCheckbox
          id="agreement1_player"
          name="agreement1_player"
          :value="0"
          error-msg="Campo obbligatorio"
          :rules="{ required: true }"
          is-required
          @change="updateConsents($event, 1)"
        >
          <template #label>
            <div class="text-left text-1rem">
              La partecipazione alla presente iniziativa*
            </div>
          </template>
        </BaseCheckbox>
        <BaseCheckbox
          id="agreement2_player"
          name="agreement2_player"
          :value="0"
          :rules="{ }"
          error-msg="Consenso per finalità di marketing va accettato oppure rifiutato"
          @change="updateConsents($event, 2)"
        >
          <template #label>
            <div class="text-left text-1rem">
              Attività di marketing quali invio di materiale promozionale e pubblicitario anche a mezzo e-mail, sms o equivalente
            </div>
          </template>
        </BaseCheckbox>
      </div>
      <p class="text-1.1rem md:text-1.5rem mt-15 leading-normal">
        <b class="uppercase text-1.5rem md:text-2rem">Attenzione:</b><br>
        Cliccando sul tasto conferma non sarà più possibile modificare i dati inseriti
      </p>
      <BaseButton class="mt-8" label="registrati" type="submit" :disabled="isSubmitting" />
    </form>
  </div>
</template>

<style scoped>
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 5px;
  width: 15%;
  background: #183d7f;
}
</style>
