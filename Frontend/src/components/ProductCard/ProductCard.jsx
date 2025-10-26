import React, { useState } from 'react'

function formatMZN(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  try {
    return value.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })
  } catch {
    return `MT ${value.toFixed(2)}`
  }
}

function categoryEmoji(category) {
  const c = (category || '').toLowerCase()
  if (c.includes('verdura')) return '🥬'
  if (c.includes('hort')) return '🥦'
  if (c.includes('cereal')) return '🌾'
  if (c.includes('fruta')) return '🍎'
  if (c.includes('legumin')) return '🫘'
  if (c.includes('raiz')) return '🥔'
  return '🧺'
}

export default function ProductCard({ product, onAddToCart, onToggleFavorite }) {
  const [fav, setFav] = useState(false)

  const toggleFav = () => {
    const next = !fav
    setFav(next)
    onToggleFavorite?.(product.id, next)
  }

  const manifestInterest = () => {
    try {
      const key = 'interests'
      const raw = localStorage.getItem(key)
      const list = raw ? JSON.parse(raw) : []
      const entry = { id: product.id, name: product.name || product.nome, ts: Date.now(), category: product.category }
      if (!list.find((e) => e.id === entry.id)) {
        list.push(entry)
        localStorage.setItem(key, JSON.stringify(list))
      }
      alert('Interesse registado! Avisaremos quando estiver disponível.')
    } catch {}
  }

  return (
    <div className="product-card">
      <div className="product-image" style={{ position: 'relative' }}>
        <div className="image-placeholder" aria-hidden>
          {categoryEmoji(product.category)}
        </div>
        {product.available && <span className="availability-badge">Em Stock</span>}
        <button
          type="button"
          aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onClick={toggleFav}
          style={{
            position: 'absolute', right: 8, top: 8, border: 'none', background: '#ffffffcc',
            borderRadius: 999, padding: '6px 8px', cursor: 'pointer'
          }}
        >
          {fav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        <p style={{ color: 'var(--text-light)', minHeight: 40 }}>{product.description}</p>
        <div className="product-footer">
          <div className="product-price">{formatMZN(product.price)}{product.unit ? ` / ${product.unit}` : ''}</div>
          {product.available ? (
            <button className="add-to-cart-btn" onClick={() => onAddToCart?.(product)}>Adicionar</button>
          ) : (
            <button className="add-to-cart-btn" onClick={manifestInterest}>Manifestar Interesse</button>
          )}
        </div>
      </div>
    </div>
  )
}
