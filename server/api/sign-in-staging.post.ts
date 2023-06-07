export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const response = {
    valid: false,
    message: '',
  }

  if (body.username === config.username && body.password === config.password) {
    response.message = config.secret
    response.valid = true
  } else {
    response.message = 'Email o password errati.'
  }

  return { ...response }
})
