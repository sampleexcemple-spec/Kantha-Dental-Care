import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [counts, setCounts] = useState({ doctors: 0, offers: 0, photos: 0 })

  useEffect(() => {
    async function load() {
      const [d, o, p] = await Promise.all([
        supabase.from('doctors').select('id', { count: 'exact', head: true }),
        supabase.from('offers').select('id', { count: 'exact', head: true }),
        supabase.from('gallery_photos').select('id', { count: 'exact', head: true })
      ])
      setCounts({
        doctors: d.count || 0,
        offers: o.count || 0,
        photos: p.count || 0
      })
    }
    load()
  }, [])

  const cards = [
    { label: 'Doctor profiles', value: counts.doctors, to: '/admin/doctors' },
    { label: 'Offers', value: counts.offers, to: '/admin/offers' },
    { label: 'Gallery photos', value: counts.photos, to: '/admin/gallery' }
  ]

  return (
    <div>
      <h1 className="text-2xl text-teal-900 mb-1">Welcome back</h1>
      <p className="text-ink/60 mb-8">Manage what appears on the public Kantha Dental Care website.</p>

      <div className="grid sm:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="border border-teal-800/10 rounded-sm p-6 bg-white/60 hover:border-teal-800/30 transition-colors"
          >
            <div className="text-3xl font-display text-teal-900 mb-1">{c.value}</div>
            <div className="text-sm text-ink/60">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
