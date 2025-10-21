import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // {id, nome, preco, imagem, quantity}

  const addItem = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const increment = (id) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it)))

  const decrement = (id) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity - 1 } : it)).filter((it) => it.quantity > 0))

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id))
  const clear = () => setItems([])

  const count = items.reduce((sum, it) => sum + it.quantity, 0)
  const total = items.reduce((sum, it) => sum + it.preco * it.quantity, 0)

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

