<script lang="ts" setup>
definePageMeta({ middleware: ['if-end', 'if-time', 'auth', 'play-page'], alias: '/gioca' })
useHead({ title: 'Gioca' })
import { useTimeStore } from '~/store/time-store'
const timestore = useTimeStore()
const router = useRouter()
watchEffect(() => {
  !timestore.ifTime && router.push('/play')
})

</script>

<template>
  <div class="max-w-1200px mx-auto">
    <PlayWizard />
  </div>
</template>
