import { services } from '../lib/clinicInfo'
import { useSiteSettings } from '../lib/useSiteSettings'
import Reveal from '../components/Reveal'
import ServicesGrid from '../components/ServicesGrid'
import { PhoneIcon } from '../components/icons'

export default function Services() {
  const { settings } = useSiteSettings()

  return (
    <div>
      <section className="bg-teal-900 text-sand py-14">
        <Reveal className="container-page">
          <p className="text-gold-400 text-sm font-semibold mb-3">Our Services</p>
          <h1 className="text-2xl sm:text-3xl mb-4 text-sand">Dental care for every stage of life</h1>
          <p className="text-sand/80 max-w-prose">
            Every treatment is carried out with modern sterilisation standards and clear
            explanations, so you always know what to expect.
          </p>
        </Reveal>
      </section>

      <section className="container-page py-12">
        <ServicesGrid services={services} />

        <Reveal>
          <div className="mt-14 bg-gold-100/60 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-lg sm:text-xl text-teal-900 mb-1">Not sure which treatment you need?</h2>
              <p className="text-ink/60">Call us and describe your concern — we'll guide you to the right care.</p>
            </div>
            <a href={`tel:${settings.phone}`} className="btn-primary whitespace-nowrap inline-flex items-center gap-2">
              <PhoneIcon className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
