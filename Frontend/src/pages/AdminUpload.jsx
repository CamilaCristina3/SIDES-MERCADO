import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function AdminUpload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [token, setToken] = useState('')
  const [remember, setRemember] = useState(true)
  const [status, setStatus] = useState('idle') // idle | uploading | done | error
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('authToken') || localStorage.getItem('token')
    if (saved) setToken(saved)
  }, [])

  useEffect(() => {
    if (!file) return setPreview('')
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return alert('Selecione uma imagem primeiro.')
    if (!token) return alert('Informe o token de administrador.')
    setStatus('uploading')
    setResult(null)
    try {
      const form = new FormData()
      form.append('image', file)
      const resp = await fetch('/api/uploads/image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data?.message || 'Falha no upload')
      setResult(data)
      setStatus('done')
      if (remember) localStorage.setItem('authToken', token)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setResult({ error: String(err.message || err) })
    }
  }

  function resetForm() {
    setFile(null)
    setPreview('')
    setResult(null)
    setStatus('idle')
    inputRef.current?.value && (inputRef.current.value = '')
  }

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 800, display: 'grid', gap: 16 }}>
        <h2>Admin: Upload de Imagens</h2>
        <p>Envie imagens para a pasta segura de uploads. Apenas administradores com token válido.</p>
        <div style={{ fontSize: 14 }}>
          Precisa iniciar sessão? <a href="/admin/login">Ir para login</a>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 16, borderRadius: 10, boxShadow: 'var(--shadow-sm)', display: 'grid', gap: 12 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Token de Admin (Bearer):</span>
            <input
              type="password"
              placeholder="Cole o seu token JWT"
              value={token}
              onChange={e => setToken(e.target.value)}
              style={{ padding: '8px 12px' }}
            />
            <label style={{ fontSize: 14, color: '#6b7280' }}>
              <input type="checkbox" checked={remember} onChange={() => setRemember(v => !v)} /> Lembrar token neste navegador
            </label>
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span>Imagem:</span>
            <input ref={inputRef} type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
          </label>

          {preview && (
            <div style={{ display: 'grid', gap: 8 }}>
              <strong>Pré-visualização:</strong>
              <img src={preview} alt="Pré-visualização" style={{ maxWidth: '100%', borderRadius: 8, boxShadow: 'var(--shadow-sm)' }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" disabled={status==='uploading'} className="icon-btn">
              {status==='uploading' ? 'A enviar...' : 'Enviar Imagem'}
            </button>
            <button type="button" onClick={resetForm} className="ghost-button">Limpar</button>
          </div>
        </form>

        {status==='done' && result?.url && (
          <div style={{ background: '#ecfdf5', border: '1px solid #10b98133', padding: 12, borderRadius: 10 }}>
            <div><strong>Upload concluído!</strong></div>
            <div>URL: <code>{result.url}</code></div>
            <div style={{ marginTop: 8 }}>
              <a className="icon-btn" href={result.url} target="_blank" rel="noreferrer">Abrir Imagem</a>
            </div>
          </div>
        )}

        {status==='error' && (
          <div style={{ background: '#fff1f2', border: '1px solid #f43f5e44', padding: 12, borderRadius: 10 }}>
            <strong>Erro:</strong> {result?.error || 'Falha no upload'}
          </div>
        )}

        <div style={{ fontSize: 14, color: '#6b7280' }}>
          Dica: o campo deve chamar-se <code>image</code> e o token precisa pertencer a um utilizador com o papel <code>admin</code>.
        </div>
      </div>
    </section>
  )
}
