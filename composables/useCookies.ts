import { useStorage, createGlobalState } from '@vueuse/core'

export const useShowCookiesModal = () => useState<boolean>('showCookiesModal', () => false)
export const useAcceptCookies = createGlobalState(() => useStorage('acceptCookies', 'no'))
export const useAcceptGA = createGlobalState(() => useStorage('acceptGA', 'no'))
export const useRelay42 = createGlobalState(() => useStorage('relay42', 'no'))

export const updateCookies = (value: 'yes' | 'no') => {
  const acceptCookies = useAcceptCookies()
  const acceptGA = useAcceptGA()
  const relay42 = useRelay42()

  acceptCookies.value = 'yes'
  acceptGA.value = relay42.value = value
}
