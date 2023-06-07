<script lang="ts" setup>
import { useUserProfile } from '~/store/user-profile'
import type { IPlay } from '~/types/interfaces'

definePageMeta({ middleware: 'auth' })
useHead({ title: 'Outcome Page' })

const prizeId = ref(null)

// const OutcomeWin = resolveComponent('OutcomeWin')
// const OutcomeLose = resolveComponent('OutcomeLose')
const OutcomePlayOk = resolveComponent('OutcomePlayOk')

const route = useRoute()
const router = useRouter()
const formShipment = useFormShipment()
const play = usePlay()
const userProfile = useUserProfile()

await useFetchCall('checkCode', {
  body: { code: route.params.code },
})
  .then(({ data, valid }) => {
    if (!valid) { router.push('/') }

    const message: IPlay = data.message as IPlay
    const {
      result_play,
      practice_code_play,
    } = message

    if (result_play < 400 || result_play > 405) {
      router.push('/')
    } else {
      play.value = message
      prizeId.value = message.prize_id_play
      formShipment.value.player_token_manage_play = userProfile.userData.player_token_player
      formShipment.value.practice_code_manage_play = practice_code_play
    }
  })

const lookUp = (key: number) => ({
  400: OutcomePlayOk,
  401: OutcomePlayOk,
  402: OutcomePlayOk,
  403: OutcomePlayOk,
  404: OutcomePlayOk,
})[key]

</script>

<template>
  <div class="">
    <component :is="lookUp(Number(play && play.result_play || null))" :play="play" />
  </div>
</template>
