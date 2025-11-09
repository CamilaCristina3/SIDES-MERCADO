import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
// Use the normalized product list for production
import { mockProducts } from '../data/products'
import { onImgError } from '../utils/imageUrl'
import { resolveProductImage } from '../utils/resolveImage'
import { useCart } from '../context/CartContext.js'

export default function Home() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  return (
    <>
      <section className="hero home-hero">
        <div className="container home-hero-inner">
          <div className="home-hero-content">
            <span className="home-badge">🌱 Plataforma 100% Moçambicana</span>
            <h2>Conectamos Agricultores Locais com Compradores em Todo Moçambique</h2>
            <p>Mercado digital que valoriza produtos nacionais, promove comércio justo e fortalece a economia local.</p>
            <div className="home-hero-actions">
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
            <div className="home-hero-kpis">
              <div className="home-kpi">
                <strong>200+</strong>
                <span>Agricultores</span>
              </div>
              <div className="home-kpi">
                <strong>1.5k+</strong>
                <span>Clientes Satisfeitos</span>
              </div>
              <div className="home-kpi">
                <strong>5k+</strong>
                <span>Entregas Realizadas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section home-how-section">
        <div className="container">
          <div className="section-header">
            <h2>Como Funciona na Prática</h2>
            <p>Processo simples pensado para a realidade moçambicana</p>
          </div>
          <div className="home-how-cards">
            <div className="home-how-card" role="article">
              <div className="home-how-icon" aria-hidden>🌱</div>
              <h3>Agricultor Regista-se</h3>
              <p>Produtores locais criam conta e disponibilizam produtos frescos diretamente na plataforma.</p>
            </div>
            <div className="home-how-card" role="article">
              <div className="home-how-icon" aria-hidden>🛒</div>
              <h3>Cliente Compra</h3>
              <p>Explore, compare e adquira produtos com total segurança e transparência.</p>
            </div>
            <div className="home-how-card" role="article">
              <div className="home-how-icon" aria-hidden>🚚</div>
              <h3>Entrega Rápida</h3>
              <p>Receba produtos frescos em casa ou retire nos pontos de recolha parceiros.</p>
            </div>
          </div>
          
          <div className="section-header">
            <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>
              Quer conhecer melhor a nossa história e impacto em Moçambique?
            </p>
            <button 
              className="cta-button primary" 
              onClick={() => navigate('/sobre')}
            >
              📚 Conheça a Nossa História
            </button>
          </div>
        </div>
      </section>

      <section className="products-section home-products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Produtos em Destaque</h2>
              <p>Produtos frescos diretamente de agricultores moçambicanos</p>
            </div>
            <Link to="/produtos" className="home-icon-btn" aria-label="Ver todos os produtos">
              Ver todos →
            </Link>
          </div>
          <div className="home-products-grid">
            {mockProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="home-product-card">
                <div className="home-product-image">
                  <img 
                    src={resolveProductImage(product)} 
                    onError={onImgError} 
                    alt={product.nome} 
                  />
                </div>
                <div className="home-product-info">
                  <h3 className="home-product-name">{product.nome}</h3>
                  <div className="home-product-footer">
                    <div className="home-product-price">
                      {product.preco.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                    </div>
                    <button 
                      className="home-add-to-cart-btn" 
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

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para Fazer Parte Desta Mudança?</h2>
            <p>
              Junte-se à comunidade que está a transformar a agricultura em Moçambique através da tecnologia.
            </p>
            <div className="cta-actions">
              <button className="cta-button primary" onClick={() => navigate('/produtos')}>
                🛒 Começar a Comprar
              </button>
              <button className="cta-button secondary" onClick={() => navigate('/sobre')}>
                📖 Conhecer a SIDES
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
