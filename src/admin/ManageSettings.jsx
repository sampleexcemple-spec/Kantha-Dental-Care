import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useSiteSettings } from '../lib/useSiteSettings'
import { SOCIAL_PLATFORMS } from '../components/SocialLinks'

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
  const [form, setForm] = useState(settings)
  const [logoFile, setLogoFile] = useState(null)
  const [heroFile, setHeroFile] = useState(null)
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState('')

  useEffect(() => {
    if (!loading) setForm(settings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  function flash(section) {
    setSaved(section)
    setTimeout(() => setSaved(''), 2000)
  }

  async function saveAll(overrides = {}) {
    setError('')
    const payload = { id: 1, ...form, ...overrides }
    const { error: upsertError } = await supabase.from('site_settings').upsert(payload)
    if (upsertError) throw upsertError
    reload()
  }

  async function handleLogoSave(e) {
    e.preventDefault()
    if (!logoFile) return
    setBusy('logo')
    setError('')
    try {
      const logo_url = await uploadAndGetUrl(logoFile, 'branding')
      await saveAll({ logo_url })
      setForm((f) => ({ ...f, logo_url }))
      setLogoFile(null)
      flash('logo')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  async function handleHeroSave(e) {
    e.preventDefault()
    if (!heroFile) return
    setBusy('hero')
    setError('')
    try {
      const hero_bg_url = await uploadAndGetUrl(heroFile, 'branding')
      await saveAll({ hero_bg_url })
      setForm((f) => ({ ...f, hero_bg_url }))
      setHeroFile(null)
      flash('hero')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  async function handleHeroRemove() {
    if (!confirm('Remove the hero background photo?')) return
    setBusy('hero')
    try {
      await saveAll({ hero_bg_url: null })
      setForm((f) => ({ ...f, hero_bg_url: null }))
    } finally {
      setBusy('')
    }
  }

  async function handleOpacityCommit(value) {
    setBusy('opacity')
    try {
      await saveAll({ hero_bg_opacity: value })
    } finally {
      setBusy('')
    }
  }

  async function handleBusinessSave(e) {
    e.preventDefault()
    setBusy('business')
    setError('')
    try {
      await saveAll()
      flash('business')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  async function handleHeroTextSave(e) {
    e.preventDefault()
    setBusy('herotext')
    setError('')
    try {
      await saveAll()
      flash('herotext')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  function updateHour(index, field, value) {
    const hours = [...form.hours]
    hours[index] = { ...hours[index], [field]: value }
    setForm({ ...form, hours })
  }

  function addHourRow() {
    setForm({ ...form, hours: [...form.hours, { day: '', time: '' }] })
  }

  function removeHourRow(index) {
    setForm({ ...form, hours: form.hours.filter((_, i) => i !== index) })
  }

  async function handleHoursSave(e) {
    e.preventDefault()
    setBusy('hours')
    setError('')
    try {
      await saveAll()
      flash('hours')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  function updateSocial(index, field, value) {
    const social_links = [...form.social_links]
    social_links[index] = { ...social_links[index], [field]: value }
    setForm({ ...form, social_links })
  }

  function addSocialRow() {
    const usedPlatforms = form.social_links.map((s) => s.platform)
    const next = SOCIAL_PLATFORMS.find((p) => !usedPlatforms.includes(p.key)) || SOCIAL_PLATFORMS[0]
    setForm({ ...form, social_links: [...form.social_links, { platform: next.key, url: '' }] })
  }

  function removeSocialRow(index) {
    setForm({ ...form, social_links: form.social_links.filter((_, i) => i !== index) })
  }

  async function handleSocialsSave(e) {
    e.preventDefault()
    setBusy('socials')
    setError('')
    try {
      await saveAll()
      flash('socials')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  if (loading) {
    return <p className="text-ink/50">Loading settings…</p>
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl text-teal-900 mb-1">Site Settings</h1>
      <p className="text-ink/60 mb-8">
        Everything here updates the live website as soon as you save each section.
      </p>

      {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

      <div className="space-y-8">
        {/* Branding */}
        <section className="border border-teal-800/10 rounded-2xl p-6 bg-white/70">
          <h2 className="text-lg text-teal-900 mb-4">Branding</h2>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-ink/70 mb-1">Logo</h3>
              <p className="text-xs text-ink/50 mb-3">
                Shows top-left of every page, next to your business name. Always displayed as a
                fixed <strong>40 × 40px square</strong> — a square image works best.
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-teal-800 flex items-center justify-center text-gold-400 font-display font-semibold flex-shrink-0">
                  {form.logo_url ? (
                    <img src={form.logo_url} alt="Current logo" className="w-full h-full object-cover" />
                  ) : (
                    form.business_name?.[0] || 'K'
                  )}
                </div>
                <span className="text-xs text-ink/50">Shown at real size</span>
              </div>
              <form onSubmit={handleLogoSave} className="flex flex-col gap-2">
                <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} className="text-xs" />
                <button type="submit" disabled={!logoFile || busy === 'logo'} className="btn-primary text-xs px-4 py-2 self-start">
                  {busy === 'logo' ? 'Uploading…' : 'Save logo'}
                </button>
                {saved === 'logo' && <span className="text-xs text-teal-700">Saved ✓</span>}
              </form>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-ink/70 mb-1">Homepage background photo</h3>
              <p className="text-xs text-ink/50 mb-3">
                Appears faded behind the hero text on the homepage. Use the slider to control how
                visible it is.
              </p>
              <div className="rounded-xl overflow-hidden h-24 bg-teal-900 relative mb-3">
                {form.hero_bg_url && (
                  <img
                    src={form.hero_bg_url}
                    alt="Current hero background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: (form.hero_bg_opacity ?? 25) / 100 }}
                  />
                )}
                {!form.hero_bg_url && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-sand/70">
                    No background photo set
                  </div>
                )}
              </div>

              {form.hero_bg_url && (
                <div className="mb-3">
                  <label className="flex items-center justify-between text-xs text-ink/60 mb-1">
                    <span>Photo visibility</span>
                    <span>{form.hero_bg_opacity ?? 25}%</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={form.hero_bg_opacity ?? 25}
                    onChange={(e) => setForm({ ...form, hero_bg_opacity: Number(e.target.value) })}
                    onMouseUp={(e) => handleOpacityCommit(Number(e.target.value))}
                    onTouchEnd={(e) => handleOpacityCommit(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-[10px] text-ink/40 mt-1">Lower = more transparent, so text stays easy to read.</p>
                </div>
              )}

              <form onSubmit={handleHeroSave} className="flex flex-col gap-2">
                <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files[0])} className="text-xs" />
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={!heroFile || busy === 'hero'} className="btn-primary text-xs px-4 py-2">
                    {busy === 'hero' ? 'Uploading…' : 'Save background'}
                  </button>
                  {form.hero_bg_url && (
                    <button type="button" onClick={handleHeroRemove} className="text-xs text-red-600 hover:text-red-500">
                      Remove
                    </button>
                  )}
                </div>
                {saved === 'hero' && <span className="text-xs text-teal-700">Saved ✓</span>}
              </form>
            </div>
          </div>
        </section>

        {/* Homepage headline text */}
        <section className="border border-teal-800/10 rounded-2xl p-6 bg-white/70">
          <h2 className="text-lg text-teal-900 mb-1">Homepage headline</h2>
          <p className="text-xs text-ink/50 mb-4">The big heading and paragraph shown on the homepage hero.</p>
          <form onSubmit={handleHeroTextSave} className="space-y-3">
            <div>
              <label className="block text-xs text-ink/60 mb-1">Headline</label>
              <textarea
                rows={2}
                value={form.hero_heading}
                onChange={(e) => setForm({ ...form, hero_heading: e.target.value })}
                className="w-full border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1">Paragraph</label>
              <textarea
                rows={3}
                value={form.hero_subtext}
                onChange={(e) => setForm({ ...form, hero_subtext: e.target.value })}
                className="w-full border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" disabled={busy === 'herotext'} className="btn-primary text-xs px-4 py-2">
                {busy === 'herotext' ? 'Saving…' : 'Save headline'}
              </button>
              {saved === 'herotext' && <span className="text-xs text-teal-700">Saved ✓</span>}
            </div>
          </form>
        </section>

        {/* Business info */}
        <section className="border border-teal-800/10 rounded-2xl p-6 bg-white/70">
          <h2 className="text-lg text-teal-900 mb-4">Business info</h2>
          <form onSubmit={handleBusinessSave} className="space-y-3">
            <div>
              <label className="block text-xs text-ink/60 mb-1">Business name</label>
              <input
                required
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                className="w-full border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1">Phone number</label>
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1">Email (optional — hidden if empty)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1">Address (used for the Google Map too)</label>
              <textarea
                rows={2}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" disabled={busy === 'business'} className="btn-primary text-xs px-4 py-2">
                {busy === 'business' ? 'Saving…' : 'Save business info'}
              </button>
              {saved === 'business' && <span className="text-xs text-teal-700">Saved ✓</span>}
            </div>
          </form>
        </section>

        {/* Hours */}
        <section className="border border-teal-800/10 rounded-2xl p-6 bg-white/70">
          <h2 className="text-lg text-teal-900 mb-4">Clinic hours</h2>
          <form onSubmit={handleHoursSave} className="space-y-3">
            {form.hours.map((h, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  placeholder="e.g. Monday – Saturday"
                  value={h.day}
                  onChange={(e) => updateHour(i, 'day', e.target.value)}
                  className="flex-1 border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
                />
                <input
                  placeholder="e.g. 9:30 AM – 9:00 PM"
                  value={h.time}
                  onChange={(e) => updateHour(i, 'time', e.target.value)}
                  className="flex-1 border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
                />
                <button type="button" onClick={() => removeHourRow(i)} className="text-xs text-red-600 hover:text-red-500 px-2">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addHourRow} className="text-xs text-teal-700 hover:text-teal-600">
              + Add a row
            </button>
            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={busy === 'hours'} className="btn-primary text-xs px-4 py-2">
                {busy === 'hours' ? 'Saving…' : 'Save hours'}
              </button>
              {saved === 'hours' && <span className="text-xs text-teal-700">Saved ✓</span>}
            </div>
          </form>
        </section>

        {/* Social links */}
        <section className="border border-teal-800/10 rounded-2xl p-6 bg-white/70">
          <h2 className="text-lg text-teal-900 mb-1">Social media links</h2>
          <p className="text-xs text-ink/50 mb-4">
            Only platforms you add here will show up on the website — leave a platform out and it
            simply won't appear.
          </p>
          <form onSubmit={handleSocialsSave} className="space-y-3">
            {form.social_links.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <select
                  value={s.platform}
                  onChange={(e) => updateSocial(i, 'platform', e.target.value)}
                  className="border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
                >
                  {SOCIAL_PLATFORMS.map((p) => (
                    <option key={p.key} value={p.key}>{p.label}</option>
                  ))}
                </select>
                <input
                  placeholder="Profile URL"
                  value={s.url}
                  onChange={(e) => updateSocial(i, 'url', e.target.value)}
                  className="flex-1 border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
                />
                <button type="button" onClick={() => removeSocialRow(i)} className="text-xs text-red-600 hover:text-red-500 px-2">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addSocialRow} className="text-xs text-teal-700 hover:text-teal-600">
              + Add a platform
            </button>
            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={busy === 'socials'} className="btn-primary text-xs px-4 py-2">
                {busy === 'socials' ? 'Saving…' : 'Save social links'}
              </button>
              {saved === 'socials' && <span className="text-xs text-teal-700">Saved ✓</span>}
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
