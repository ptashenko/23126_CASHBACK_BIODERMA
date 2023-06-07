<script lang="ts" setup>
import dayjs from 'dayjs'
import type { IDragonConfig } from '~/types/types'
import { useTimeStore } from '~/store/time-store'

useHead({ title: 'Concorso non attivo' })

const { START_DATE }: IDragonConfig = decrypt(dragonConfig)
const timeStore = useTimeStore()
const router = useRouter()

const startDate = dayjs(START_DATE)

watchEffect(() => {
  timeStore.ifStart && router.push('/')
})
</script>

<template>
  <div class="min-h-60vh">
    <h1 class="pt-15vh" v-text="'Torna a trovarci tra'" />
    <div class="grid grid-cols-[repeat(auto-fit,_minmax(80px,_150px))] justify-center">
      <CountdownItem
        v-if="startDate.diff(timeStore.now, 'day') !== 0"
        :label-arr="['giorno', 'giorni']"
        :number="startDate.diff(timeStore.now, 'day')"
      />
      <CountdownItem
        v-if="startDate.diff(timeStore.now, 'hours') - (startDate.diff(timeStore.now, 'days') * 24) > 0"
        :label-arr="['ora', 'ore']"
        :number="startDate.diff(timeStore.now, 'hours') - (startDate.diff(timeStore.now, 'days') * 24)"
      />
      <CountdownItem
        :label-arr="['minuto', 'minuti']"
        :number="startDate.diff(timeStore.now, 'minutes') - (startDate.diff(timeStore.now, 'hours') * 60)"
      />
      <CountdownItem
        :label-arr="['secondo', 'secondi']"
        :number="startDate.diff(timeStore.now, 'seconds') - (startDate.diff(timeStore.now, 'minutes') * 60)"
      />
    </div>
  </div>
</template>
