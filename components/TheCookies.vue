<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import type { IDragonConfig } from '~/types/types'

const { COOKIE_BOT_KEY }: IDragonConfig = decrypt(dragonConfig)
const showCookiesModal = useShowCookiesModal()
const acceptCookies = useAcceptCookies()
const showBanner = computed(() => !showCookiesModal.value && (acceptCookies.value !== 'yes') && !COOKIE_BOT_KEY)

function closeModal () {
  showCookiesModal.value = false
}

</script>

<template>
  <div>
    <CookiesModal v-if="showCookiesModal" v-on-click-outside="closeModal" />
    <CookiesBanner v-if="showBanner" />
  </div>
</template>
