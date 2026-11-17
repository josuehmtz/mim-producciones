import { useMediaQuery } from './useMediaQuery'

/** `true` si la persona pidió reducir animaciones en su sistema operativo. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
