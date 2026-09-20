import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Gallery() {
  const [offers, setOffers] = useState([])
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('offers').select('*').eq('active', true).order('created_at', { ascending: false }),
      supabase.from('gallery_photos').select('*').order('created_at', { ascending: false })
    ]).then(([offersRes, photosRes]) => {
      setOffers(offersRes.data || [])
      setPhotos(photosRes.data || [])
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <section className="bg-teal-900 text-sand py-14">
        <div className="container-page">
          <p className="text-gold-400 text-sm font-semibold mb-3">Gallery & Offers</p>
          <h1 className="text-4xl mb-4">Inside the clinic, and current offers</h1>
          <p className="text-sand/70 max-w-prose">
            A look at our clinic and the latest treatment offers — updated regularly.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-2xl text-teal-900 mb-6">Current offers</h2>
        {loading && <p className="text-ink/50">Loading…</p>}
        {!loading && offers.length === 0 && (
          <p className="text-ink/50 mb-10">No active offers right now — check back soon.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {offers.map((o) => (
            <div key={o.id} className="bg-white rounded-sm overflow-hidden border border-teal-800/10">
              {o.image_url && (
                <img src={o.image_url} alt={o.title} className="w-full h-44 object-cover" />
              )}
              <div className="p-5">
                <h3 className="text-lg text-teal-900 mb-1">{o.title}</h3>
                <p className="text-sm text-ink/60">{o.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl text-teal-900 mb-6">Clinic gallery</h2>
        {!loading && photos.length === 0 && (
          <p className="text-ink/50">Photos of the clinic will appear here soon.</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((p) => (
            <div key={p.id} className="aspect-square rounded-sm overflow-hidden bg-teal-100">
              <img src={p.image_url} alt={p.caption || 'Clinic photo'} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
