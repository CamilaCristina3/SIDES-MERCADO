import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.js'
import { imageUrl, onImgError } from '../utils/imageUrl'

export default function Carrinho() {
  const { items, increment, decrement, remove, clear, total } = useCart()
  const navigate = useNavigate()

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h2>Seu Carrinho</h2>
        {items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              {items.map((it) => (
                <div key={it.id} style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#fff', padding: 10, borderRadius: 10 }}>
                  <img src={imageUrl(it.imagem)} onError={onImgError} alt={it.nome} loading="lazy" decoding="async" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{it.nome}</div>
                    <div>{it.preco.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button onClick={() => decrement(it.id)}>-</button>
                    <span>{it.quantity}</span>
                    <button onClick={() => increment(it.id)}>+</button>
                    <button onClick={() => remove(it.id)}>Remover</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <strong>
                Total: {total.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
              </strong>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={clear}>Limpar Carrinho</button>
                <button onClick={() => navigate('/checkout')}>Ir para Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

