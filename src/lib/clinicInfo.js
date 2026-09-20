// Fallback defaults, used only until the admin sets real values in Site Settings
// (or if the site_settings row hasn't been created in Supabase yet).
export const defaultClinic = {
  business_name: 'Kantha Dental Care',
  phone: '07299044555',
  email: '',
  address: 'No. 1/1A, 4th Lane, Thiruvottiyur High Rd, Tondiarpet, Chennai, Tamil Nadu 600081',
  hours: [
    { day: 'Monday – Saturday', time: '9:30 AM – 1:30 PM & 5:00 PM – 9:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 1:00 PM (By appointment)' }
  ],
  social_links: [],
  logo_url: null,
  hero_bg_url: null,
  hero_bg_opacity: 25,
  hero_heading: 'Dental care that puts your whole family at ease.',
  hero_subtext:
    'From routine check-ups to root canals, braces and implants — we bring modern treatment and honest advice to your neighbourhood.'
}

export function formatPhoneDisplay(phone) {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`
  return phone
}

export function mapEmbedSrc(address) {
  return 'https://www.google.com/maps?q=' + encodeURIComponent(address || '') + '&output=embed'
}

export function mapLink(address) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address || '')
}

export const services = [
  {
    title: 'General & Family Dentistry',
    desc: 'Routine check-ups, cleaning and preventive care for every age in the family.'
  },
  {
    title: 'Root Canal Treatment',
    desc: 'Painless, single-sitting RCT options to save infected or damaged teeth.'
  },
  {
    title: 'Braces & Orthodontics',
    desc: 'Metal, ceramic and clear aligner options to straighten teeth at any age.'
  },
  {
    title: 'Teeth Whitening',
    desc: 'Safe, clinically supervised whitening for a brighter, confident smile.'
  },
  {
    title: 'Dental Implants',
    desc: 'Permanent, natural-looking replacements for missing teeth.'
  },
  {
    title: 'Crowns & Bridges',
    desc: 'Durable restorations that protect weak teeth and close gaps.'
  },
  {
    title: 'Pediatric Dentistry',
    desc: 'Gentle, child-friendly dental care that builds healthy habits early.'
  },
  {
    title: 'Cosmetic Dentistry',
    desc: 'Veneers, smile design and shaping to enhance your natural smile.'
  },
  {
    title: 'Tooth Extraction & Surgery',
    desc: 'Safe removal of damaged or wisdom teeth with minimal discomfort.'
  },
  {
    title: 'Scaling & Polishing',
    desc: 'Deep cleaning that removes plaque and tartar for healthier gums.'
  }
]
