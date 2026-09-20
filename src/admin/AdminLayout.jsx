import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/doctors', label: 'Doctors' },
  { to: '/admin/offers', label: 'Offers' },
  { to: '/admin/gallery', label: 'Gallery Photos' },
  { to: '/admin/settings', label: 'Site Settings' }
]

export default function AdminLayout() {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-sand">
      <header className="bg-teal-950 text-sand">
        <div className="container-page flex items-center justify-between h-16">
          <span className="font-display text-lg">Kantha Dental — Admin</span>
          <div className="flex items-center gap-4">
            <NavLink to="/" className="text-sm text-sand/60 hover:text-sand">View site</NavLink>
            <button onClick={handleLogout} className="text-sm text-gold-400 hover:text-gold-500">
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="container-page py-10 grid md:grid-cols-[200px_1fr] gap-8">
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                'px-4 py-2 rounded-xl text-sm whitespace-nowrap ' +
                (isActive ? 'bg-teal-800 text-sand' : 'text-ink/70 hover:bg-teal-800/10')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
