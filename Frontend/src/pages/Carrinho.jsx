import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.js'
import { resolveProductImage } from '../utils/resolveImage'
import { onImgError } from '../utils/imageUrl'
import './Carrinho.css'

export default function Carrinho() {
  const { cart, addItem, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  const groups = useMemo(() => {
    const m = new Map()
    for (const it of cart || []) {
      const id = it?.id ?? Math.random()
      const entry = m.get(id) || { item: it, count: 0 }
      entry.count += 1
      m.set(id, entry)
    }
    return Array.from(m.values())
  }, [cart])

  const total = useMemo(() => (cart || []).reduce((s, it) => s + Number(it?.preco || 0), 0), [cart])

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h2>Seu Carrinho</h2>
          {(cart?.length || 0) > 0 && (
            <span className="badge">{cart.length} {cart.length === 1 ? 'item' : 'itens'}</span>
          )}
        </div>

        {(cart?.length || 0) === 0 ? (
          <div className="empty-state" style={{ marginTop: 16 }}>
            <div className="empty-icon">🛍️</div>
            <div className="empty-title">Seu carrinho está vazio</div>
            <div className="empty-description">Explore nossos produtos e adicione ao carrinho.</div>
            <div className="empty-actions">
              <a className="cta-button" href="/produtos">Explorar Produtos</a>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              {groups.map(({ item, count }) => (
                <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', padding: 12, borderRadius: 12 }}>
                  <img
                    src={resolveProductImage(item)}
                    onError={onImgError}
                    alt={item.nome}
                    loading="lazy"
                    decoding="async"
                    style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{item.nome}</div>
                    <div style={{ color: 'var(--primary-color)', fontWeight: 700 }}>
                      {item.preco.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                      {count > 1 ? ` × ${count}` : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button className="icon-btn" onClick={() => addItem(item)}>+1</button>
                    <button className="icon-btn" onClick={() => removeItem(item.id)}>Remover</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 12, flexWrap: 'wrap' }}>
              <strong>
                Total: {total.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
              </strong>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="ghost-button" onClick={clearCart}>Limpar Carrinho</button>
                <button className="cta-button primary" onClick={() => navigate('/checkout')}>Ir para Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

