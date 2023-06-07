<script lang="ts" setup>
import dayjs from 'dayjs'
import { setLocale } from '@vee-validate/i18n'
import { ModalsContainer } from 'vue-final-modal'
import { useTimeStore } from '~/store/time-store'
import { usePopupMessages } from '~/store/popup-messages'
import { useUserProfile } from '~/store/user-profile'

const router = useRouter()
const timeStore = useTimeStore()
const popupMessages = usePopupMessages()
const loading = useLoading()
const userProfile = useUserProfile()
callLog({ str: 'config', data: decrypt(dragonConfig), isCall: 'call', log: 'table' });

(async function interval () {
  if (timeStore.status !== 'init') {
    const front = dayjs()
    front.add(timeStore.diff)
    timeStore.$patch({
      now: front,
    })
  } else {
    const { data, valid } = await useFetchCall('atomictime')

    if (valid) {
      const front = dayjs()
      const server = dayjs(data.message as string)
      const diff = server.diff(front)
      timeStore.$patch({
        now: front.add(diff),
        status: 'initialized',
        diff,
      })
    } else {
      timeStore.$patch({
        now: dayjs(),
      })
    }
  }

  setTimeout(interval, 1000)
})()

// Get global popup messages
popupMessages.getMessages()
// Get user info if already logged
userProfile.isAuth && await userProfile.getUserInfo()

watchEffect(() => {
  timeStore.ifEnd && router.push('/contest-ended')
})

watchEffect(() => {
  !timeStore.ifStart && router.push('/not-active')
})

// const { y } = useWindowScroll()
const route = useRoute()

setLocale('it')
</script>
<template>
  <div class="">
    <TheHeader />
    <main
      class="mx-auto text-center transition-all duration-600"
      :class="{'pt-145px': route.name !== 'index'}"
    >
      <NuxtPage />
      <ModalsContainer />
    </main>
    <LazyTheFooter />
    <TheCookies />
    <BaseLoader v-if="loading" />
  </div>
</template>

<style scoped>
.body-height {
  min-height: calc(100vh - 145px);
}
</style>
