<script lang="ts" setup>
import dayjs from 'dayjs'
import type { EPlayStatus } from '~/types/enums'
import type { IPlay } from '~/types/interfaces'
import type { IDragonConfig } from '~/types/types'

interface Props {
  play: IPlay
}

const props = defineProps<Props>()
const { WIZARD_HAS_SHIPPING_DATA }: IDragonConfig = decrypt(dragonConfig)

</script>

<template>
  <div>
    <div v-if="props.play.amount" class="mt-5">
      <h5 class="Medium w-100 center">
        <span class="font-bold uppercase">
          Pratica: {{ play.identification_code }}
        </span>
        <i
          v-if="play.status === EPlayStatus.DISAPPROVED"
          class="text-error"
        >Motivazione bocciatura : {{ play.motivation }}</i>
      </h5>
    </div>
    <div v-if="play.receipt_amount_play" class="text-center">
      <div><span class="text-primary">Pratica:</span> {{ play.practice_code_play }}</div>
      <div><span class="text-primary">Stato:</span> {{ play.lose ? 'Non vincente' : play.status_fe.msg }}</div>
    </div>
    <div :class="WIZARD_HAS_SHIPPING_DATA ? 'md:grid-cols-[50%_50%]' : 'md:grid-cols-2'" class="md:grid mt-4">
      <div class="text-left">
        <h4 class="text-primary underline mb-4 md:text-xl" v-text="'Dati della prova d\'acquisto'" />
        <div>
          Data: {{ dayjs(play.receipt_date_play).format('DD-MM-YYYY') }}
        </div>
        <div v-if="play.receipt_time_play !== '00:00:00'">
          Ora: {{ play.receipt_date_play }}
        </div>
        <div>
          Numero: {{ play.receipt_number_play }}
        </div>
        <div>
          Importo: {{ play.receipt_amount_play }} €
        </div>
        <div v-if="play.product_registered.length > 0">
          <h5 class="color-2 underline mt-4">
            Prodotti acquistati
          </h5>
          <div
            v-for="(product) in play.product_registered"
            :key="product.id"
          >
            {{ product.name_product }} ({{ product.quantity_product }}pz.)
          </div>
        </div>
      </div>
      <div class="text-center">
        <!-- <PlayAttemptViewReceipt :practice-code-play="play.practice_code_play" />-->
        <PlayAttemptShippingAddress v-if="WIZARD_HAS_SHIPPING_DATA" :play="play" />
      </div>
    </div>
  </div>
</template>
