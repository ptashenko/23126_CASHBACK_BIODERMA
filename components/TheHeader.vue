<script lang="ts" setup>
import { useRoute } from 'nuxt/app'
import type { IDragonConfig, IMainMenu, position } from '~/types/types'
import { useUserProfile } from '~/store/user-profile'
import { useTimeStore } from '~/store/time-store'

const HeaderLogoLeft = resolveComponent('HeaderLogoLeft')
const HeaderLogoCenter = resolveComponent('HeaderLogoCenter')
const HeaderOnlyLogo = resolveComponent('HeaderOnlyLogo')

const userProfile = useUserProfile()
const timeStore = useTimeStore()
const router = useRouter()
const { HAS_LOGIN }: IDragonConfig = decrypt(dragonConfig)

const handleLogout = () => {
  userProfile.logout().then(() => {
    router.push('/')
  })
}

const route = useRoute()
const { y } = useWindowScroll()

// Note: since Nuxt Bridge uses vue 2 under the hood I will use a computed till upgrade to Nuxt 3, then we could use reactive or ref value
const mainMenu = computed<IMainMenu>(() => ({
  left: [
    {
      key: 'home',
      label: 'Home',
      to: { path: '/' },
      show: true,
    },
    {
      key: 'how-to-play',
      label: 'Come Partecipare',
      to: {
        path: '/',
        hash: '#come-partecipare',
      },
      show: true,
    },
    {
      key: 'premi',
      label: 'Premi',
      to: {
        path: '/',
        hash: '#premi',
      },
      show: true,
    },
  ],
  right: [
    {
      key: 'gioca',
      label: 'Partecipa',
      to: { path: '/gioca' }, // Note: Notice that you can use italian or english, depends on client's preferences
      show: true,
    },
    {
      key: 'regolamento',
      label: 'Regolamento',
      link: './regolamento.pdf',
      file: true,
      show: true,
    },
    {
      key: 'login',
      label: 'Login',
      to: { path: '/login' },
      show: !userProfile.isAuth && HAS_LOGIN,
    },
    {
      key: 'user',
      label: 'Ciao $user',
      show: userProfile.isAuth && HAS_LOGIN,
      children: [
        /*
        {
          key: 'account',
          label: 'Il Mio Profilo',
          to: { path: '/account/profile' },
          show: userProfile.isAuth && HAS_LOGIN,
        },
        */
        {
          key: 'receipts',
          label: 'Le tue partecipazioni',
          to: { path: '/account/receipts' },
          show: userProfile.isAuth && HAS_LOGIN,
        },
        {
          key: 'logout',
          label: 'Esci',
          click: () => handleLogout(),
          show: userProfile.isAuth && HAS_LOGIN,
        },
      ],
    },
  ],
}))

const lookUp = (key: position) => ({
  left: HeaderLogoLeft,
  center: HeaderLogoCenter,
  right: HeaderLogoLeft,
  unset: HeaderOnlyLogo,
})[key] as string

// provide('mainMenu', mainMenu)

</script>

<template>
  <header
    class="fixed transition-all duration-370 ease-in-out top-0 left-0 w-full z-100"
    :class="{'main-gradient': route.name !== 'index' || ( route.name === 'index' && y >= 30)}"
  >
    <component :is="!timeStore.ifStart ? lookUp('unset') : lookUp(logoPosition)" :main-menu="mainMenu" />
  </header>
</template>
