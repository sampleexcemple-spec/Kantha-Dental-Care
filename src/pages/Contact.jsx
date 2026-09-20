import { clinic } from '../lib/clinicInfo'
import Reveal from '../components/Reveal'

export default function Contact() {
  return (
    <div>
      <section className="bg-teal-900 text-sand py-14">
        <Reveal className="container-page">
          <p className="text-gold-400 text-sm font-semibold mb-3">Contact & Location</p>
          <h1 className="text-4xl mb-4 text-sand">Visit Kantha Dental Care</h1>
          <p className="text-sand/80 max-w-prose">
            Easy to reach on Thiruvottiyur High Road — call ahead or walk in during clinic hours.
          </p>
        </Reveal>
      </section>

      <section className="container-page py-16 grid md:grid-cols-2 gap-10">
        <Reveal>
          <div className="mb-8">
            <h2 className="text-xl text-teal-900 mb-2">Address</h2>
            <p className="text-ink/70 leading-relaxed">
              {clinic.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl text-teal-900 mb-2">Phone</h2>
            <a href={`tel:${clinic.phone}`} className="text-teal-700 text-lg hover:text-teal-600">
              {clinic.phoneDisplay}
            </a>
          </div>

          <div className="mb-8">
            <h2 className="text-xl text-teal-900 mb-2">Clinic hours</h2>
            <ul className="text-ink/70 space-y-1">
              {clinic.hours.map((h) => (
                <li key={h.day} className="flex justify-between max-w-sm border-b border-teal-800/10 py-2">
                  <span>{h.day}</span>
                  <span className="text-ink/60">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <a href={`tel:${clinic.phone}`} className="btn-secondary">
            Call to book an appointment
          </a>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-xl overflow-hidden border border-teal-800/10 h-80 md:h-full min-h-[320px]">
            <iframe
              title="Kantha Dental Care location"
              src={clinic.mapEmbedSrc}
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={clinic.mapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-sm text-teal-700 hover:text-teal-600"
          >
            Open in Google Maps →
          </a>
        </Reveal>
      </section>
    </div>
  )
}
