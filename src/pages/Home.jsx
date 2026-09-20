import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clinic, services } from '../lib/clinicInfo'
import { supabase } from '../lib/supabaseClient'
import { useSiteSettings } from '../lib/useSiteSettings'
import DoctorsGrid from '../components/DoctorsGrid'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'

export default function Home() {
  const [doctors, setDoctors] = useState([])
  const [offers, setOffers] = useState([])
  const { settings } = useSiteSettings()

  useEffect(() => {
    supabase
      .from('doctors')
      .select('*')
      .order('sort_order', { ascending: true })
      .limit(3)
      .then(({ data }) => setDoctors(data || []))

    supabase
      .from('offers')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setOffers(data || []))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-teal-900 text-sand overflow-hidden">
        {settings.hero_bg_url && (
          <img
            src={settings.hero_bg_url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/95 to-teal-900/70" />

        <div className="relative container-page grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
          <Reveal>
            <p className="text-gold-400 text-sm font-semibold tracking-wide mb-4">
              Tondiarpet, Chennai
            </p>
            <h1 className="text-4xl sm:text-5xl leading-[1.1] mb-6 text-sand">
              Dental care that puts your whole family at ease.
            </h1>
            <p className="text-sand/80 text-lg mb-8 max-w-prose">
              From routine check-ups to root canals, braces and implants — Kantha Dental Care
              brings modern treatment and honest advice to your neighbourhood.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${clinic.phone}`} className="btn-primary">Book by phone: {clinic.phoneDisplay}</a>
              <Link to="/contact" className="btn-outline">Visit the clinic</Link>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-teal-800/60 border border-teal-700 rounded-xl p-6">
                <Counter target={10} suffix="+" className="block text-3xl font-display text-gold-400 mb-1" />
                <div className="text-sm text-sand/70">Treatments offered under one roof</div>
              </div>
              <div className="bg-teal-800/60 border border-teal-700 rounded-xl p-6 mt-8">
                <Counter target={6} suffix=" days" className="block text-3xl font-display text-gold-400 mb-1" />
                <div className="text-sm text-sand/70">Open a week, evening slots available</div>
              </div>
              <div className="bg-teal-800/60 border border-teal-700 rounded-xl p-6 col-span-2">
                <div className="text-sm text-sand/70">
                  Located on Thiruvottiyur High Road — easy to find, easy to reach.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services preview */}
      <section className="container-page py-16 md:py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl mb-2">Treatments we provide</h2>
              <p className="text-ink/60 max-w-prose">
                Comprehensive dental care for every age, from prevention to restoration.
              </p>
            </div>
            <Link to="/services" className="text-teal-800 font-medium hover:text-teal-600">
              View all services →
            </Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="border border-teal-800/10 rounded-xl p-6 bg-white/60 hover:border-teal-800/30 hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-lg text-teal-900 mb-2">{s.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Offers */}
      {offers.length > 0 && (
        <section className="bg-gold-100/60 py-16 md:py-20">
          <div className="container-page">
            <Reveal>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <h2 className="text-3xl">Current offers</h2>
                <Link to="/gallery" className="text-teal-800 font-medium hover:text-teal-600">
                  See all →
                </Link>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((o, i) => (
                <Reveal key={o.id} delay={i * 70}>
                  <div className="bg-white rounded-xl overflow-hidden border border-teal-800/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    {o.image_url && (
                      <img src={o.image_url} alt={o.title} className="w-full h-44 object-cover" />
                    )}
                    <div className="p-5">
                      <h3 className="text-lg text-teal-900 mb-1">{o.title}</h3>
                      <p className="text-sm text-ink/60">{o.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Doctors preview */}
      {doctors.length > 0 && (
        <section className="container-page py-16 md:py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <h2 className="text-3xl">Meet our doctors</h2>
              <Link to="/doctors" className="text-teal-800 font-medium hover:text-teal-600">
                View all →
              </Link>
            </div>
          </Reveal>
          <DoctorsGrid doctors={doctors} />
        </section>
      )}

      {/* CTA */}
      <section className="bg-teal-950 py-16">
        <Reveal>
          <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl mb-2 text-sand">Ready to book your visit?</h2>
              <p className="text-sand/90">Call us or drop by — we're on Thiruvottiyur High Road, Tondiarpet.</p>
            </div>
            <a href={`tel:${clinic.phone}`} className="btn-primary whitespace-nowrap">
              Call {clinic.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
