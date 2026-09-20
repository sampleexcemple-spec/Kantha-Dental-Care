import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { defaultClinic } from './clinicInfo'

export function useSiteSettings() {
  const [settings, setSettings] = useState(defaultClinic)
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
    if (data) {
      setSettings({
        business_name: data.business_name || defaultClinic.business_name,
        phone: data.phone || defaultClinic.phone,
        email: data.email || '',
        address: data.address || defaultClinic.address,
        hours: data.hours && data.hours.length ? data.hours : defaultClinic.hours,
        social_links: data.social_links || [],
        logo_url: data.logo_url || null,
        hero_bg_url: data.hero_bg_url || null,
        hero_bg_opacity: data.hero_bg_opacity ?? defaultClinic.hero_bg_opacity,
        hero_heading: data.hero_heading || defaultClinic.hero_heading,
        hero_subtext: data.hero_subtext || defaultClinic.hero_subtext
      })
    } else {
      setSettings(defaultClinic)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return { settings, loading, reload: load }
}
