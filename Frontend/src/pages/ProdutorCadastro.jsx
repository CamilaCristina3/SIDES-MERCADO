import React, { useState } from 'react'

export default function ProdutorCadastro() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    telefone: '',
    nuit: '',
    morada: '',
    provincia: '',
    distrito: '',
    localidade: '',
    codigo_postal: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  function setField(k, v) { setForm(prev => ({ ...prev, [k]: v })) }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setOk('')
    setLoading(true)
    try {
      const payload = { ...form, tipo: 'P' }
      const res = await fetch('/api/utilizadores/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Falha no cadastro de produtor')
      setOk('Cadastro enviado! Em breve receberá confirmação por email.')
    } catch (err) {
      setError(String(err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 720, display: 'grid', gap: 16 }}>
        <h2>Cadastro de Agricultor (Produtor)</h2>
        <p>Preencha os seus dados para vender na plataforma SIDES.</p>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, background: '#fff', padding: 16, borderRadius: 10 }}>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Nome</span>
              <input value={form.first_name} onChange={e=>setField('first_name', e.target.value)} required />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Sobrenome</span>
              <input value={form.last_name} onChange={e=>setField('last_name', e.target.value)} required />
            </label>
          </div>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Email</span>
              <input type="email" value={form.email} onChange={e=>setField('email', e.target.value)} required />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Password</span>
              <input type="password" value={form.password} onChange={e=>setField('password', e.target.value)} required />
            </label>
          </div>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Telefone</span>
              <input value={form.telefone} onChange={e=>setField('telefone', e.target.value)} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>NUIT (opcional)</span>
              <input value={form.nif} onChange={e=>setField('nuit', e.target.value)} />
            </label>
          </div>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Morada</span>
            <input value={form.morada} onChange={e=>setField('morada', e.target.value)} />
          </label>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Província</span>
              <input value={form.provincia} onChange={e=>setField('provincia', e.target.value)} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Distrito</span>
              <input value={form.distrito} onChange={e=>setField('distrito', e.target.value)} />
            </label>
          </div>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Localidade</span>
              <input value={form.localidade} onChange={e=>setField('localidade', e.target.value)} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Código Postal</span>
              <input value={form.codigo_postal} onChange={e=>setField('codigo_postal', e.target.value)} />
            </label>
          </div>
          {error && <div style={{ background: '#fff1f2', border: '1px solid #f43f5e44', padding: 10, borderRadius: 8, color: '#b91c1c' }}>{error}</div>}
          {ok && <div style={{ background: '#ecfdf5', border: '1px solid #10b98133', padding: 10, borderRadius: 8, color: '#065f46' }}>{ok}</div>}
          <button type="submit" className="icon-btn" disabled={loading}>{loading ? 'A enviar...' : 'Enviar Cadastro'}</button>
        </form>
      </div>
    </section>
  )
}

