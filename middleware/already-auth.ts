import { useUserProfile } from '~/store/user-profile'

export default defineNuxtRouteMiddleware(() => {
  const userProfile = useUserProfile()

  if (userProfile.isAuth) {
    return navigateTo('/')
  }
})
