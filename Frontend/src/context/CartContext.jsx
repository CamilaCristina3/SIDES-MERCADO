import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // normalized: {id, nome, preco, imagem, unit?, quantity}

  function normalize(p) {
    if (!p) return null
    const nome = p.nome ?? p.name ?? 'Produto'
    const preco = typeof p.preco === 'number' ? p.preco : (typeof p.price === 'number' ? p.price : 0)
    const imagem = p.imagem ?? p.image ?? null
    const unit = p.unit ?? p.unidade ?? undefined
    return { id: p.id, nome, preco, imagem, unit }
  }

  const addItem = (product) => {
    const base = normalize(product)
    if (!base || base.id == null) return
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === base.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { ...base, quantity: 1 }]
    })
  }

  const increment = (id) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it)))

  const decrement = (id) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity - 1 } : it)).filter((it) => it.quantity > 0))

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id))
  const clear = () => setItems([])

  const count = items.reduce((sum, it) => sum + it.quantity, 0)
  const total = items.reduce((sum, it) => sum + (Number(it.preco) || 0) * it.quantity, 0)

  const value = useMemo(
    () => ({ items, addItem, increment, decrement, remove, clear, count, total }),
    [items, count, total]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
