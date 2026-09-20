import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useSiteSettings } from '../lib/useSiteSettings'

async function uploadAndGetUrl(file, folder) {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('media').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}

export default function ManageSettings() {
  const { settings, loading, reload } = useSiteSettings()
  const [logoFile, setLogoFile] = useState(null)
  const [heroFile, setHeroFile] = useState(null)
  const [savingLogo, setSavingLogo] = useState(false)
  const [savingHero, setSavingHero] = useState(false)
  const [error, setError] = useState('')

  async function handleLogoSave(e) {
    e.preventDefault()
    if (!logoFile) return
    setSavingLogo(true)
    setError('')
    try {
      const logo_url = await uploadAndGetUrl(logoFile, 'branding')
      const { error: upsertError } = await supabase
        .from('site_settings')
        .upsert({ id: 1, logo_url })
      if (upsertError) throw upsertError
      setLogoFile(null)
      reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingLogo(false)
    }
  }

  async function handleHeroSave(e) {
    e.preventDefault()
    if (!heroFile) return
    setSavingHero(true)
    setError('')
    try {
      const hero_bg_url = await uploadAndGetUrl(heroFile, 'branding')
      const { error: upsertError } = await supabase
        .from('site_settings')
        .upsert({ id: 1, hero_bg_url })
      if (upsertError) throw upsertError
      setHeroFile(null)
      reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingHero(false)
    }
  }

  async function handleHeroRemove() {
    if (!confirm('Remove the hero background photo?')) return
    await supabase.from('site_settings').upsert({ id: 1, hero_bg_url: null })
    reload()
  }

  return (
    <div>
      <h1 className="text-2xl text-teal-900 mb-1">Site Settings</h1>
      <p className="text-ink/60 mb-8">Manage the logo and homepage background photo.</p>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-ink/50">Loading…</p>}

      {!loading && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Logo */}
          <div className="border border-teal-800/10 rounded-2xl p-6 bg-white/70">
            <h2 className="text-lg text-teal-900 mb-1">Logo</h2>
            <p className="text-sm text-ink/60 mb-4">
              Shown top-left of every page, next to the clinic name. It always displays as a fixed{' '}
              <strong>40 × 40px square</strong> — a square photo (ideally your clinic logo or icon)
              works best, since it will be cropped to fit that square.
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-teal-800 flex items-center justify-center text-gold-400 font-display font-semibold flex-shrink-0">
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="Current logo" className="w-full h-full object-cover" />
                ) : (
                  'K'
                )}
              </div>
              <span className="text-xs text-ink/50">
                {settings.logo_url ? 'Current logo (shown at real size)' : 'No logo uploaded — showing default "K"'}
              </span>
            </div>

            <form onSubmit={handleLogoSave} className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="text-sm"
              />
              <button type="submit" disabled={!logoFile || savingLogo} className="btn-primary text-sm px-4 py-2">
                {savingLogo ? 'Uploading…' : 'Save logo'}
              </button>
            </form>
          </div>

          {/* Hero background */}
          <div className="border border-teal-800/10 rounded-2xl p-6 bg-white/70">
            <h2 className="text-lg text-teal-900 mb-1">Homepage background photo</h2>
            <p className="text-sm text-ink/60 mb-4">
              Appears behind the homepage hero text, shown faded so the text stays easy to read.
              A wide, well-lit photo of the clinic or team works best.
            </p>

            <div className="rounded-xl overflow-hidden h-32 bg-teal-900 relative mb-4">
              {settings.hero_bg_url && (
                <img
                  src={settings.hero_bg_url}
                  alt="Current hero background"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center text-xs text-sand/70">
                {settings.hero_bg_url ? 'Current background (preview)' : 'No background photo set'}
              </div>
            </div>

            <form onSubmit={handleHeroSave} className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHeroFile(e.target.files[0])}
                className="text-sm"
              />
              <button type="submit" disabled={!heroFile || savingHero} className="btn-primary text-sm px-4 py-2">
                {savingHero ? 'Uploading…' : 'Save background'}
              </button>
              {settings.hero_bg_url && (
                <button type="button" onClick={handleHeroRemove} className="text-xs text-red-600 hover:text-red-500">
                  Remove
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
