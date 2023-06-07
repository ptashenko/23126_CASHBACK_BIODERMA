import type { IDragonConfig } from '~/types/types'

export default defineNuxtRouteMiddleware(() => {
  const { HAS_LOGIN }: IDragonConfig = decrypt(dragonConfig)

  if (!HAS_LOGIN) {
    return navigateTo('/')
  }
})
