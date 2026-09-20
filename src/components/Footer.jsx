import { useSiteSettings } from '../lib/useSiteSettings'
import { mapLink } from '../lib/clinicInfo'
import { PhoneIcon, MailIcon } from './icons'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const { settings } = useSiteSettings()

  return (
    <footer className="bg-teal-950 text-sand/80 mt-24">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <div className="font-display text-xl text-sand mb-3">{settings.business_name}</div>
          <p className="text-sm leading-relaxed text-sand/60 mb-5">
            Family-focused dental care — modern treatment, honest advice.
          </p>
          <SocialLinks links={settings.social_links} />
        </div>
        <div>
          <div className="text-sand text-sm font-semibold mb-3">Visit us</div>
          <p className="text-sm text-sand/70 leading-relaxed">{settings.address}</p>
        </div>
        <div>
          <div className="text-sand text-sm font-semibold mb-3">Contact</div>
          <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-500 mb-2">
            <PhoneIcon className="w-4 h-4" />
            {settings.phone}
          </a>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-sand/70 hover:text-sand mb-2">
              <MailIcon className="w-4 h-4" />
              {settings.email}
            </a>
          )}
          <a href={mapLink(settings.address)} target="_blank" rel="noreferrer" className="block text-sm text-sand/70 hover:text-sand mt-1">
            Get directions →
          </a>
        </div>
      </div>
      <div className="border-t border-sand/10">
        <div className="container-page py-5 text-center text-xs text-sand/40">
          © {new Date().getFullYear()} {settings.business_name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
