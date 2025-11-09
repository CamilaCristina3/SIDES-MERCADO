import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.js'

const mockProducts = [
  {
    id: 1,
    nome: 'Tomate Fresco',
    preco: 45.00,
    imagem: null,
    categoria: 'Hortícolas',
    disponivel: true
  },
  {
    id: 2,
    nome: 'Cebola',
    preco: 35.00,
    imagem: null,
    categoria: 'Hortícolas',
    disponivel: true
  },
  {
    id: 3,
    nome: 'Alface',
    preco: 25.00,
    imagem: null,
    categoria: 'Hortícolas',
    disponivel: true
  }
]

export default function Home() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="badge">🌱 Plataforma 100% Moçambicana</span>
            <h2>Conectamos Agricultores Locais com Compradores em Todo Moçambique</h2>
            <p>Mercado digital que valoriza produtos nacionais, promove comércio justo e fortalece a economia local.</p>
            <div className="hero-actions">
              <button className="cta-button primary" onClick={() => navigate('/produtos')}>
                🛒 Explorar Produtos
              </button>
              <button className="cta-button secondary" onClick={() => navigate('/produtor/cadastro')}>
                👨‍🌾 Sou Produtor
              </button>
              <button className="ghost-button" onClick={() => navigate('/sobre')}>
                📖 Sobre Nós
              </button>
            </div>
            <div className="hero-kpis">
              <div className="kpi">
                <strong>200+</strong>
                <span>Agricultores</span>
              </div>
              <div className="kpi">
                <strong>1.5k+</strong>
                <span>Clientes Satisfeitos</span>
              </div>
              <div className="kpi">
                <strong>5k+</strong>
                <span>Entregas Realizadas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <h2>Como Funciona na Prática</h2>
            <p>Processo simples pensado para a realidade moçambicana</p>
          </div>
          <div className="how-cards">
            <div className="how-card" role="article">
              <div className="how-icon" aria-hidden>🌱</div>
              <h3>Agricultor Regista-se</h3>
              <p>Produtores locais criam conta e disponibilizam produtos frescos diretamente na plataforma.</p>
            </div>
            <div className="how-card" role="article">
              <div className="how-icon" aria-hidden>🛒</div>
              <h3>Cliente Compra</h3>
              <p>Explore, compare e adquira produtos com total segurança e transparência.</p>
            </div>
            <div className="how-card" role="article">
              <div className="how-icon" aria-hidden>🚚</div>
              <h3>Entrega Rápida</h3>
              <p>Receba produtos frescos em casa ou retire nos pontos de recolha parceiros.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Produtos em Destaque</h2>
            <p>Produtos frescos diretamente de agricultores moçambicanos</p>
          </div>
          <div className="products-grid">
            {mockProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.imagem || '/images/placeholder.jpg'} 
                    alt={product.nome}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg'
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.nome}</h3>
                  <div className="product-footer">
                    <div className="product-price">
                      {product.preco.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                    </div>
                    <button 
                      className="add-to-cart-btn" 
                      onClick={() => addItem(product)}
                    >
                      🛒 Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
