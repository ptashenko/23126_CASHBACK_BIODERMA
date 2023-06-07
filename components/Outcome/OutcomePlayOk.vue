<script lang="ts" setup>
import dayjs from 'dayjs'
import { useTimeStore } from '~/store/time-store'

interface Props {
  play: Object
}

const router = useRouter()
const props = defineProps<Props>()
const timeStore = useTimeStore()

setTimeout(() => {
  console.warn(props.play)
  if (props.play.validation_manage_play !== 0 && props.play.validation_manage_play !== 1) {
    router.push('/')
  }
}, 300)

const play_date_diff = ref(0)

watchEffect(() => {
  if (props.play) {
    if (props.play.validated_at_manage_play) {
      const play_date = dayjs(props.play.validated_at_manage_play)
      const now_date = timeStore.now
      const diff = now_date.diff(play_date, 'days')
      console.warn(diff)
      play_date_diff.value = diff
    }
  }
})

</script>
<template>
  <div class="min-h-60vh">
    <!-- First screen after play -->
    <template v-if="props.play.validation_manage_play === 0">
      <h1 class="uppercase text-primary" v-text="'Complimenti'" />
      <p>
        La tua richiesta di cashback è stata inserita correttamente
      </p>

      <p>
        Entro 5 giorni da oggi (esclusi sabati, domeniche e festivi)
        controlleremo la validità della tua partecipazione
        e ti invieremo una mail.

        Se la partecipazione sarà considerata valida
        potrai proseguire con la richiesta del cashback.
      </p>

      <NuxtLink class="underline font-inherit mt-3" to="/">
        Home
      </NuxtLink>
    </template>

    <!-- Second screen if return after validation to insert iban & document -->
    <template v-if="props.play.validation_manage_play === 1">
      <!-- can add ship data only for first 5 day after validation-->
      <FormCashback v-if="play_date_diff <= 4" />
      <div v-else class="w-full">
        <h1 class="uppercase text-primary py-5vh" v-text="'Ci dispiace!'" />
        <br/>Sono passati 5 giorni dalla convalida!
      </div>
    </template>
  </div>
</template>
