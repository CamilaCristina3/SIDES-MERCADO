import React from 'react'
import { Link } from 'react-router-dom'
import { getUserFromToken } from '../utils/auth'

export default function AdminDashboard() {
  const user = getUserFromToken()
  return (
    <section className="about-section">
      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <h2>Painel do Administrador</h2>
        <div style={{ color: '#6b7280' }}>
          Sessão: {user?.email || '—'} (papel: {user?.tipo || 'A'})
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div className="how-card">
            <div className="how-icon" aria-hidden>📦</div>
            <h3>Gerir Produtos</h3>
            <p>Crie, edite e remova produtos.</p>
            <Link className="icon-btn" to="/admin/novo-produto">Novo Produto</Link>
          </div>
          <div className="how-card">
            <div className="how-icon" aria-hidden>🖼️</div>
            <h3>Imagens</h3>
            <p>Faça upload de imagens para o catálogo.</p>
            <Link className="icon-btn" to="/admin/upload">Upload de Imagem</Link>
          </div>
          <div className="how-card">
            <div className="how-icon" aria-hidden>🧑‍⚖️</div>
            <h3>Utilizadores</h3>
            <p>Gerir permissões e contas (em breve).</p>
          </div>
          <div className="how-card">
            <div className="how-icon" aria-hidden>📈</div>
            <h3>Indicadores</h3>
            <p>Vendas, pedidos e atividades (em breve).</p>
          </div>
        </div>
      </div>
    </section>
  )
}


