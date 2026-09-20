import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

const defaultSettings = {
  logo_url: null,
  hero_bg_url: null
}

export function useSiteSettings() {
  const [settings, setSettings] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
    setSettings(data || defaultSettings)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return { settings, loading, reload: load }
}
