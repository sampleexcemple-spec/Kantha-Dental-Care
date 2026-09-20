import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const emptyForm = { id: null, title: '', description: '', active: true }

export default function ManageOffers() {
  const [offers, setOffers] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function loadOffers() {
    const { data } = await supabase.from('offers').select('*').order('created_at', { ascending: false })
    setOffers(data || [])
  }

  useEffect(() => {
    loadOffers()
  }, [])

  function startEdit(offer) {
    setForm({ id: offer.id, title: offer.title, description: offer.description || '', active: offer.active })
    setFile(null)
  }

  function resetForm() {
    setForm(emptyForm)
    setFile(null)
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      let image_url
      if (file) {
        const ext = file.name.split('.').pop()
        const path = `offers/${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage.from('media').upload(path, file)
        if (uploadError) throw uploadError
        const { data: publicUrl } = supabase.storage.from('media').getPublicUrl(path)
        image_url = publicUrl.publicUrl
      }

      const payload = {
        title: form.title,
        description: form.description,
        active: form.active,
        ...(image_url ? { image_url } : {})
      }

      if (form.id) {
        const { error: updateError } = await supabase.from('offers').update(payload).eq('id', form.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from('offers').insert(payload)
        if (insertError) throw insertError
      }

      resetForm()
      loadOffers()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this offer?')) return
    await supabase.from('offers').delete().eq('id', id)
    loadOffers()
  }

  async function toggleActive(offer) {
    await supabase.from('offers').update({ active: !offer.active }).eq('id', offer.id)
    loadOffers()
  }

  return (
    <div>
      <h1 className="text-2xl text-teal-900 mb-1">Offers</h1>
      <p className="text-ink/60 mb-8">Create and manage offers shown on the homepage and gallery page.</p>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {offers.map((o) => (
            <div key={o.id} className="border border-teal-800/10 rounded-sm bg-white/60 overflow-hidden">
              {o.image_url && <img src={o.image_url} alt={o.title} className="w-full h-32 object-cover" />}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-teal-900">{o.title}</div>
                  <span className={'text-xs px-2 py-0.5 rounded-sm ' + (o.active ? 'bg-teal-100 text-teal-800' : 'bg-ink/5 text-ink/40')}>
                    {o.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="text-xs text-ink/50 mb-3">{o.description}</p>
                <div className="flex gap-3 text-xs">
                  <button onClick={() => startEdit(o)} className="text-teal-700 hover:text-teal-600">Edit</button>
                  <button onClick={() => toggleActive(o)} className="text-gold-600 hover:text-gold-500">
                    {o.active ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleDelete(o.id)} className="text-red-600 hover:text-red-500">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {offers.length === 0 && <p className="text-ink/50 text-sm">No offers yet.</p>}
        </div>

        <form onSubmit={handleSubmit} className="border border-teal-800/10 rounded-sm p-5 bg-white/70 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-teal-900 mb-2">
            {form.id ? 'Edit offer' : 'Add an offer'}
          </h2>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-teal-800/20 rounded-sm px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-teal-800/20 rounded-sm px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Offer image</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Show on website
          </label>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={saving} className="btn-primary text-sm px-4 py-2">
              {saving ? 'Saving…' : form.id ? 'Update' : 'Add offer'}
            </button>
            {form.id && (
              <button type="button" onClick={resetForm} className="btn-secondary text-sm px-4 py-2">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
