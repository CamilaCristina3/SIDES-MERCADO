import React from 'react'
import { useNavigate } from 'react-router-dom'
import { mockProducts } from '../data/mockProducts'
import { useCart } from '../context/CartContext.jsx'

export default function Home() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <h2>Da Terra Direto ao Seu Negócio</h2>
            <p>Apoie o Produtor Local</p>
            <div className="hero-actions">
              <button className="cta-button" onClick={() => navigate('/produtos')}>Explorar Produtos</button>
              <button className="ghost-button" onClick={() => navigate('/cadastro')}>Seja um Agricultor</button>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="container steps">
          <div className="step">
            <div className="step-icon" aria-hidden>👨‍🌾</div>
            <p>O Agricultor Cadastra</p>
          </div>
          <div className="step-arrow">›</div>
          <div className="step">
            <div className="step-icon" aria-hidden>🏪</div>
            <p>O Consumidor Escolhe</p>
          </div>
          <div className="step-arrow">›</div>
          <div className="step">
            <div className="step-icon" aria-hidden>🚚</div>
            <p>A Entrega é Feita</p>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Produtos em Destaque</h2>
          </div>
          <div className="products-grid">
            {mockProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.imagem} alt={product.nome} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.nome}</h3>
                  <div className="product-footer">
                    <div className="product-price">
                      {product.preco.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                    </div>
                    <button className="add-to-cart-btn" onClick={() => addItem(product)}>
                      Adicionar ao Carrinho
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

