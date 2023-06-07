<script lang="ts" setup>
// Note: Maybe we can merge this page with not-active
useHead({ title: 'Not Time!' })
import { useTimeStore } from '~/store/time-store'

const timeStore = useTimeStore()

const router = useRouter()
watchEffect(() => {
  timeStore.ifTime && router.push('/play')
})
</script>

<template>
  <div class="pt-20 pb-20 md:pb-70">
    <h4 class="text-hero text-xl font-bold py-1" v-text="'Il concorso attivo dal 01/06/2023 al 15/08/2023'" />
    <h4 class="text-hero text-xl font-bold py-2 mb-16" v-text="'tutti i giorni dalle ore 10.00 alle ore 20.00'" />

    <BaseButton class="mt-5" to="/" label="Home" />
  </div>
</template>
