import { useUserProfile } from '~/store/user-profile'
import type { IDragonConfig } from '~/types/types'

const { HAS_LOGIN }: IDragonConfig = decrypt(dragonConfig)
export default defineNuxtRouteMiddleware(() => {
  const userProfile = useUserProfile()

  if (!HAS_LOGIN) {
    return
  }

  if (!userProfile.isAuth) {
    return navigateTo('/login')
  }
})
