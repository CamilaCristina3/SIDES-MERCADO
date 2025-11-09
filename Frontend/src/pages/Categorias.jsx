import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { mockProducts } from '../data/products'
import { imageUrl, onImgError } from '../utils/imageUrl'
import { useCart } from '../context/CartContext.js'

function slugify(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function Categorias() {
  const { addItem } = useCart()
  const { slug } = useParams()

  const allCategories = useMemo(
    () => Array.from(new Set(mockProducts.map((p) => p.categoria))),
    []
  )

  const categories = useMemo(
    () => allCategories.map((name) => ({ name, slug: slugify(name) })),
    [allCategories]
  )

  // Suporte a query ?c= removido — apenas rotas por slug

  const activeSlug = slug || ''
  const activeName = useMemo(() => {
    if (!activeSlug) return ''
    const m = categories.find((c) => c.slug === activeSlug)
    return m ? m.name : ''
  }, [categories, activeSlug])

  const products = useMemo(() => {
    if (!activeSlug) return mockProducts
    return mockProducts.filter((p) => slugify(p.categoria) === activeSlug)
  }, [activeSlug])

  return (
    <>
      <section className="categories-section">
        <div className="container">
          <h2>Categorias</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <Link className="category-chip" aria-current={!activeSlug ? 'true' : undefined} to="/categorias">
              Todas
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                className="category-chip"
                aria-current={activeSlug === c.slug ? 'true' : undefined}
                to={`/categorias/${c.slug}`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>{activeName || 'Todos os Produtos'}</h2>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img
                    src={imageUrl(product.imagem)}
                    onError={onImgError}
                    alt={product.nome}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.nome}</h3>
                  <div className="product-footer">
                    <div className="product-price">
                      {Number(product.preco || 0).toLocaleString('pt-MZ', {
                        style: 'currency',
                        currency: 'MZN',
                      })}
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


