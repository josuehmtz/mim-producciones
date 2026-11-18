/** Barra fina en la parte superior que avanza con el scroll, como la línea de tiempo de un video. */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[2px] bg-brand-gradient shadow-[0_0_12px_var(--color-led)]"
    />
  )
}
