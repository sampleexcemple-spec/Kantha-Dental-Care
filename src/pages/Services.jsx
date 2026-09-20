import { services, clinic } from '../lib/clinicInfo'

export default function Services() {
  return (
    <div>
      <section className="bg-teal-900 text-sand py-14">
        <div className="container-page">
          <p className="text-gold-400 text-sm font-semibold mb-3">Our Services</p>
          <h1 className="text-4xl mb-4">Dental care for every stage of life</h1>
          <p className="text-sand/70 max-w-prose">
            Every treatment is carried out with modern sterilisation standards and clear
            explanations, so you always know what to expect.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="border border-teal-800/10 rounded-sm p-6 bg-white/60">
              <h2 className="text-lg text-teal-900 mb-2">{s.title}</h2>
              <p className="text-sm text-ink/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-gold-100/60 rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl text-teal-900 mb-1">Not sure which treatment you need?</h2>
            <p className="text-ink/60">Call us and describe your concern — we'll guide you to the right care.</p>
          </div>
          <a href={`tel:${clinic.phone}`} className="btn-primary whitespace-nowrap">
            Call {clinic.phoneDisplay}
          </a>
        </div>
      </section>
    </div>
  )
}
