import { ButtonType, EColors, EMenuKeys, InputType, PlayStatus } from '~/types/enums'

export interface IGenericTypesForVue {
  string?: string
}

export interface IDragonConfig {
  START_DATE: Readonly<string>
  STOP_DATE: string
  START_VALIDITY: string
  STOP_VALIDITY: string
  PROJECT_KEY: string
  PROJECT_TITLE: string
  LOGIN_VARIABLE: string
  CONF_KEY: string
  DATE_FORMAT: string
  TIME_FORMAT: string
  HAS_LOGIN: boolean
  WIZARD_HAS_SHIPPING_DATA: boolean
  WIZARD_HAS_OCR: boolean
  WIZARD_HAS_IMAGE: boolean
  WIZARD_HIDE_STEPS: boolean
  WIZARD_HAS_TIME_FOR_PLAY: string
  WIZARD_OPEN_TIME_PLAY: string
  WIZARD_CLOSE_TIME_PLAY: string
  CHECKAGE: string
  COOKIE_BOT_KEY: string
  GTAG_CODE: string
  GTM_CODE: string
  GTAGAW_CODE: string
  GT_EVENTS: string
  DATEPICKER_MAX_DAYS: number
  HAS_DIRECT_LOGIN_AFTER_CONFIRM: boolean
  CAN_WIN_MORE_THEN_ONE_TIME: boolean
  APP_MECHANISM: string
}

export type playStatus = keyof typeof PlayStatus
export type sizes = 'sm' | 'md' | 'lg'
export type iconVariants = 'empty' | 'filled' | 'slim' | 'strong'
export type colors = keyof typeof EColors
export type position = 'left' | 'center' | 'right' | 'unset'
export type shape = 'square' | 'pill' | 'rounded'
export type target = '_self' | '_blank' | '_parent' | '_top'
export type consents = 'agreement1_player' | 'agreement2_player' | 'agreement3_player'
export type channel_play = 'web'
export type contest_phone_play = 'INSTANT_WIN'
export type resendEmailForUserFrom =
  | 'forgot_pwd_email'
  | 'new_registration_email'
  | 'new_user'
export type menuKeys = keyof typeof EMenuKeys
export type routes = `/${keyof typeof EMenuKeys}` | '/' | `/${string}.pdf`

export interface IRouterTo {
  path: routes,
  hash?: `#${string}`
}

export interface IMenuItem {
  /**
   * The key property  ...
   * document this.
   *
   * @default ''
   */
  key: menuKeys
  /**
   * The click function ...
   * document this.
   *
   * @default ''
   */
  click?: Function
  label: string,
  link?: string
  target?: target
  show: boolean
  icon?: string
  children?: IMenuItem[]
  to?: IRouterTo
}

export type IMainMenu = {
  [k in position]?: IMenuItem[]
}

interface possibleReturn {
  message?: Record<string, any>,
  status?: number
  statusCode?: number
}

export interface IFetchResponse {
  data: possibleReturn // TODO: type this according to backend responses es. {message?: string, status?: number}
  valid: boolean
  status: number
}

export type TInputType = keyof typeof InputType
export type TButtonType = keyof typeof ButtonType
export type TButtonVariant = 'default' | 'inverse'
export type TSelectData = { value: string | number, label: string }

// export type TestTInputType = key in EInputType NOTE: Why doesn't work?

export interface ITime {
  HH: string
  mm: string
}

export interface IReceipt {
  address: {
    address: string,
    location: string,
    province: string,
    zip: number | string
  },
  amount: string,
  amount_obj: {
    integer: string
    decimal: string
  },
  date: Date | string,
  date_obj: {
    raw_date: Date | string
    date: Date | string
    formatted_date: string
  },
  number: string,
  number_shallow: string,
  time: string,
  vatnum: string,
  shop: string
}

// NOTE: This can be easier if we handle front_jwt and rear_jwt inside this interface
export interface IOcrData {
  icode: string,
  iseq: string,
  front?: string,
  // front_jwt?: string,
  rear?: string,
  // rear_jwt?: string,
}

export interface IProvince {
  sigla: string
  provincia: string
  superficie: number
  residenti: number
  num_comuni: number
  id_regione: number
}

export interface IMunicipality {
  comune: string
  istat: number
}

export interface IPostalCode {
  id: number
  istat: number
  comune: string
  cap: string
}

export interface IAccordion {
  title: string
  content: HTMLElement | string
}

export interface IRadioGroup {
  id: number | string
  value: number | string
  label: string
}
