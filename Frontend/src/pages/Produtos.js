import React, { useMemo, useState } from 'react'
import { mockProducts } from '../data/products'
import { imageUrl, onImgError } from '../utils/imageUrl'
import { useCart } from '../context/CartContext.jsx'

function normalize(str) {
  return (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function Produtos() {
  const { addItem } = useCart()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')

  const categories = useMemo(() => Array.from(new Set(mockProducts.map((p) => p.categoria))), [])
  const filtered = useMemo(
    () =>
      mockProducts.filter(
        (p) => (cat ? p.categoria === cat : true) && normalize(p.nome + ' ' + p.categoria).includes(normalize(q))
      ),
    [q, cat]
  )

  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <h2>Produtos</h2>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '0 16px 16px' }}>
          <input
            placeholder="Pesquisar produtos..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ padding: '8px 12px', flex: 1, minWidth: 200 }}
          />
          <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ padding: '8px 12px' }}>
            <option value="">Todas categorias</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="products-grid">
          {filtered.map((product) => (
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
  )
}
