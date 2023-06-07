import type { position, routes } from '~/types/types'

export interface IPapagayoConfig {
  logoPosition: position
  useFloatingLabel: boolean
  usePlayAtHomePage: Boolean
  default_player_token_player: string
  Authorization: string
  policyLinks: Record<string, routes>
}

const papagayoConfig: IPapagayoConfig = {
  logoPosition: 'center',
  useFloatingLabel: false,
  usePlayAtHomePage: false,
  default_player_token_player: 'xfc08qjwniau0l5a36edinjxsv697kbct5w402vbe4zw6wi9ekhfokvtu8n9x9pmb',
  Authorization: '37a164b0982a431e4b56306c63bcaccb74d9367a',
  policyLinks: {
    privacyPolicy: '/regolamento.pdf',
    cookiesPolicy: '/cookies.pdf',
    regolamentoPolicy: '/regolamento.pdf',
  },
}

const { logoPosition, useFloatingLabel, usePlayAtHomePage, Authorization } = papagayoConfig
export { papagayoConfig, logoPosition, useFloatingLabel, usePlayAtHomePage, Authorization }
