<script lang="ts" setup>
import dayjs from 'dayjs'
import { useUserProfile } from '~/store/user-profile'
import type { IPlay } from '~/types/interfaces'

definePageMeta({ middleware: ['if-end', 'has-login', 'auth'] })
useHead({ title: 'Le tue ricevute' })

const userProfile = useUserProfile()
const myAttempts = ref<IPlay[]>([])
const selectedAttempt = ref<IPlay | null>(null)

const { valid, data } = await useFetchCall('myAttempt', {
  body: {
    player_token_player: userProfile.userData.player_token_player,
  },
})

if (valid) { myAttempts.value = data.message as IPlay[] }

const getStatus = (key = 0) => ({
  0: { msg: ' step 1: In fase di convalida', class: 'text-warning' },
  1: { msg: ' step 1: Convalidata ', class: 'text-success' },
  2: { msg: ' step 1: Non è stata convalidata', class: 'text-error' },
  10: { msg: ' step 2: Convalidata ', class: 'text-success' },
  20: { msg: ' step 2: Non è stata convalidata', class: 'text-error' },
  3: { msg: 'Errore dati', class: 'text-error' },
  4: { msg: 'Errore immagine', class: 'text-error' },
})[key]

// Filter the attempts we need to show and add some logic for the FrontEnd
const filteredMyAttempts = computed<IPlay[]>(() => myAttempts.value
  .filter(attempt => [400, 401, 402, 403].includes(attempt.result_play))
  .map(item => ({
    ...item,
    lose: [400, 403].includes(item.result_play),
    status_fe: getStatus(item.validation_manage_play),
  })))

const handleClick = (attempt: string) => {
  selectedAttempt.value = filteredMyAttempts.value.find(el => el.practice_code_play === attempt) as IPlay || null
}
const closeSelectedAttempt = function () {
  selectedAttempt.value = null
}

</script>

<template>
  <div class="p-5 pt-0 md:(p-10 max-w-60vw m-auto) min-h-65vh ">
    <h1 class="text-center text-h3 md:text-h1" v-text="'Le tue partecipazioni'" />
    <div v-if="!!filteredMyAttempts.length" class="text-center">
      <h3 class="text-xl md:text-2xl" v-text="'Clicca sulla riga di partecipazione per maggiori informazioni'" />
      <div class="lg:w-8/12 lg:mx-auto mt-8">
        <button
          v-for="attempt in filteredMyAttempts"
          :key="attempt.practice_code_play"
          class="block mx-auto lg:flex lg:gap-2 lg:mr-auto lg:ml-0"
          @click="() => handleClick(attempt.practice_code_play)"
        >
          <span>
            Pratica - {{ attempt.practice_code_play }} del {{ dayjs(attempt.datetime_play).format('DD-MM-YYYY') }}
          </span>
          <span class="before:content-['(_'] after:content-['_)']">
            <span>canale: {{ attempt.channel_play }} -</span>
            <span v-if="attempt.lose" class="text-error">Non vincente</span>
            <span
              v-else
              :class="attempt.status_fe.class"
              v-text="attempt.status_fe.msg"
            />
          </span>
        </button>
      </div>
      <hr class="text-primary my-4 border-t-2">
      <transition name="slideFade" mode="out-in">
        <div v-if="!!selectedAttempt" :key="selectedAttempt.practice_code_play">
          <PlayAttempt :play="selectedAttempt">
            <BaseButton label="Chiudi" @click="closeSelectedAttempt" />
          </playattempt>
        </div>
      </transition>
    </div>
    <div v-else>
      <p>Non hai partecipato ancora, prova a vincere!</p>
      <BaseButton to="/play" label="Gioca" />
    </div>
  </div>
</template>
