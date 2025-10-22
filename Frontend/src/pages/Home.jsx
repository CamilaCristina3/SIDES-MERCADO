
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { mockProducts } from '../data/mockProducts'
import { imageUrl, onImgError } from '../utils/imageUrl'
import { useCart } from '../context/CartContext.jsx'

export default function Home() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="badge">Plataforma digital sustentável</span>
            <h2>Da Terra ao Seu Negócio</h2>
            <p>Comércio sustentável para Moçambique. Apoie o produtor local.</p>
            <div className="hero-actions">
              <button className="cta-button" onClick={() => navigate('/produtos')}>Explorar Produtos</button>
              <button className="ghost-button" onClick={() => navigate('/produtor/cadastro')}>Sou Produtor</button>
            </div>
            <div className="hero-kpis">
              <div className="kpi"><strong>200+</strong><span>Produtores</span></div>
              <div className="kpi"><strong>1.5k+</strong><span>Clientes</span></div>
              <div className="kpi"><strong>5k+</strong><span>Entregas</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="container how-cards">
          <div className="how-card" role="article">
            <div className="how-icon" aria-hidden>🌱</div>
            <h3>O Agricultor Cadastra-se</h3>
            <p>Produtores locais registam-se e disponibilizam produtos frescos.</p>
          </div>
          <div className="how-card" role="article">
            <div className="how-icon" aria-hidden>🛒</div>
            <h3>O Consumidor compra</h3>
            <p>Clientes exploram, comparam e compram de forma simples e segura.</p>
          </div>
          <div className="how-card" role="article">
            <div className="how-icon" aria-hidden>🚚</div>
            <h3>A Entrega é Feita</h3>
            <p>Entrega rápida, garantindo frescor e qualidade na sua porta.</p>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0 }}>Produtos em Destaque</h2>
            <Link to="/produtos" className="icon-btn" aria-label="Ver todos os produtos">Ver todos</Link>
          </div>
          <div className="products-grid">
            {mockProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={imageUrl(product.imagem)} onError={onImgError} alt={product.nome} />
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

