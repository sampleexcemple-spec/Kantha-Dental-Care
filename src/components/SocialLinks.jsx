const PLATFORM_LABELS = {
  instagram: 'IG',
  facebook: 'FB',
  twitter: 'X',
  linkedin: 'in',
  youtube: 'YT',
  whatsapp: 'WA'
}

export const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'twitter', label: 'Twitter / X' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'whatsapp', label: 'WhatsApp' }
]

export default function SocialLinks({ links = [], className = '', variant = 'dark' }) {
  const valid = links.filter((l) => l.url)
  if (valid.length === 0) return null

  const styles =
    variant === 'light'
      ? 'bg-teal-800/5 border border-teal-800/15 text-teal-800/80 hover:bg-teal-800 hover:text-sand hover:border-teal-800'
      : 'bg-sand/10 border border-sand/20 text-sand/80 hover:bg-gold-500 hover:text-teal-950 hover:border-gold-500'

  return (
    <div className={'flex flex-wrap gap-2 ' + className}>
      {valid.map((l) => (
        <a
          key={l.platform}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          aria-label={l.platform}
          className={
            'w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-semibold tracking-tight transition-colors duration-200 ' +
            styles
          }
        >
          {PLATFORM_LABELS[l.platform] || l.platform?.slice(0, 2).toUpperCase()}
        </a>
      ))}
    </div>
  )
}
