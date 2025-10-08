// No-op fallback: activa Lenis solo si está instalado manualmente.
export async function initLenis() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return
  // Si más adelante instalas @studio-freight/lenis, descomenta el bloque de abajo.
  // try {
  //   const pkg = '@studio-freight/lenis'
  //   const mod = await import(/* @vite-ignore */ pkg)
  //   const Lenis = (mod as any).default
  //   const lenis = new Lenis({ duration: 1.1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  //   function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
  //   requestAnimationFrame(raf)
  //   ;(window as any).__lenis = lenis
  // } catch {}
}
