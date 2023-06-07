import type { NitroFetchRequest } from 'nitropack'
import type { UseFetchOptions } from '#app'
import type { IDragonConfig, IFetchResponse } from '~/types/types'
// import { useUserProfile } from '~/store/user-profile'

type Routes =
  | 'addNewUser'
  | 'atomictime'
  | 'callOcr'
  | 'changePassword'
  | 'checkCode'
  | 'checkIfIsUnique'
  | 'checkSoftwareVersion'
  | 'confirmAccount'
  | 'createPopUp'
  | 'editUser'
  | 'getProvinces'
  | 'getMunicipalities'
  | 'getZip'
  | 'getUser'
  | 'login'
  | 'play/web'
  | 'resendEmailForUser'
  | 'shippingData'
  | 'uploadImage'
  | 'myAttempt'

const {
  CONF_KEY,
  PROJECT_KEY,
}: IDragonConfig = decrypt(dragonConfig)

export default async function useFetchCall<DataT> (
  url: NitroFetchRequest | Routes,
  options: UseFetchOptions<DataT> = {},
  skipDecryption = false
): Promise<IFetchResponse> {
  // const userProfile = useUserProfile()
  const loading = useLoading()
  const excludedUrls: Routes[] = ['checkIfIsUnique', 'atomictime', 'checkSoftwareVersion']

  loading.value = ![...excludedUrls].includes(url as Routes)
  callLog({
    str: url,
    data: options?.body,
    isCall: 'call',
  })

  options = {
    ...options,
    method: options?.method || 'POST',
  }

  if (options.method === 'POST') {
    options.body = {
      ...options?.body as Record<string, unknown>,
      HBGRF: CONF_KEY,
      vector_HBGRF: PROJECT_KEY,
    }
  }

  const fetchedData: IFetchResponse = {
    data: {},
    valid: false,
    status: 0,
  }

  await useFetch(
    url, {
      baseURL: 'https://contestengine.ubiqubit.it/api/', // config.public.baseURL,
      headers: {
        Authorization: `Bearer ${Authorization}`,
        // Authorization: `Bearer ${userProfile.userData.player_token_player}`,
        'Content-type': 'application/json',
      },
      ...options,
      onRequest ({ options }) {
        // Set the request headers
        options.body = JSON.stringify({ data: options.body && encrypt(JSON.stringify(options.body)) })
      },
      /* onRequestError ({ request, options, error }) {
      // Handle the request errors
      }, */
      onResponse ({ response }) {
        // Process the response data
        fetchedData.data = skipDecryption ? response._data : decrypt(`${response._data}`)
        fetchedData.status = response.status
        fetchedData.valid = true
      },
      onResponseError ({
        request,
        response,
        options,
      }) {
        // Handle the response errors
        console.log({
          request,
          response,
          options,
        }) // TODO: remove this line when done
        fetchedData.data = skipDecryption ? response._data : decrypt(response._data) // err.data && decrypt(err.data)
        fetchedData.status = response.status
        fetchedData.valid = false
      },

    })

  callLog({
    str: url,
    data: fetchedData,
    isCall: 'resp',
    log: fetchedData.valid ? 'log' : 'warn',
  })
  loading.value = false
  return { ...fetchedData }
}
