import useInView from '../lib/useInView'
import { useEffect, useState } from 'react'

/**
 * Counts up from 0 to `target` once it scrolls into view.
 * Renders as plain text once done, so it stays copy-paste and screen-reader friendly.
 */
export default function Counter({ target, suffix = '', duration = 1400, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setValue(target)
      return
    }

    let raf
    const start = performance.now()
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out cubic, so it settles smoothly rather than stopping abruptly
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
