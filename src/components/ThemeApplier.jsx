import { useEffect } from 'react'
import { useSiteSettings } from '../lib/useSiteSettings'

export default function ThemeApplier() {
  const { settings, loading } = useSiteSettings()

  useEffect(() => {
    if (loading) return
    document.documentElement.setAttribute('data-theme', settings.theme || 'classic')
  }, [settings.theme, loading])

  return null
}
