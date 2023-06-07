import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'

export default defineConfig({
  safelist: ['nuxt-link-exact-active'],
  preflight: {
    alias: {
      // add nuxt aliases
      'nuxt-link': 'a',
    },
  },
  theme: {
    container: {
      center: true,
    },
    fontSize: {
      base: '1rem',
      sm: '.875rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      hero: 'clamp(2.6rem, 2.6vw, 3.2rem)',
      h1: 'clamp(2.2rem, 2.2vw, 2.8rem)',
      h2: 'clamp(1.8rem, 1.8vw, 2.4rem)',
      h3: 'clamp(1.6rem, 1.6vw, 2.2em)',
      h4: 'clamp(1.4rem, 1.4vw, 2em)',
    },
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      primary: '#183d7f', // 'var(--color-primary)', // For CSS Vars
      secondary: '#white',
      body: '#183d7f',
      success: '#75c791',
      error: '#ff0000',
      warning: '#be8e00',
      info: '#69baf1',
      white: colors.white,
      black: colors.black,
      gray: {
        DEFAULT: '#616161',
        darkest: '#414141',
        dark: '#545556',
        light: '#A1A1A1',
        lightest: '#F5F5F5',
      },
    },
    borderRadius: {
      none: '0',
      DEFAULT: '0.25em',
      lg: '1.5em',
      full: '50%',
      pill: '40px',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      'lower-alpha': 'lower-alpha',
      'upper-alpha': 'upper-alpha',
    },
    extend: {
      // https://windicss.org/utilities/general/typography.html#font-family
      fontFamily: {
        title: ['ITCAvantGardeStd-Bold'],
        titlebook: ['ITCAvantGardeStd-Bk'],
        bold: ['Gotham-Bold'],
        body: ['Gotham-Medium'],
        icon: ['"Material Symbols Outlined"', 'san-serif'],
        inherit: 'inherit',
      },
      screens: {
        '@hover': { raw: '(hover: hover)' },
      },
      spacing: {
        header: 'var(--header-height)',
      },
      height: {
        header: 'var(--header-height)',
      },
      minHeight: {
        main: 'calc(100vh - (var(--header-height)))',
      },
      boxShadow: {
        input: '0 0 0 30px #ffe300 inset',
        'input-focus': '0 0 0 2px #fff, 0 0 0 4px rgb(50 100 150 / 40%)',
        btn: '2px 2px 10px rgba(0, 0, 0, 0.3)',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        'floating-label': 'transform, font-size, opacity',
        'lazy-image': 'opacity, filter',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      keyframes: {
        dots: {
          '0%, 100%': {
            'box-shadow': '0 -15px 0 -5px var(--dot-color-hide), ' +
              '-15px -15px 0 -5px var(--dot-color-show), ' +
              '15px -15px 0 -5px var(--dot-color-hide)',
          },
          '25%': {
            'box-shadow': '0 -15px 0 -5px var(--dot-color-hide), ' +
              '-15px -15px 0 0 var(--dot-color-show), ' +
              '15px -15px 0 -5px var(--dot-color-hide)',
          },
          '50%': {
            'box-shadow': '0 -15px 0 0 var(--dot-color-show), ' +
              '-15px -15px 0 -2px var(--dot-color-show), ' +
              '15px -15px 0 -5px var(--dot-color-hide)',
          },
          '75%': {
            'box-shadow': '0 -15px 0 -2px var(--dot-color-show), ' +
              '-15px -15px 0 -2px var(--dot-color-show), ' +
              '15px -15px 0 0 var(--dot-color-show)',
          },
        },
      },
      animation: {
        'dot-pulse': 'dots 1s ease-in-out infinite',
      },
      width: {
        fit: 'fit-content',
      },
    },
  },
  shortcuts: {
    'nuxt-link-exact-active': 'underline',
    'center-the-unknown': 'absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'pages-spacing': 'mt-20',
  },
  alias: {
    'nuxt-link-exact-active': 'underline',
    'center-the-unknown': 'absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'pages-spacing': 'mt-20',
  },
  plugins: [
    plugin(({
      addBase,
      theme,
    }) => {
      addBase({
        // @ts-expect-error: Might be an issue with windi types
        h1: { fontSize: theme('fontSize.h1') },
        // @ts-expect-error: Might be an issue with windi types
        h2: { fontSize: theme('fontSize.h2') },
        // @ts-expect-error: Might be an issue with windi types
        h3: { fontSize: theme('fontSize.h3') },
        a: {
          textDecoration: 'underline',
          transition: 'color 300ms',
        },
        // @ts-expect-error: Might be an issue with windi types
        'a:hover': { opacity: 0.8 },
      })
    }),
  ],
})
