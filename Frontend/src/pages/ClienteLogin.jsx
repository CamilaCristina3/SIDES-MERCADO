import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ClienteLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Credenciais inválidas')
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/checkout')
    } catch (err) {
      setError(String(err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 480, display: 'grid', gap: 16 }}>
        <h2>Entrar</h2>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, background: '#fff', padding: 16, borderRadius: 10 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Email</span>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="voce@exemplo.com" style={{ padding: '8px 12px' }} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Password</span>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" style={{ padding: '8px 12px' }} />
          </label>
          {error && (
            <div style={{ background: '#fff1f2', border: '1px solid #f43f5e44', padding: 10, borderRadius: 8, color: '#b91c1c' }}>
              {error}
            </div>
          )}
          <button type="submit" className="icon-btn" disabled={loading}>{loading ? 'A entrar...' : 'Entrar'}</button>
        </form>
        <div style={{ fontSize: 14, color: '#6b7280' }}>
          Ainda não tem conta? <a href="/registo">Registar</a>
        </div>
      </div>
    </section>
  )
}

