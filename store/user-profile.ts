import dayjs from 'dayjs'
import type { IDragonConfig } from '~/types/types'

const { LOGIN_VARIABLE, PROJECT_KEY }: IDragonConfig = decrypt(dragonConfig)

interface IState {
  userNotConfirmed: boolean
  userIsAuth: boolean
  userData: {
    first_name_player: string
    last_name_player: string
    username_player: string
    support_id_player: string
    player_token_player: string
    phone_player: string
    iban: string
    agreement1_player?: string | number
    agreement2_player?: string | number
    agreement3_player?: string | number
    agreement4_player?: string | number
  }
}

export interface ILoginForm {
  username_player: string,
  password_player: string
}

const removeItems = [
  '55a5s1dfflo$fswe',
  '66a5s2dttlo$fsw',
  '99a3s2dgflo$fsw',
  '01a5s2dhglo$fsw',
  '98a0s2ddelo$fsw',
  '75a9s2dsslo$fsw',
  '96a3s2djjlo$fsw',
  '81a4s2dyylo$fsw',
  '72a5s2diilo$fsw',
  '97a6s2dkklo$fsw',
  '55a7s2dwdlo$fswe',
  '00a7s2dwdlo$fswe',
  '11a7s2dwdlo$fswe',
  '44a7s2dwdlo$fsw',
  '77a7s2dwdlo$fswe',
  '88a7s2dwdlo$fswe',
  '99a7s2dwdlo$fswe',
  '10a7s2dwdlo$fswe',
]

export const useUserProfile = defineStore({
  id: 'userProfile',
  state: () => <IState>({
    userNotConfirmed: false,
    userIsAuth: false,
    userData: {
      first_name_player: '',
      last_name_player: '',
      username_player: '',
      support_id_player: '',
      player_token_player: papagayoConfig.default_player_token_player, // Authorization
      phone_player: '',
      iban: '',
      agreement1_player: '',
      agreement2_player: '',
      agreement3_player: '',
      agreement4_player: '',
    },
  }),
  actions: {
    async getUserInfo () {
      const player_token_player = localStorage.getItem(`${LOGIN_VARIABLE}${PROJECT_KEY}`)
      const jwt = localStorage.getItem(`${LOGIN_VARIABLE}${PROJECT_KEY}#$%`)
      const { valid, data } = await useFetchCall('getUser', {
        body: { player_token_player, jwt },
      })

      if (valid) {
        this.$patch({ userData: data.message as Record<string, any>, userIsAuth: true })
      } else {
        await this.logout().then(() => {
          SweetAlertFeedback.fire({
            title: 'la sessione e scaduta.',
            icon: 'info',
            text: data.message as string,
          })
          useRouter().push('/login')
        })
      }
    },
    async login ({ username_player, password_player }: ILoginForm) {
      this.$patch({ userNotConfirmed: false })
      const { data, valid } = await useFetchCall('login', {
        body: { username_player, password_player },
      })

      const { message } = data

      if (valid) {
        const { player_token_player, jwt }: any = message

        localStorage.setItem(`55a5s1dffe$fswe${PROJECT_KEY}`, `$234${player_token_player.split('').reverse().join('')}2324234`)
        localStorage.setItem(`66a5s2dtte$fsw${PROJECT_KEY}`, `$vr4${dayjs().format('YYYY-MM-DD HH:mm:ss')}3453455`)
        localStorage.setItem(`99a3s2dgfe$fsw${PROJECT_KEY}`, `$34f${dayjs().format('YYYY-MM-DD HH:mm:ss')}wer345f`)
        localStorage.setItem(`01a5s2dhge$fsw${PROJECT_KEY}`, `$fwe${dayjs().format('YYYY-MM-DD HH:mm:ss')}werweqe`)
        localStorage.setItem(`98a0s2ddee$fsw${PROJECT_KEY}`, `$5fs${player_token_player}${dayjs().format('YYYY-MM-DD HH:mm:ss')}fertfdw`)
        localStorage.setItem(`75a9s2dsse$fsw${PROJECT_KEY}`, `$4ff${dayjs().format('YYYY-MM-DD HH:mm:ss')}werfsfd`)
        localStorage.setItem(`${LOGIN_VARIABLE}${PROJECT_KEY}`, player_token_player)
        localStorage.setItem(`${LOGIN_VARIABLE}${PROJECT_KEY}#$%`, jwt)
        localStorage.setItem(`96a3s2djje$fsw${PROJECT_KEY}`, `$45f${player_token_player}435wefs`)
        localStorage.setItem(`81a4s2dyye$fsw${PROJECT_KEY}`, `$4fe${player_token_player}${dayjs().format('YYYY-MM-DD HH:mm:ss')}sdtrrdf`)
        localStorage.setItem(`72a5s2diie$fsw${PROJECT_KEY}`, `$5fs${dayjs().format('YYYY-MM-DD HH:mm:ss')}dswe443`)
        localStorage.setItem(`97a6s2dkke$fsw${PROJECT_KEY}`, `$ng4${dayjs().format('YYYY-MM-DD HH:mm:ss')}cvrt433`)
        localStorage.setItem(`00a7s2dwde$fsw${PROJECT_KEY}`, `$8hs${dayjs().format('YYYY-MM-DD HH:mm:ss')}gfdgerg`)
        sessionStorage.setItem('token', '$2th#eto#ket$h%a6tyo^ua@ret$ryi%ng^tof&5in$di^snota)9vaiable')

        removeItems.forEach(item => localStorage.removeItem(`${item}${PROJECT_KEY}`))

        this.userIsAuth = true
        this.$patch({
          userData: {
            ...message as Record<string, any>,
            player_token_player: decrypt(player_token_player, true),
          },
        })
        useRouter().push('/')
      } else {
        if (message === 'player_not_confirmed') {
          this.$patch({ userNotConfirmed: true })
        }

        if (message === 'player_not_found') {
          SweetAlertFeedback.fire({
            icon: 'warning',
            text: 'Email o password errati.',
          })
        }
      }
    },
    logout (): Promise<void> {
      const { PROJECT_KEY }: IDragonConfig = decrypt(dragonConfig)

      return new Promise((resolve) => {
        localStorage.removeItem(`${LOGIN_VARIABLE}${PROJECT_KEY}`)
        localStorage.removeItem(`${LOGIN_VARIABLE}${PROJECT_KEY}#$%`)
        localStorage.removeItem(`55a5s1dffe$fswe${PROJECT_KEY}`)
        localStorage.removeItem(`66a5s2dtte$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`99a3s2dgfe$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`01a5s2dhge$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`98a0s2ddee$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`75a9s2dsse$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`96a3s2djje$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`81a4s2dyye$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`72a5s2diie$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`97a6s2dkke$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`00a7s2dwde$fsw${PROJECT_KEY}`)
        localStorage.removeItem(`11a5s2dffe$fswe${PROJECT_KEY}`)
        sessionStorage.removeItem('token')
        sessionStorage.setItem('token', '$2n@3ow5$thet^ok&en8^th86atyo7uar8etr&yi(ng)to)_findisava$#iabl3efo%%rc$$hac##kingme')

        this.$reset()
        resolve()
      })
    },
  },
  getters: {
    isAuth: state =>
      state.userIsAuth ||
      !!localStorage.getItem(`${LOGIN_VARIABLE}${PROJECT_KEY}`),
  },
})
