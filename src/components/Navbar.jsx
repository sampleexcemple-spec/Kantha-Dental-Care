import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { clinic } from '../lib/clinicInfo'
import { useSiteSettings } from '../lib/useSiteSettings'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/gallery', label: 'Gallery & Offers' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { settings } = useSiteSettings()

  return (
    <header className="sticky top-0 z-40 bg-sand/90 backdrop-blur border-b border-teal-800/10">
      <div className="container-page flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          {settings.logo_url ? (
            <span className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img src={settings.logo_url} alt="Kantha Dental Care logo" className="w-full h-full object-cover" />
            </span>
          ) : (
            <span className="w-8 h-8 rounded-xl bg-teal-800 flex items-center justify-center text-gold-400 font-display font-semibold">
              K
            </span>
          )}
          <span className="font-display text-lg text-teal-900 leading-tight">Kantha Dental Care</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                'text-sm font-medium transition-colors ' +
                (isActive ? 'text-teal-800' : 'text-ink/70 hover:text-teal-800')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <a href={`tel:${clinic.phone}`} className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5">
          Call {clinic.phoneDisplay}
        </a>

        <button
          className="md:hidden p-2 text-teal-900"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-teal-800/10 bg-sand">
          <nav className="container-page flex flex-col py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  'py-3 text-base border-b border-teal-800/5 ' +
                  (isActive ? 'text-teal-800 font-medium' : 'text-ink/80')
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a href={`tel:${clinic.phone}`} className="btn-primary mt-4 mb-2">
              Call {clinic.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
