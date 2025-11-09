import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.js'
import { resolveProductImage } from '../utils/resolveImage'
import { onImgError } from '../utils/imageUrl'
import './Carrinho.css'

export default function Carrinho() {
  const { items, increment, decrement, remove, clear, total, getItemTotal } = useCart()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Calcular totais
  const calculateTotals = () => {
    const subtotal = total
    const shipping = items.length > 0 ? 150 : 0 // Taxa de entrega fixa
    const finalTotal = subtotal + shipping
    
    return { subtotal, shipping, finalTotal }
  }

  const { subtotal, shipping, finalTotal } = calculateTotals()

  // Handler para quantidade mínima
  const handleDecrement = (itemId, currentQuantity) => {
    if (currentQuantity <= 1) {
      if (window.confirm('Deseja remover este item do carrinho?')) {
        remove(itemId)
      }
      return
    }
    decrement(itemId)
  }

  // Handler para limpar carrinho com confirmação
  const handleClearCart = () => {
    if (items.length === 0) return
    
    if (window.confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      clear()
    }
  }

  // Handler para checkout
  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!')
      return
    }
    navigate('/checkout')
  }

  if (isLoading) {
    return (
      <section className="cart-section">
        <div className="cart-container">
          <div className="cart-loading">
            <div className="cart-empty-icon">🔄</div>
            <h3>Carregando seu carrinho...</h3>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-section">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">🛒 Seu Carrinho</h1>
          {items.length > 0 && (
            <span className="cart-count-badge">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">🛒</div>
            <h3 style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>
              Seu carrinho está vazio
            </h3>
            <p className="cart-empty-text">
              Adicione alguns produtos incríveis ao seu carrinho!
            </p>
            <button 
              onClick={() => navigate('/produtos')}
              className="continue-shopping-button"
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={resolveProductImage(item)}
                    onError={onImgError}
                    alt={item.nome}
                    loading="lazy"
                    decoding="async"
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.nome}</div>
                    <div className="cart-item-price">
                      {item.preco.toLocaleString('pt-MZ', { 
                        style: 'currency', 
                        currency: 'MZN' 
                      })}
                    </div>
                    <div className="cart-item-subtotal">
                      Subtotal: {getItemTotal(item.id).toLocaleString('pt-MZ', { 
                        style: 'currency', 
                        currency: 'MZN' 
                      })}
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleDecrement(item.id, item.quantity)}
                        className="quantity-button"
                        disabled={item.quantity <= 1}
                        aria-label="Diminuir quantidade"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => increment(item.id)}
                        className="quantity-button"
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => remove(item.id)}
                      className="remove-button"
                      aria-label="Remover item do carrinho"
                    >
                      ✕ Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              {/* Resumo de valores */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}>
                  <span>Subtotal:</span>
                  <span>
                    {subtotal.toLocaleString('pt-MZ', { 
                      style: 'currency', 
                      currency: 'MZN' 
                    })}
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}>
                  <span>Entrega:</span>
                  <span>
                    {shipping > 0 
                      ? shipping.toLocaleString('pt-MZ', { 
                          style: 'currency', 
                          currency: 'MZN' 
                        })
                      : 'Grátis'
                    }
                  </span>
                </div>
                {shipping > 0 && (
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-light)',
                    textAlign: 'right',
                    marginBottom: '0.5rem'
                  }}>
                    *Taxa de entrega padrão
                  </div>
                )}
              </div>

              <div className="cart-total-row">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-amount">
                  {finalTotal.toLocaleString('pt-MZ', { 
                    style: 'currency', 
                    currency: 'MZN' 
                  })}
                </span>
              </div>
              
              <div className="cart-action-buttons">
                <button 
                  onClick={handleClearCart}
                  className="clear-cart-button"
                >
                  🗑️ Limpar Carrinho
                </button>
                <button 
                  onClick={handleCheckout}
                  className="checkout-button"
                >
                  ✅ Finalizar Compra
                </button>
              </div>

              <button 
                onClick={() => navigate('/produtos')}
                className="continue-shopping-button"
              >
                ← Continuar Comprando
              </button>
            </div>

            {/* Promoção/Cross-selling */}
            {items.length > 0 && (
              <div style={{
                background: 'var(--surface)',
                padding: '1rem',
                borderRadius: 'var(--border-radius)',
                marginTop: '1rem',
                textAlign: 'center',
                border: '1px dashed var(--primary-color)'
              }}>
                <p style={{ 
                  margin: 0, 
                  color: 'var(--text-light)',
                  fontSize: '0.9rem'
                }}>
                  💡 <strong>Dica:</strong> Adicione mais MZN 50 em produtos e ganhe frete grátis!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}