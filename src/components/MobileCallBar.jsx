import { useSiteSettings } from '../lib/useSiteSettings'
import { mapLink } from '../lib/clinicInfo'
import { PhoneIcon, PinIcon } from './icons'

export default function MobileCallBar() {
  const { settings } = useSiteSettings()

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-teal-900 border-t border-teal-800 flex">
      <a
        href={`tel:${settings.phone}`}
        className="flex-1 flex items-center justify-center gap-2 py-3 text-sand text-sm font-semibold"
      >
        <PhoneIcon className="w-4 h-4" />
        Call Now
      </a>
      <a
        href={mapLink(settings.address)}
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3 text-gold-400 text-sm font-semibold border-l border-teal-800"
      >
        <PinIcon className="w-4 h-4" />
        Directions
      </a>
    </div>
  )
}
