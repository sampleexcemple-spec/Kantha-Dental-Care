import { useSiteSettings } from '../lib/useSiteSettings'
import { mapEmbedSrc, mapLink } from '../lib/clinicInfo'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import { PhoneIcon, MailIcon } from '../components/icons'

export default function Contact() {
  const { settings } = useSiteSettings()

  return (
    <div>
      <section className="bg-teal-900 text-sand py-14">
        <Reveal className="container-page">
          <p className="text-gold-400 text-sm font-semibold mb-3">Contact & Location</p>
          <h1 className="text-2xl sm:text-3xl mb-4 text-sand">Visit {settings.business_name}</h1>
          <p className="text-sand/80 max-w-prose">
            Call ahead or walk in during clinic hours — we're easy to find.
          </p>
        </Reveal>
      </section>

      <section className="container-page py-12 grid md:grid-cols-2 gap-10">
        <Reveal>
          <div className="mb-8">
            <h2 className="text-lg text-teal-900 mb-2">Address</h2>
            <p className="text-ink/70 leading-relaxed">{settings.address}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg text-teal-900 mb-2">Phone</h2>
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-teal-700 text-sm sm:text-base hover:text-teal-600">
              <PhoneIcon className="w-5 h-5" />
              {settings.phone}
            </a>
          </div>

          {settings.email && (
            <div className="mb-8">
              <h2 className="text-lg text-teal-900 mb-2">Email</h2>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-teal-700 text-sm sm:text-base hover:text-teal-600">
                <MailIcon className="w-5 h-5" />
                {settings.email}
              </a>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-lg text-teal-900 mb-2">Clinic hours</h2>
            <ul className="text-ink/70 space-y-1">
              {settings.hours.map((h) => (
                <li key={h.day} className="flex justify-between max-w-sm border-b border-teal-800/10 py-2">
                  <span>{h.day}</span>
                  <span className="text-ink/60">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {settings.social_links?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg text-teal-900 mb-3">Follow us</h2>
              <SocialLinks links={settings.social_links} variant="light" />
            </div>
          )}

          <a href={`tel:${settings.phone}`} className="btn-secondary">
            Call to book an appointment
          </a>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-xl overflow-hidden border border-teal-800/10 h-80 md:h-full min-h-[320px]">
            <iframe
              title={`${settings.business_name} location`}
              src={mapEmbedSrc(settings.address)}
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={mapLink(settings.address)}
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
