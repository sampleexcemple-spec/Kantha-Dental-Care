import useInView from '../lib/useInView'

/**
 * Wraps any content and fades/slides it up into place the first time it
 * scrolls into view. `delay` (ms) lets a group of items stagger slightly.
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        transitionDelay: inView ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </Tag>
  )
}
