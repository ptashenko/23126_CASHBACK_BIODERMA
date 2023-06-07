<script lang="ts" setup>
// TODO: Implement this component
import { useToggle } from '@vueuse/core'
import { watch } from 'vue'
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

// const mergedMenu = computed(() => [...props.mainMenu.left, ...props.mainMenu.right].filter(item => item.show))
// const mergedMenu = computed(() => [...mainMenu.LEFT, ...mainMenu.RIGHT].filter(item => item.show))
const { y } = useWindowScroll()

const heightClass = computed(() => route.name === 'index' ? 'min-h-90px md:max-h-90px' : 'min-h-145px md:max-h-145px')

watch(
  () => route.fullPath,
  () => {
    toggleMenu(false)
  }
)
</script>

<template>
  <div
    class="flex items-center transition md:(block)"
  >
    <HeaderMainLogo v-if="isMobile" :light="isOpen" class="flex-1" />
    <button v-if="isMobile" class="flex absolute right-5 z-9999" :class="{'text-white': y >= 30 && route.name === 'index' || route.name !== 'index'}" @click.stop="toggleMenu()">
      <span class="m-auto material-symbols-outlined text-[40px] -empty">menu</span>
    </button>
    <div
      class="flex items-center justify-between absolute top-[100%] w-full md:static"
      :class="!isMobile && heightClass"
    >
      <div
        v-if="props.mainMenu.left"
        class="flex-1"
      >
        <transition name="slideDown">
          <nav v-show="(isOpen && isMobile) || !isMobile" class="w-full flex md:(justify-evenly gap-4)" :class="[{'flex-col bg-primary py-2 min-h-120px': isMobile}]">
            <NavLink v-for="item in props.mainMenu.left" :key="item.key.replace(' ', '').toLowerCase()" :nav-link="item" />
          </nav>
        </transition>
      </div>
      <HeaderMainLogo v-if="!isMobile" :list="false" />
      <div
        v-if="props.mainMenu.right"
        class="flex-1"
      >
        <transition name="slideDown">
          <nav v-show="(isOpen && isMobile) || !isMobile" class="w-full flex md:(justify-evenly gap-4)" :class="[{'flex-col bg-primary py-2 min-h-120px': isMobile}]">
            <NavLink v-for="item in props.mainMenu.right" :key="item.key.replace(' ', '').toLowerCase()" :nav-link="item" />
          </nav>
        </transition>
      </div>
    </div>
  </div>
</template>
