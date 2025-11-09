import React, { useMemo, useState } from 'react'
import { mockProducts } from '../data/products'
import { imageUrl, onImgError } from '../utils/imageUrl'
import { useCart } from '../context/CartContext.js'

export default function Categorias() {
  const { addItem } = useCart()
  const [active, setActive] = useState('')
  const categories = useMemo(() => Array.from(new Set(mockProducts.map((p) => p.categoria))), [])
  const products = active ? mockProducts.filter((p) => p.categoria === active) : mockProducts

  return (
    <>
      <section className="categories-section">
        <div className="container">
          <h2>Categorias</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <button className="category-chip" aria-pressed={active === ''} onClick={() => setActive('')}>Todas</button>
            {categories.map((c) => (
              <button key={c} className="category-chip" aria-pressed={active === c} onClick={() => setActive(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>{active || 'Todos os Produtos'}</h2>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={imageUrl(product.imagem)} onError={onImgError} alt={product.nome} loading="lazy" decoding="async" />
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

