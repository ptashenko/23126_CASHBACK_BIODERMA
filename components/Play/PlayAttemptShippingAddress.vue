<script lang="ts" setup>
import type { IPlay } from '~/types/interfaces'

interface Props {
  play: IPlay
}

const props = defineProps<Props>()
const [isEditing] = useToggle()

</script>

<template>
  <div>
    <div v-if="props.play.result_play === 401 && props.play.shipping_city_manage_play">
      <h4 class="text-primary underline mb-4 text-left md:text-xl" v-text="'Info'" />
      <div v-if="isEditing" class="text-left">
        <FormShipmentPlay :play="play" />
      </div>
      <div v-if="!isEditing && play.shipping_city_manage_play" class="text-left">
        <div>Nome: {{ play.shipping_first_name_manage_play }}</div>
        <div>Cognome: {{ play.shipping_last_name_manage_play }}</div>
        <div v-if="props.play.prize_id_play === 1">
          Indirizzo: {{ play.shipping_address_manage_play }} {{ play.shipping_civic_number_manage_play }}
        </div>
        <div v-if="props.play.prize_id_play === 1">
          Località: {{ play.shipping_city_manage_play }} ({{ play.shipping_province_manage_play }})
        </div>
        <div v-if="props.play.prize_id_play === 1">
          Cap: {{ play.shipping_zip_manage_play }}
        </div>
        <div>Telefono: {{ play.shipping_phone_manage_play }}</div>
        <div v-if="props.play.prize_id_play === 1">
          Presso: {{ play.shipping_notes_manage_play }}
        </div>
      </div>
    </div>
  </div>
</template>
