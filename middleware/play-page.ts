export default defineNuxtRouteMiddleware(() => {
  if (usePlayAtHomePage) {
    return navigateTo({ path: '/', hash: '#gioca' })
  }
})
