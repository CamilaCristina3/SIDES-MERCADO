import React from 'react'
import { Link } from 'react-router-dom'
import { getUserFromToken } from '../utils/auth'

export default function ProdutorDashboard() {
  const user = getUserFromToken()
  return (
    <section className="about-section">
      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <h2>Painel do Produtor</h2>
        <div style={{ color: '#6b7280' }}>
          Sessão: {user?.email || '—'} (papel: {user?.tipo || 'P'})
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div className="how-card">
            <div className="how-icon" aria-hidden>🧺</div>
            <h3>Meus Produtos</h3>
            <p>Cadastre e acompanhe seus produtos.</p>
            <Link className="icon-btn" to="/admin/novo-produto">Novo Produto</Link>
          </div>
          <div className="how-card">
            <div className="how-icon" aria-hidden>📦</div>
            <h3>Pedidos</h3>
            <p>Veja pedidos e status de entrega (em breve).</p>
          </div>
          <div className="how-card">
            <div className="how-icon" aria-hidden>💳</div>
            <h3>Pagamentos</h3>
            <p>Recebimentos e relatórios (em breve).</p>
          </div>
        </div>
      </div>
    </section>
  )
}


