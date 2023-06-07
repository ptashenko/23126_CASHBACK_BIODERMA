import { useTimeStore } from '~/store/time-store'
import type { menuKeys } from '~/types/types'

const excludePages: menuKeys[] = ['not-time']

export default defineNuxtRouteMiddleware((to) => {
  const timeStore = useTimeStore()

  // console.warn(timeStore.ifTime)

  if (to.name === 'not-time' && timeStore.ifTime) {
    return navigateTo('/play')
  }

  // This shouldn't run on these pages, so we exit the middleware if the page is on the list
  if (excludePages.includes(to.name as menuKeys)) {
    return true
  }

  if (!timeStore.ifTime) {
    return navigateTo('/not-time')
  }
})
