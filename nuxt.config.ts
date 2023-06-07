import type { MergeHead } from '@unhead/vue'
import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'
import { decrypt } from './utils/encrypt'
import dragonConfig from './config/dragonConfig'

const { PROJECT_TITLE, COOKIE_BOT_KEY } = decrypt(dragonConfig)
const cookieBot: MergeHead['script'][] = !COOKIE_BOT_KEY
  ? []
  : [{
      src: 'https://consent.cookiebot.com/uc.js',
      id: 'Cookiebot',
      'data-cbid': COOKIE_BOT_KEY,
      'data-blockingmode': 'auto',
      type: 'text/javascript',
      tagPosition: 'head',
    }]
export default defineNuxtConfig({
  // Disable server-side rendering: https://nuxt.com/docs/api/configuration/nuxt-config#ssr
  ssr: false,
  pages: true,
  // target: 'static',

  app: {
    // https://nuxt.com/docs/api/configuration/nuxt-config#head
    head: {
      title: 'Home Page',
      htmlAttrs: {
        lang: 'it',
      },
      titleTemplate: `${PROJECT_TITLE} | %s`,
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: pkg.description,
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'preconnect',
          href: 'https://contestengine.ubiqubit.it',
        },
      ],
      script: [...cookieBot],
    },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  /* head: {
    meta: [
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'facebook-domain-verification', content: 'rj6tnrlf1h2qfiksbhsdd68ikgk59h' },
    ],
    // scripts: [...cookieBot],
  }, */

  // Global CSS: https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    // Base
    'sweetalert2/dist/sweetalert2.min.css',
    '@/assets/css/base/typography.css',
    '@/assets/css/base/vue-transitions.css',
    'vue-final-modal/style.css',
    // windi preflight
    'virtual:windi-base.css',
    // your stylesheets which overrides the preflight
    '@/assets/css/layers/base.css',
    // windi extras
    'virtual:windi-components.css',
    '@/assets/css/layers/components.css',
    'virtual:windi-utilities.css',
    '@/assets/css/layers/utilities.css',
    // Vendors
    '@/assets/css/vendors/form-wizard.css',
    '@/assets/css/vendors/swal.css',
    '@/assets/css/vendors/viewer.css',
    '@/assets/css/vendors/vue-date-picker.css',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-icons'],
    ['@pinia/nuxt', {
      autoImports: ['defineStore'],
    }],
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    // '@nuxtjs/google-gtag',
    // '@nuxtjs/gtm',
    'nuxt-windicss',
  ],
  imports: {
    dirs: [
      'config',
    ],
  },
  runtimeConfig: {
    secret: 't3rc3s', // Note: Remember to also change this value on user-tester isAuth getter
    username: 'novatag',
    password: 'test2022',
    public: {
      apiBase: 'https://contestengine.ubiqubit.it/api/', // config.public.baseURL,
    },
  },
  nitro: {
    /* prerender: {
      routes: ['/user/1', '/user/2']
    }, */
    preset: 'aws-lambda', // https://nitro.unjs.io/deploy/providers/aws
  },
  vite: {
    mode: process.env.DEPLOY_ENV,
  },
  // https://github.com/nuxt-community/google-gtag-module
  /* 'google-gtag': {
    id: GTAGAW_CODE,
    config: {
      anonymize_ip: true, // anonymize IP
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: true, // disable if you don't want to track each page route with router.afterEach(...).
  },
  // https://github.com/nuxt-community/gtm-module#readme
  gtm: {
    id: GTM_CODE, // GTM_CODE, // 'GTM-WWXD3F6',
    enabled: !!GTM_CODE,
    pageTracking: true,
    pageViewEventName: 'nuxtRoute',
    autoInit: !!GTM_CODE,
    // config: {
    //  anonymize_ip: true, // anonymize IP
    //  send_page_view: false, // might be necessary to avoid duplicated page track on page reload
    // },
    debug: process.env.NODE_ENV !== 'production', // enable to track in dev mode
    // disableAutoPageTrack: true, // disable if you don't want to track each page route with router.afterEach(...).
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://contestengine.ubiqubit.it/api',
    common: {
      'Content-type': 'application/json',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate', 'vee-validate/dist/rules'],
  }, */
  // https://google-fonts.nuxtjs.org/
  // FixMe: download support is not currently working, wait for a stable release
  googleFonts: {
    download: false, // true, // Todo: change this to true when fixed
    base64: false, // process.env.NODE_ENV === 'production',
    display: 'swap',
    prefetch: true, // false, // Todo: change this to false when fixed
    preconnect: true, // false, // Todo: change this to false when fixed
    // stylePath: 'css/base/fonts.css', // Todo: uncomment this when fixed
    // fontsDir: process.env.NODE_ENV === 'production' ? 'fonts' : undefined, // Todo: uncomment this when fixed
    // fontsPath: process.env.NODE_ENV === 'production' ? '~assets/fonts' : undefined, // Todo: uncomment this when fixed
    families: {
      // Oswald: true,
      // Inconsolata: [400],
      // 'Kaushan Script': true,
      'Material Symbols Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200': true,
    },
  },
})
