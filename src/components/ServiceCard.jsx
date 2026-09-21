import { useState } from 'react'

export default function ServiceCard({ service }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      aria-pressed={flipped}
      aria-label={`${service.title}. Tap to ${flipped ? 'show title' : 'show details'}.`}
      className="group cursor-pointer select-none outline-none [perspective:1000px]"
    >
      <div className="relative w-full h-32 sm:h-40 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
        <div
          className={
            'relative w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] ' +
            (flipped ? '[transform:rotateY(180deg)]' : '')
          }
        >
          {/* Front: title only */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] rounded-xl border-2 border-teal-800/10
                       group-hover:border-teal-700 group-focus-visible:border-teal-700
                       bg-white/60 flex flex-col items-center justify-center text-center p-2 sm:p-3
                       transition-colors duration-300"
          >
            <h3 className="text-[11px] sm:text-sm text-teal-900 leading-snug">{service.title}</h3>
            <span className="mt-1.5 text-[9px] sm:text-[10px] text-gold-600 uppercase tracking-wide">Tap for details</span>
          </div>

          {/* Back: description */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl border-2 border-teal-700
                       bg-teal-900 flex items-center justify-center text-center p-2 sm:p-3"
          >
            <p className="text-[10px] sm:text-xs text-sand/90 leading-relaxed">{service.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
