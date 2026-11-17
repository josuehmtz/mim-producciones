import { useId, type ReactNode } from 'react'

/** Props que el campo debe pasar a su control (input, select, textarea). */
export interface ControlProps {
  id: string
  'aria-invalid'?: true
  'aria-describedby'?: string
}

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  hint?: string
  className?: string
  /** Recibe los atributos de accesibilidad que conectan etiqueta, ayuda y error */
  children: (control: ControlProps) => ReactNode
}

/** Clases compartidas por todos los controles del formulario. */
export const controlClass =
  'min-h-12 w-full rounded-md border border-ink-line bg-ink/60 px-4 py-3 text-base text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-200 focus:border-led focus:shadow-[0_0_0_3px_rgb(61_191_240/0.18)] focus:outline-none aria-[invalid=true]:border-danger'

/** Campo de formulario accesible: etiqueta, control, ayuda y mensaje de error enlazados. */
export function FormField({ label, required, error, hint, className, children }: FormFieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className ?? 'grid gap-2'}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {required && (
          <span aria-hidden="true" className="text-led">
            {' '}
            *
          </span>
        )}
      </label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })}
      {hint && !error && (
        <p id={hintId} className="text-xs text-fg-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
