import type { NitroFetchRequest } from 'nitropack'
import { usePopupMessages } from '~/store/popup-messages'

interface CallLogParams {
  str: NitroFetchRequest | string;
  data?: Record<string, unknown> | unknown;
  isCall: 'call' | 'resp'
  log?: 'warn' | 'error' | 'log' | 'table'
}

export const sleep = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms))

export const removeDuplicatesFromArr = (arr: string[]) => ([...new Set(arr)])

export const randomInteger = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

export const callLog = ({ str, data, isCall, log = 'log' }: CallLogParams) => {
  if (process.dev) {
    if (log === 'table') {
      // eslint-disable-next-line no-console
      console.table(data)
    } else {
      // eslint-disable-next-line no-console
      console[log](`${str}-> ${isCall ?? 'resp'}`, {
        data,
      })
    }
  }
}

/* NOTE: Can't use this since the codes are repeating themselves,
    it'll be nice to create a table for global messages with {code:string}
    username_player: [(!valid && getCodeMessage(data.statusCode))] */
// NOTE: 'Email o password errati' use the same 1404 code
export const getCodeMessage = (code = 1401): string | undefined => ({
  1401: 'Account non confermato!',
  1404: 'L `indirizzo e-mail non è associato ad un nessun utente registrato.',
})[code]

/* NOTE: Can't use this since the codes are repeating themselves,
    it'll be nice to create a table for global messages with {code:string}
    username_player: [(!valid && getCodeMessage(data.statusCode))] */
// NOTE: 'Email o password errati' use the same 1404 code

export const popupErrorCode = (code: number) => {
  const router = useRouter()
  const popupMessages = usePopupMessages()
  // FIND CORRESPOND POPUPCODE
  const element = popupMessages.messages.find(el => el.code_popup === code)

  // NOTE: This logic should be when calling this function? base on the response codes from BE
  // IF POPUP CONFIGURATION FOR THIS CODE NOT ACTIVE -> EXIT
  if (element?.active_json_popup_outcome === 0) {
    return true
  }

  const json = element && JSON.parse(element.json_configuration_popup_outcome)

  const getDidClose = (key: string) => ({
    reload: window.location.reload(),
    home: router.push('/'),
    receipts: router.push('/account/receipts'),
    default: () => {},
  })[key]

  SweetAlertFeedback.fire({
    icon: json.type,
    title: json.title,
    html: json.html,
    timer: json.time || '',
    ...(json.function_onclose_active && { didClose: () => getDidClose((json.function_onclose) || 'default') }),
  }).then(() => {}) // do nothing
}
