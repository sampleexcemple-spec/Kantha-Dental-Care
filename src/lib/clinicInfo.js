export const clinic = {
  name: 'Kantha Dental Care',
  phone: '07299044555',
  phoneDisplay: '072990 44555',
  addressLines: [
    'No. 1/1A, 4th Lane, Thiruvottiyur High Rd,',
    'Tondiarpet, Chennai, Tamil Nadu 600081'
  ],
  addressOneLine:
    'No. 1/1A, 4th Lane, Thiruvottiyur High Rd, Tondiarpet, Chennai, Tamil Nadu 600081',
  hours: [
    { day: 'Monday – Saturday', time: '9:30 AM – 1:30 PM & 5:00 PM – 9:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 1:00 PM (By appointment)' }
  ],
  mapEmbedSrc:
    'https://www.google.com/maps?q=' +
    encodeURIComponent(
      'No. 1/1A, 4th Lane, Thiruvottiyur High Rd, Tondiarpet, Chennai, Tamil Nadu 600081'
    ) +
    '&output=embed',
  mapLink:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'No. 1/1A, 4th Lane, Thiruvottiyur High Rd, Tondiarpet, Chennai, Tamil Nadu 600081'
    )
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
