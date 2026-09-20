import { clinic } from '../lib/clinicInfo'

export default function Footer() {
  return (
    <footer className="bg-teal-950 text-sand/80 mt-24">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <div className="font-display text-xl text-sand mb-3">Kantha Dental Care</div>
          <p className="text-sm leading-relaxed text-sand/60">
            Family-focused dental care in Tondiarpet, Chennai — modern treatment, honest advice.
          </p>
        </div>
        <div>
          <div className="text-sand text-sm font-semibold mb-3">Visit us</div>
          <p className="text-sm text-sand/70 leading-relaxed">
            {clinic.addressLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
        </div>
        <div>
          <div className="text-sand text-sm font-semibold mb-3">Contact</div>
          <a href={`tel:${clinic.phone}`} className="block text-sm text-gold-400 hover:text-gold-500 mb-2">
            {clinic.phoneDisplay}
          </a>
          <a href={clinic.mapLink} target="_blank" rel="noreferrer" className="block text-sm text-sand/70 hover:text-sand">
            Get directions →
          </a>
        </div>
      </div>
      <div className="border-t border-sand/10">
        <div className="container-page py-5 text-center text-xs text-sand/40">
          © {new Date().getFullYear()} Kantha Dental Care. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
