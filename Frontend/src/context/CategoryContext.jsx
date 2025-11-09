import React, { createContext, useContext, useState, useEffect } from 'react'

const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockCategories = [
      { id: 1, nome: 'Hortícolas', slug: 'horticolas' },
      { id: 2, nome: 'Frutas', slug: 'frutas' },
      { id: 3, nome: 'Cereais', slug: 'cereais' },
      { id: 4, nome: 'Leguminosas', slug: 'leguminosas' }
    ]
    setCategories(mockCategories)
    setLoading(false)
  }, [])

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory() {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider')
  }
  return context
}
