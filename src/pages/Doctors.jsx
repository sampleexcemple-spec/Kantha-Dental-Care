import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import DoctorCard from '../components/DoctorCard'

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('doctors')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setDoctors(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <section className="bg-teal-900 text-sand py-14">
        <div className="container-page">
          <p className="text-gold-400 text-sm font-semibold mb-3">Our Team</p>
          <h1 className="text-4xl mb-4">Meet the doctors</h1>
          <p className="text-sand/70 max-w-prose">
            Experienced, approachable dentists who take the time to explain every treatment.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        {loading && <p className="text-ink/50">Loading doctor profiles…</p>}
        {!loading && doctors.length === 0 && (
          <p className="text-ink/50">Doctor profiles will appear here once added by the clinic admin.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      </section>
    </div>
  )
}
