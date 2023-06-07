export default defineNuxtRouteMiddleware((to) => {
  // If the user has arrived without token
  if (!to.query.token) {
    return navigateTo('/login')
  }
})
