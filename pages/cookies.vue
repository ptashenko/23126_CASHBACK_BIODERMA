<script lang="ts" setup>
import type { MaybeComputedRef, Script } from '@unhead/vue'
import type { IDragonConfig } from '~/types/types'

const CookiesBot = resolveComponent('CookiesBot')
const CookiesLocal = resolveComponent('CookiesLocal')
const { COOKIE_BOT_KEY }: IDragonConfig = decrypt(dragonConfig)
const cookieDeclarationScript: MaybeComputedRef<Script<{} | undefined>[]> = !COOKIE_BOT_KEY
  ? []
  : [{
      src: `https://consent.cookiebot.com/${COOKIE_BOT_KEY}/cd.js`,
      id: 'CookieDeclaration',
      type: 'text/javascript',
      tagPosition: 'head',
    }]

useHead({
  title: 'Cookies Page',
  script: cookieDeclarationScript,
})

</script>

<template>
  <div class="px-4">
    <component :is="COOKIE_BOT_KEY ? CookiesBot : CookiesLocal" />
  </div>
</template>
