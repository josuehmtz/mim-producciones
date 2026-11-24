import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  /** Ícono antes del texto */
  icon?: IconName
  /** Ícono después del texto (p. ej. una flecha) */
  trailingIcon?: IconName
  className?: string
  children: ReactNode
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string
    /** Abre en otra pestaña con `rel="noopener noreferrer"` */
    external?: boolean
  }

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: never }

export type ButtonProps = LinkButtonProps | NativeButtonProps

const base =
  'group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full py-2 text-center leading-tight font-display font-semibold tracking-tight text-balance transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0'

const variants: Record<Variant, string> = {
  // Al pasar el cursor, un destello de luz cruza el botón
  primary:
    'bg-brand-gradient text-ink shadow-[0_10px_30px_-12px_rgb(61_191_240/0.8)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgb(61_191_240/0.9)] before:absolute before:inset-y-0 before:-left-1/2 before:w-1/2 before:-skew-x-12 before:bg-linear-to-r before:from-transparent before:via-white/50 before:to-transparent before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[300%] [&>*]:relative',
  outline:
    'border border-fg/25 bg-white/[0.03] text-fg backdrop-blur-sm hover:-translate-y-0.5 hover:border-led hover:text-led-light',
  ghost: 'text-fg hover:text-led-light',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-5 text-sm',
  md: 'min-h-12 px-7 text-sm',
  lg: 'min-h-14 px-8 text-base',
}

/**
 * Botón de la marca. Con `href` se renderiza como enlace (<a>), sin él como <button>.
 * Así un mismo componente sirve para navegación y acciones, con estilos idénticos.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    trailingIcon,
    className,
    children,
    ...rest
  } = props
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  )

  if (rest.href !== undefined) {
    const { external, ...anchorProps } = rest as LinkButtonProps
    return (
      <a
        {...anchorProps}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {content}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = rest as NativeButtonProps
  return (
    <button {...buttonProps} type={type} className={classes}>
      {content}
    </button>
  )
}
