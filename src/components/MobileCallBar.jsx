import { clinic } from '../lib/clinicInfo'

export default function MobileCallBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-teal-900 border-t border-teal-800 flex">
      <a
        href={`tel:${clinic.phone}`}
        className="flex-1 flex items-center justify-center gap-2 py-3 text-sand text-sm font-semibold"
      >
        Call Now
      </a>
      <a
        href={clinic.mapLink}
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3 text-gold-400 text-sm font-semibold border-l border-teal-800"
      >
        Directions
      </a>
    </div>
  )
}
