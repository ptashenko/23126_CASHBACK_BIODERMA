<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import { computed, watch } from 'vue'
import { useRoute } from 'nuxt/app'
import type { IMenuItem, position } from '~/types/types'
import { useIsMobile } from '~/composables/useVueUse'

// const mainMenu = inject('mainMenu') as { [key in position]: IMenuItem[] }

const route = useRoute()
const isMobile = useIsMobile()
const [isOpen, toggleMenu] = useToggle()

interface Props {
  mainMenu: { [key in position]: IMenuItem[] }
}

const props = defineProps<Props>()

// const headerH = isMobile ? '90px' : '120px'
// const top = computed(() => (isMobile ? '90px' : '120px'))

/* Let's get only the menu items that have show true */

const mergedMenu = computed(() => [...props.mainMenu.left, ...props.mainMenu.right].filter(item => item.show))
// const mergedMenu = computed(() => [...mainMenu.LEFT, ...mainMenu.RIGHT].filter(item => item.show))

watch(
  () => route.fullPath,
  () => {
    toggleMenu(false)
  }
)

</script>

<template>
  <div class="w-full flex justify-between items-center h-header">
    <HeaderMainLogo />
    <button v-if="isMobile" class="flex" @click="toggleMenu()">
      <span class="m-auto material-symbols-outlined -empty">menu</span>
    </button>
    <div v-if="mergedMenu" class="left-0 top-header w-full md:w-fit" :class="[{'fixed overflow-hidden bg-white/30 backdrop-blur-sm': isMobile}]">
      <transition name="slideDown">
        <nav v-show="(isOpen && isMobile) || !isMobile" class="w-full flex md:(justify-end gap-4)" :class="[{'flex-col': isMobile}]">
          <NavLink v-for="item in mergedMenu" :key="item.key.replace(' ', '').toLowerCase()" :nav-link="item" />
        </nav>
      </transition>
    </div>
  </div>
</template>
