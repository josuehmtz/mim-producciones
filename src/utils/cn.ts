type ClassValue = string | false | null | undefined

/** Une clases de Tailwind ignorando valores vacíos: `cn('a', cond && 'b')`. */
export const cn = (...classes: ClassValue[]) => classes.filter(Boolean).join(' ')
