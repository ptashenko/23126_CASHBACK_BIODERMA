import type { menuKeys } from '~/types/types'
import { useTimeStore } from '~/store/time-store'

const excludePages: menuKeys[] = ['not-active', 'concorso-terminato']

export default defineNuxtRouteMiddleware((to) => {
  const timeStore = useTimeStore()

  // This shouldn't run on these pages, so we exit the middleware if the page is on the list
  if (excludePages.includes(to.name as menuKeys)) {
    return true
  }

  if (!timeStore.ifStart && typeof timeStore.ifStart !== 'undefined') {
    return navigateTo('/not-active')
  }

  if (timeStore.ifEnd) {
    return navigateTo('/concorso-terminato')
  }
})
