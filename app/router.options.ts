import type { RouterConfig } from '@nuxt/schema'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior (to) {
    if (to.params.scroll === 'no') {
      return
    }

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            top: breakpoints.smaller('md').value ? 80 : 100,
            behavior: 'smooth',
          })
        }, 200)
      })
    }

    return {
      top: 0,
      behavior: 'smooth',
    }
  },
}
