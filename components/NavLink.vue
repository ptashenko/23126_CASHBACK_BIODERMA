<script lang="ts" setup>
import type { IMenuItem } from '~/types/types'
// import { useUserProfile } from '~/store/user-profile'

// const userProfile = useUserProfile()
const [isOpen, toggleMenu] = useToggle()
const isMobile = useIsMobile()
interface Props {
  navLink: IMenuItem
}

const props = defineProps<Props>()
const ruote = useRoute()

const hasChildren = computed(() => !!props.navLink.children)
const hasFunction = computed(() => typeof props.navLink.click === 'function')
const route = useRoute()

const getNavLinkLabel = (key: IMenuItem['key'], label: IMenuItem['label']): string => {
  const obj = {
    // user: `Ciao ${userProfile.userData.first_name_player}`,
    user: `Benvenuto`,
  }

  return obj[key] ?? label as string
}

/* Note: this works to close the menu on every route change but I don't love it... maybe we can find another way,
    maybe adding a function to the items that need to be closing the submenus */
watch(
  () => route.fullPath,
  () => {
    toggleMenu(false)
  }
)
const { y } = useWindowScroll()
</script>

<template>
  <div v-if="hasChildren && navLink.show" class="c-nav__subMenu md:relative">
    <div class="c-navLink__subMenu md:relative" :class="{'text-primary': y<30 && !isMobile && ruote.name === 'index'}">
      <button class="c-navLink -hasIcon" :class="{'text-primary': y<30 && !isMobile && ruote.name === 'index'}" @click="toggleMenu()">
        <span class="c-navLinkLabel">{{ getNavLinkLabel(navLink.key, navLink.label) }} </span>
        <span class="c-navLinkIcon material-symbols-outlined -empty">arrow_drop_down</span>
      </button>
      <div class="overflow-hidden absolute md:min-w-max top-full mt-0.5 right-0">
        <transition name="slideDown">
          <div v-show="isOpen" class="p-4 bg-primary/80" :class="{'!bg-primary': y>=30}">
            <NavLink
              v-for="item in navLink.children"
              :key="item.key.replace(' ', '').toLowerCase()"
              :nav-link="item"
              class="children"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>

  <button
    v-else-if="hasFunction"
    class="c-navLink"
    :class="{'text-primary': y<30 && !isMobile && ruote.name === 'index'}"
    @click.prevent="navLink.click()"
    v-text="navLink.label"
  />

  <a v-else-if="navLink.file" :href="navLink.link" target="_blank" class="c-navLink" :class="{'text-primary': y<30 && !isMobile && ruote.name === 'index'}">
    {{ getNavLinkLabel(navLink.key, navLink.label) }}
  </a>

  <NuxtLink
    v-else-if="navLink.show"
    :href="navLink.link ?? undefined"
    :class="{'text-primary': y<30 && !isMobile && ruote.name === 'index'}"
    :target="($attrs.target || navLink.target) ?? null"
    :to="navLink.to ?? undefined"
    class="c-navLink"
  >
    <BaseMsIcon v-if="navLink.icon" :icon="navLink.icon" color="inherit" variant="-filled" />
    {{ getNavLinkLabel(navLink.key, navLink.label) }}
  </NuxtLink>
</template>
