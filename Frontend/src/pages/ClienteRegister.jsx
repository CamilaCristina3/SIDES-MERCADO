import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ClienteRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    telefone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  function setField(k, v) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setOk('')
    setLoading(true)
    try {
      const payload = { ...form, tipo: 'C' }
      const res = await fetch('/api/utilizadores/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Falha no registo')
      setOk('Conta criada! Pode iniciar sessão.')
      setTimeout(() => navigate('/login'), 800)
    } catch (err) {
      setError(String(err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 560, display: 'grid', gap: 16 }}>
        <h2>Registo de Cliente</h2>
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
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Email</span>
            <input type="email" value={form.email} onChange={e=>setField('email', e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Password</span>
            <input type="password" value={form.password} onChange={e=>setField('password', e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Telefone (opcional)</span>
            <input value={form.telefone} onChange={e=>setField('telefone', e.target.value)} />
          </label>
          {error && <div style={{ background: '#fff1f2', border: '1px solid #f43f5e44', padding: 10, borderRadius: 8, color: '#b91c1c' }}>{error}</div>}
          {ok && <div style={{ background: '#ecfdf5', border: '1px solid #10b98133', padding: 10, borderRadius: 8, color: '#065f46' }}>{ok}</div>}
          <button type="submit" className="icon-btn" disabled={loading}>{loading ? 'A criar...' : 'Criar Conta'}</button>
        </form>
        <div style={{ fontSize: 14, color: '#6b7280' }}>
          Já tem conta? <a href="/login">Entrar</a>
        </div>
      </div>
    </section>
  )
}

