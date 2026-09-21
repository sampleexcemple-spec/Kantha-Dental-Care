import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Reveal from '../components/Reveal'

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
        <Reveal className="container-page">
          <p className="text-gold-400 text-sm font-semibold mb-3">Gallery & Offers</p>
          <h1 className="text-2xl sm:text-3xl mb-4 text-sand">Inside the clinic, and current offers</h1>
          <p className="text-sand/80 max-w-prose">
            A look at our clinic and the latest treatment offers — updated regularly.
          </p>
        </Reveal>
      </section>

      <section className="container-page py-12">
        <h2 className="text-lg sm:text-xl text-teal-900 mb-6">Current offers</h2>
        {loading && <p className="text-ink/50">Loading…</p>}
        {!loading && offers.length === 0 && (
          <p className="text-ink/50 mb-6">No active offers right now — check back soon.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={i * 70}>
              <div className="bg-white rounded-xl overflow-hidden border border-teal-800/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                {o.image_url && (
                  <img src={o.image_url} alt={o.title} className="w-full h-44 object-cover" />
                )}
                <div className="p-5">
                  <h3 className="text-sm sm:text-base text-teal-900 mb-1">{o.title}</h3>
                  <p className="text-sm text-ink/60">{o.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <h2 className="text-lg sm:text-xl text-teal-900 mb-6">Clinic gallery</h2>
        {!loading && photos.length === 0 && (
          <p className="text-ink/50">Photos of the clinic will appear here soon.</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <div className="aspect-square rounded-xl overflow-hidden bg-teal-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <img src={p.image_url} alt={p.caption || 'Clinic photo'} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
