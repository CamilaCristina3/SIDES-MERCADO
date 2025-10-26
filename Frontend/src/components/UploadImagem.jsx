import React, { useState } from 'react'
import { apiFetch } from '@/lib/api'

export default function UploadImagem({ onUpload }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function enviar() {
    setError('')
    if (!file) return setError('Selecione uma imagem primeiro.')
    const token = localStorage.getItem('authToken')
    if (!token) return setError('Necessário iniciar sessão (admin).')
    try {
      setLoading(true)
      const fd = new FormData()
      fd.append('image', file)
      const resp = await apiFetch('/uploads/image', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      const data = await resp.json()
      if (!resp.ok || !data?.success) throw new Error(data?.message || 'Falha no upload')
      onUpload?.(data.url)
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="icon-btn" type="button" onClick={enviar} disabled={loading}>
        {loading ? 'A enviar...' : 'Enviar Imagem'}
      </button>
      {error && <div style={{ color: '#b91c1c', fontSize: 14 }}>{error}</div>}
    </div>
  )
}
