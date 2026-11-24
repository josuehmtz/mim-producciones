import { useRef, useState, type FormEvent } from 'react'
import {
  buildContactMessage,
  MAX_MESSAGE_LENGTH,
  serviceOptions,
  todayISO,
  validateContact,
  type ContactErrors,
  type ContactRequest,
} from '../../../utils/contactRequest'
import { mailtoUrl, whatsappUrl } from '../../../utils/links'
import { Button } from '../../ui/Button'
import { controlClass, FormField } from '../../ui/FormField'

type Channel = 'whatsapp' | 'email'

/** Cada canal sabe cómo abrir el mensaje: agregar otro canal no toca el formulario. */
const channels: Record<Channel, (message: string) => string> = {
  whatsapp: (message) => whatsappUrl(message),
  email: (message) => mailtoUrl('Solicitud de cotización desde el sitio web', message),
}

const readForm = (form: HTMLFormElement): ContactRequest => {
  const fd = new FormData(form)
  const text = (key: string) => String(fd.get(key) ?? '')
  return {
    name: text('name'),
    company: text('company'),
    service: text('service'),
    date: text('date'),
    message: text('message'),
  }
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
    const channel: Channel = submitter?.value === 'email' ? 'email' : 'whatsapp'

    const data = readForm(e.currentTarget)
    const found = validateContact(data)
    setErrors(found)

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      setStatus('')
      return
    }

    const url = channels[channel](buildContactMessage(data))
    if (channel === 'whatsapp') window.open(url, '_blank', 'noopener,noreferrer')
    else window.location.href = url

    setStatus(
      channel === 'whatsapp'
        ? 'Abrimos WhatsApp con tu mensaje. Solo presiona enviar.'
        : 'Abrimos tu correo con el mensaje listo para enviar.',
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="form-title"
      className="grid gap-5 card-surface bg-ink-raised/60 p-[clamp(1.5rem,1rem+3vw,2.75rem)] backdrop-blur-md"
    >
      <div>
        <h3 id="form-title" className="text-xl">
          Solicita tu cotización
        </h3>
        <p className="mt-2 text-sm text-fg-muted">
          Llena los datos y elige cómo enviarlos: el mensaje se prepara automáticamente.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nombre" required error={errors.name}>
          {(control) => (
            <input
              {...control}
              name="name"
              type="text"
              autoComplete="name"
              required
              className={controlClass}
            />
          )}
        </FormField>
        <FormField label="Empresa">
          {(control) => (
            <input
              {...control}
              name="company"
              type="text"
              autoComplete="organization"
              className={controlClass}
            />
          )}
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Servicio" required error={errors.service}>
          {(control) => (
            <select
              {...control}
              name="service"
              required
              defaultValue=""
              className={`${controlClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%233dbff0'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:18px] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
            >
              <option value="" disabled>
                Selecciona…
              </option>
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          )}
        </FormField>
        <FormField label="Fecha del evento" error={errors.date}>
          {(control) => (
            <input
              {...control}
              name="date"
              type="date"
              min={todayISO()}
              className={`${controlClass} [color-scheme:dark]`}
            />
          )}
        </FormField>
      </div>

      <FormField
        label="Detalles del evento"
        error={errors.message}
        hint="Sede, número de asistentes, equipo que necesitas…"
      >
        {(control) => (
          <textarea
            {...control}
            name="message"
            rows={4}
            maxLength={MAX_MESSAGE_LENGTH}
            className={`${controlClass} min-h-28 resize-y`}
          />
        )}
      </FormField>

      <div className="mt-1 flex flex-wrap gap-3">
        <Button type="submit" name="channel" value="whatsapp" icon="whatsapp" className="flex-auto">
          Enviar por WhatsApp
        </Button>
        <Button
          type="submit"
          name="channel"
          value="email"
          variant="outline"
          icon="mail"
          className="flex-auto"
        >
          Enviar por correo
        </Button>
      </div>

      <p role="status" className="min-h-[1.5em] text-center text-sm text-led-light">
        {status}
      </p>
    </form>
  )
}
