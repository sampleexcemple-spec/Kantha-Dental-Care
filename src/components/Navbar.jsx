import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSiteSettings } from '../lib/useSiteSettings'
import { PhoneIcon } from './icons'

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
        <NavLink to="/" className="flex items-center gap-2 min-w-0" onClick={() => setOpen(false)}>
          {settings.logo_url ? (
            <span className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img src={settings.logo_url} alt={`${settings.business_name} logo`} className="w-full h-full object-cover" />
            </span>
          ) : (
            <span className="w-8 h-8 rounded-xl bg-teal-800 flex items-center justify-center text-gold-400 font-display font-semibold flex-shrink-0">
              {settings.business_name?.[0] || 'K'}
            </span>
          )}
          <span className="font-display text-lg text-teal-900 leading-tight truncate">
            {settings.business_name}
          </span>
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

        <a
          href={`tel:${settings.phone}`}
          aria-label={`Call ${settings.business_name}`}
          title="Call us"
          className="hidden md:inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gold-500 text-teal-950 hover:bg-gold-400 transition-colors"
        >
          <PhoneIcon className="w-5 h-5" />
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
            <a
              href={`tel:${settings.phone}`}
              className="btn-primary mt-4 mb-2 inline-flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-4 h-4" />
              Call us
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
