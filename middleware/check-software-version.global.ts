import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (to) => {
  // This shouldn't run on this page, so we exit the middleware if the page is not-active
  if (to.name === 'not-active' || to.params.scroll === 'no') {
    return
  }

  const swVersion = useStorage('sw_version', '')

  const {
    data,
    valid,
  } = await useFetchCall('checkSoftwareVersion', { body: { version: swVersion.value } })

  if (valid && swVersion.value !== data.message) {
    swVersion.value = data.message as string
    window.location.reload()
  }
})
