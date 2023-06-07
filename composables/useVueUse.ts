import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)

// export const useIsMobile = () => useState('isMobile', () => useMediaQuery('(max-width: 768px)'))
export const useIsMobile = () => useState('isMobile', () => breakpoints.smaller('md'))
