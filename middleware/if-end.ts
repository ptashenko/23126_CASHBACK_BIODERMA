import { useTimeStore } from '~/store/time-store'
import type { menuKeys } from '~/types/types'

const excludePages: menuKeys[] = ['concorso-terminato']

export default defineNuxtRouteMiddleware((to) => {
  const timeStore = useTimeStore()

  if (to.name === 'concorso-terminato' && !timeStore.ifEnd) {
    return navigateTo('/')
  }

  // This shouldn't run on these pages, so we exit the middleware if the page is on the list
  if (excludePages.includes(to.name as menuKeys)) {
    return true
  }

  if (timeStore.ifEnd) {
    return navigateTo('/concorso-terminato')
  }
})
