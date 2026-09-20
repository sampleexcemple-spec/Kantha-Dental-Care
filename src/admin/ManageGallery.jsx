import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ManageGallery() {
  const [photos, setPhotos] = useState([])
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function loadPhotos() {
    const { data } = await supabase.from('gallery_photos').select('*').order('created_at', { ascending: false })
    setPhotos(data || [])
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const ext = file.name.split('.').pop()
      const path = `gallery/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('media').upload(path, file)
      if (uploadError) throw uploadError
      const { data: publicUrl } = supabase.storage.from('media').getPublicUrl(path)

      const { error: insertError } = await supabase
        .from('gallery_photos')
        .insert({ image_url: publicUrl.publicUrl, caption })
      if (insertError) throw insertError

      setFile(null)
      setCaption('')
      document.getElementById('gallery-file-input').value = ''
      loadPhotos()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this photo?')) return
    await supabase.from('gallery_photos').delete().eq('id', id)
    loadPhotos()
  }

  return (
    <div>
      <h1 className="text-2xl text-teal-900 mb-1">Gallery Photos</h1>
      <p className="text-ink/60 mb-8">Upload clinic photos shown on the public gallery page.</p>

      <form onSubmit={handleUpload} className="border border-teal-800/10 rounded-xl p-5 bg-white/70 mb-8 max-w-md space-y-3">
        <div>
          <label className="block text-xs text-ink/60 mb-1">Photo</label>
          <input
            id="gallery-file-input"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-ink/60 mb-1">Caption (optional)</label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border border-teal-800/20 rounded-xl px-3 py-2 text-sm"
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button type="submit" disabled={uploading} className="btn-primary text-sm px-4 py-2">
          {uploading ? 'Uploading…' : 'Upload photo'}
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((p) => (
          <div key={p.id} className="relative group">
            <div className="aspect-square rounded-xl overflow-hidden bg-teal-100">
              <img src={p.image_url} alt={p.caption || 'Gallery photo'} className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="absolute top-2 right-2 bg-white/90 text-red-600 text-xs px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Delete
            </button>
          </div>
        ))}
        {photos.length === 0 && <p className="text-ink/50 text-sm col-span-full">No photos uploaded yet.</p>}
      </div>
    </div>
  )
}
