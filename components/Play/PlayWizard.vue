<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { FormWizard, TabContent, WizardStep } from 'vue3-form-wizard'
import 'vue3-form-wizard/dist/style.css'
import { useModal } from 'vue-final-modal'
import BaseModal from '../Base/BaseModal.vue'
import type { IDragonConfig } from '~/types/types'
import { useTimeStore } from '~/store/time-store'
import { useUserProfile } from '~/store/user-profile'

const userProfile = useUserProfile()

const {
  WIZARD_HAS_OCR,
  WIZARD_HAS_IMAGE,
  WIZARD_HIDE_STEPS,
}: IDragonConfig = decrypt(dragonConfig)
const {
  values,
  validate,
} = useForm()
const timeStore = useTimeStore()
const ocrDataEncrypted = useOcrDataEncrypted()
const ocrDataNonEncrypted = useOcrDataNonEncrypted()
const formData = useFormData()
const formWizard = ref(null)

formData.value.count_product = 0

const handleModalOpen = () => {
  const options = {
    component: BaseModal,
    slots: {
      body: '',
      title: '',
    },
  }

  options.slots.body = `Product`
  options.slots.title = '<h1 class="font-bold text-xl text-center md:text-left leading-tight md:text-4xl">ESEMPIO DI SCONTRINO <span class="text-[#d6001c]">SCORRETTO</span></h1>'

  const { open } = useModal(options)
  open()
}

const validateHasImage = async () => {
  if (!ocrDataNonEncrypted.value.front) {
    await SweetAlertFeedback.fire({
      icon: 'info',
      text: 'Carica l`immagine',
    })
    return
  }

  // If the wizard doesn't need OCR just return
  if (!WIZARD_HAS_OCR) { return true }

  return await callOCR(ocrDataEncrypted.value, ocrDataNonEncrypted.value)
}

// const validateFormDataReceipt = async () => (await formElReceipt?.value?.validate()).isValid
const validateFormDataReceipt = async () => (await validate()).valid
const stepIndex = ref(0)
// NOTE: We might need to configure this manually since sometimes it can have less steps
const wizardTitle = (step: number) => ({
  0: 'Carica la tua prova d\'acquisto',
  1: 'Conferma i dati della prova d’acquisto',
})[step]

const onComplete = async () => {
  // check min 2 products Azzurro present
  await validate()
    .then(({
      valid,
      errors,
    }) => {
      if (valid) {
        usePlayCall(values, !!WIZARD_HAS_OCR)
      }
      callLog({
        str: 'onComplete',
        data: errors,
        isCall: 'call',
      })
    })
}

// const products = useProductsList()
const sortedProducts = ref(false)
const handleProducts = (products) => {
  formData.value.product = products
  formData.value.count_product = products.reduce((accumulator, object) => {
    // required min 2 product Azzurro
    return accumulator + parseInt(object.name_product.includes('Azzurro') ? object.quantity_product : 0)
  }, 0)
}

// CAN PLAY ONLY ONE TIME => VERIFY IF USER HAS VALID PLAY YET
const myAttempts = ref([])
const validPlays = ref(0)

const getUserAttempts = async () => {
  const dataToSend = {
    body: {
      player_token_player: userProfile.userData.player_token_player,
    },
  }
  const { data, valid } = await useFetchCall('myAttempt', dataToSend)
  if (valid) {
    myAttempts.value = data.message
    for (const x in myAttempts.value) {
      // check if user has valid play:
      // validation_manage_play == 0 => to be validated ( valid play )
      // validation_manage_play == 1 | 10 => validated ( valid play )
      // validation_manage_play == 2 | 20 => not validated ( NOT valid play )
      if (myAttempts.value[x].result_play === 402 && myAttempts.value[x].validation_manage_play !== 2 && myAttempts.value[x].validation_manage_play !== 20) {
        validPlays.value++
      }
    }
  }
}
// run only if present userData
userProfile.$subscribe(userProfile.isAuth ? getUserAttempts() : '')

// getUserAttempts()

</script>

<template>
  <form id="gioca" class="">
    <FormWizard
      ref="formWizard"
      :color="WIZARD_HIDE_STEPS ? 'transparent' : '#d6001c'"
      :title="wizardTitle(stepIndex)"
      next-button-text="PROCEDI"
      subtitle=""
      transition="slideFromRight"
      @on-complete="onComplete"
    >
      <template #step="props">
        <div v-if="WIZARD_HIDE_STEPS" />
        <WizardStep
          v-else
          :index="props.index"
          :tab="props.tab"
          :transition="props.transition"
        />
      </template>
      <tab-content
        v-if="WIZARD_HAS_IMAGE"
        :before-change="() => validateHasImage()"
      >
        <div v-if="!validPlays">
          <h1 class="text-center mb-15 text-3xl md:text-4xl" v-text="'CARICA IL TUO SCONTRINO'" />
          <PlayWizardStepImage />

          <p>
            Ricordati che sono valide le prove d’acquisto con data di emissione compresa tra il  20 Giugno ed il 31 Luglio 2023
            e contenenti almeno 30,00€ di prodotti
            <!-- Insert product list from Regolamento  -->
            <span class="underline" @click="handleModalOpen">
              Bioderma coinvolti nella promozione.</span>

            <br><br>
            Conserva la prova d’acquisto originale, potrebbe esserti utile in caso di verifica.
          </p>

          <BaseButton
            label="CONFERMA"
            class="mt-15"
            @click="formWizard.nextTab()"
          />
        </div>
        <div v-else>
          Hai già partecipato

          <br>
          <br>
          Puoi partecipare al massimo UNA volta
          durante l’intero periodo dell’iniziativa
        </div>
      </tab-content>
      <TabContent :before-change="() => validateFormDataReceipt()" title="Conferma i dati della prova d’acquisto">
        <h1 class="text-center mb-15 uppercase" v-text="'Conferma i dati della prova d’acquisto'" />
        <PlayWizardStepFormDataReceipt v-if="timeStore.now" />
        <div v-if="sortedProducts" class="md:(max-w-50vw m-auto)">
          <BaseProductsSelect
            :items="sortedProducts"
            :label="'Prodotti acquistati*'"
            @handleProducts="handleProducts"
          />
        </div>
        <BaseButton
          label="Partecipa"
          small
          class="mt-15 text-1rem !p-1rem"
          @click="formWizard.nextTab()"
        />
        <p class="text-1rem mt-10 leading-normal font-bold">
          Se i dati della tua prova d’acquisto non dovessero essere visualizzati correttamente, <br>carica una nuova immagine.
        </p>
        <BaseButton
          label="Indietro"
          small
          class="mt-15 text-1rem !p-1rem"
          @click="formWizard.prevTab()"
        />
      </TabContent>
      <!-- NOTE: https://vue3-form-wizard-document.netlify.app/scoped-slots/#footer-slot -->
    </FormWizard>
  </form>
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

.circle::before {
  content: "•";
  color: red;
  display: inline-block;
  font-size: 1rem;
  width: 1em;
  margin-left: -1em
}
</style>
