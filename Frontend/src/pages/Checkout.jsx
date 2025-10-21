import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const [metodo, setMetodo] = useState('entrega') // 'entrega' | 'retirada'
  const navigate = useNavigate()

  const finalizar = (e) => {
    e.preventDefault()
    if (items.length === 0) {
      alert('Carrinho vazio')
      return
    }
    clear()
    alert('Compra finalizada com sucesso!')
    navigate('/')
  }

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h2>Checkout</h2>
        {items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <div style={{ background: '#fff', borderRadius: 10, padding: 12, margin: '12px 0' }}>
              <h3>Resumo do Pedido</h3>
              <ul>
                {items.map((it) => (
                  <li key={it.id}>
                    {it.quantity} × {it.nome} —{' '}
                    {(it.preco * it.quantity).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 8 }}><strong>Total: {total.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</strong></div>
            </div>

            <form onSubmit={finalizar} style={{ display: 'grid', gap: 10 }}>
              <div>
                <label>
                  <input type="radio" name="metodo" value="entrega" checked={metodo === 'entrega'} onChange={() => setMetodo('entrega')} />
                  Entrega
                </label>
                <label style={{ marginLeft: 16 }}>
                  <input type="radio" name="metodo" value="retirada" checked={metodo === 'retirada'} onChange={() => setMetodo('retirada')} />
                  Retirar no local
                </label>
              </div>

              <input name="nome" placeholder="Nome completo" required style={{ padding: '8px 12px' }} />
              <input name="email" type="email" placeholder="E-mail" required style={{ padding: '8px 12px' }} />
              {metodo === 'entrega' && (
                <>
                  <input name="endereco" placeholder="Endereço para entrega" required style={{ padding: '8px 12px' }} />
                  <input name="cidade" placeholder="Cidade" required style={{ padding: '8px 12px' }} />
                </>
              )}

              <button type="submit">Finalizar Compra</button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}

