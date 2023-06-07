import { useUserTester } from '~/store/user-tester'

export default defineNuxtRouteMiddleware((to) => {
  const userTester = useUserTester()

  if (to.name === 'login-staging') {
    if (import.meta.env.MODE !== 'staging') {
      return abortNavigation()
    }

    return !userTester.isAuth ? true : navigateTo('/')
  }

  if (import.meta.env.MODE === 'staging' && !userTester.isAuth) {
    return navigateTo('/login-staging')
  }
})
