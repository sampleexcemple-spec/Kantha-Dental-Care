import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const emptyForm = { id: null, name: '', qualification: '', specialty: '', bio: '', sort_order: 0 }

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function loadDoctors() {
    const { data } = await supabase.from('doctors').select('*').order('sort_order', { ascending: true })
    setDoctors(data || [])
  }

  useEffect(() => {
    loadDoctors()
  }, [])

  function startEdit(doctor) {
    setForm({
      id: doctor.id,
      name: doctor.name || '',
      qualification: doctor.qualification || '',
      specialty: doctor.specialty || '',
      bio: doctor.bio || '',
      sort_order: doctor.sort_order || 0
    })
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
      let photo_url
      if (file) {
        const ext = file.name.split('.').pop()
        const path = `doctors/${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
          cacheControl: '3600',
          upsert: false
        })
        if (uploadError) throw uploadError
        const { data: publicUrl } = supabase.storage.from('media').getPublicUrl(path)
        photo_url = publicUrl.publicUrl
      }

      const payload = {
        name: form.name,
        qualification: form.qualification,
        specialty: form.specialty,
        bio: form.bio,
        sort_order: Number(form.sort_order) || 0,
        ...(photo_url ? { photo_url } : {})
      }

      if (form.id) {
        const { error: updateError } = await supabase.from('doctors').update(payload).eq('id', form.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from('doctors').insert(payload)
        if (insertError) throw insertError
      }

      resetForm()
      loadDoctors()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Remove this doctor profile?')) return
    await supabase.from('doctors').delete().eq('id', id)
    loadDoctors()
  }

  return (
    <div>
      <h1 className="text-2xl text-teal-900 mb-1">Doctors</h1>
      <p className="text-ink/60 mb-8">Add or update doctor profiles shown on the public site.</p>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <div className="grid sm:grid-cols-2 gap-4">
            {doctors.map((d) => (
              <div key={d.id} className="border border-teal-800/10 rounded-sm p-4 bg-white/60 flex gap-4">
                <div className="w-16 h-16 rounded-sm bg-teal-100 overflow-hidden flex-shrink-0">
                  {d.photo_url && <img src={d.photo_url} alt={d.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-teal-900">{d.name}</div>
                  <div className="text-xs text-ink/50">{d.specialty}</div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => startEdit(d)} className="text-xs text-teal-700 hover:text-teal-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(d.id)} className="text-xs text-red-600 hover:text-red-500">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {doctors.length === 0 && <p className="text-ink/50 text-sm">No doctors added yet.</p>}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border border-teal-800/10 rounded-sm p-5 bg-white/70 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-teal-900 mb-2">
            {form.id ? 'Edit doctor' : 'Add a doctor'}
          </h2>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Full name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-teal-800/20 rounded-sm px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Qualification (e.g. BDS, MDS)</label>
            <input
              value={form.qualification}
              onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              className="w-full border border-teal-800/20 rounded-sm px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Specialty</label>
            <input
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              className="w-full border border-teal-800/20 rounded-sm px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Short bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full border border-teal-800/20 rounded-sm px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Display order (0 first)</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              className="w-full border border-teal-800/20 rounded-sm px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-ink/60 mb-1">Photo</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={saving} className="btn-primary text-sm px-4 py-2">
              {saving ? 'Saving…' : form.id ? 'Update' : 'Add doctor'}
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
