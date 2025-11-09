import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useCategory } from '../context/CategoryContext'
import { resolveProductImage } from '../utils/resolveImage'

// Utilitários
const onImgError = (e) => {
  e.target.src = '/images/placeholder.jpg'
}

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
  const { categories: contextCategories, loading: categoriesLoading } = useCategory()
  const { slug } = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') || '')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])

  // Categorias com fallback
  const allCategories = useMemo(() => {
    if (contextCategories?.length > 0) {
      return contextCategories.map(cat => ({
        name: cat.nome,
        slug: cat.slug || slugify(cat.nome),
        icone: cat.icone || '🥬',
        descricao: cat.descricao || `Produtos frescos de ${cat.nome.toLowerCase()}`
      }))
    }
    
    return [
      { 
        name: 'Hortícolas', 
        slug: 'horticolas', 
        icone: '🥬',
        descricao: 'Verduras e legumes frescos diretamente do produtor'
      },
      { 
        name: 'Frutas', 
        slug: 'frutas', 
        icone: '🍎',
        descricao: 'Frutas sazonais e tropicais moçambicanas'
      },
      { 
        name: 'Cereais', 
        slug: 'cereais', 
        icone: '🌾',
        descricao: 'Grãos e cereais para sua alimentação diária'
      },
      { 
        name: 'Leguminosas', 
        slug: 'leguminosas', 
        icone: '🥜',
        descricao: 'Feijões, lentilhas e outras leguminosas'
      },
      { 
        name: 'Raízes', 
        slug: 'raizes', 
        icone: '🥔',
        descricao: 'Tubérculos e raízes nutritivas'
      },
      { 
        name: 'Tubérculos', 
        slug: 'tuberculos', 
        icone: '🍠',
        descricao: 'Batatas, inhames e outros tubérculos'
      }
    ]
  }, [contextCategories])

  // Buscar produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true)
        const response = await fetch('/api/produtos')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setProducts(data.data.products || data.data)
          } else {
            throw new Error('Formato de dados inválido')
          }
        } else {
          throw new Error('Falha ao carregar produtos')
        }
      } catch (error) {
        console.warn('Usando produtos mock:', error.message)
        setProducts(getMockProducts())
      } finally {
        setProductsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Sync querystring with search field (non-breaking)
  useEffect(() => {
    const q = String(searchTerm || '').trim()
    const current = searchParams.get('q') || ''
    if (q !== current) {
      if (q) setSearchParams({ q })
      else setSearchParams({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  // Produtos mock
  const getMockProducts = () => [
    {
      id: 1, nome: 'Tomate Fresco', preco: 45.00, categoria: 'Hortícolas', disponivel: true,
      descricao: 'Tomates vermelhos frescos colhidos diariamente', produtor: 'Quinta do Zé'
    },
    {
      id: 2, nome: 'Cebola', preco: 35.00, categoria: 'Hortícolas', disponivel: true,
      descricao: 'Cebolas amarelas de tamanho médio', produtor: 'Fazenda Esperança'
    },
    {
      id: 3, nome: 'Alface', preco: 25.00, categoria: 'Hortícolas', disponivel: true,
      descricao: 'Alface crespa fresca e crocante', produtor: 'Horta Urbana'
    },
    {
      id: 4, nome: 'Cenoura', preco: 30.00, categoria: 'Hortícolas', disponivel: true,
      descricao: 'Cenouras doces e frescas', produtor: 'Campo Verde'
    },
    {
      id: 5, nome: 'Maçã', preco: 55.00, categoria: 'Frutas', disponivel: true,
      descricao: 'Maçãs vermelhas suculentas', produtor: 'Pomares Moçambique'
    },
    {
      id: 6, nome: 'Banana', preco: 40.00, categoria: 'Frutas', disponivel: true,
      descricao: 'Bananas maduras e doces', produtor: 'Bananal do Zambere'
    },
    {
      id: 7, nome: 'Laranja', preco: 50.00, categoria: 'Frutas', disponivel: true,
      descricao: 'Laranjas suculentas ricas em vitamina C', produtor: 'Citrinos de Maputo'
    },
    {
      id: 8, nome: 'Arroz', preco: 85.00, categoria: 'Cereais', disponivel: true,
      descricao: 'Arroz branco de grão longo', produtor: 'Cerealista Nacional'
    },
    {
      id: 9, nome: 'Milho', preco: 45.00, categoria: 'Cereais', disponivel: true,
      descricao: 'Milho seco para moagem', produtor: 'Grãos & Cia'
    },
    {
      id: 10, nome: 'Feijão', preco: 65.00, categoria: 'Leguminosas', disponivel: true,
      descricao: 'Feijão vermelho de alta qualidade', produtor: 'Legumes do Campo'
    },
    {
      id: 11, nome: 'Amendoim', preco: 75.00, categoria: 'Leguminosas', disponivel: true,
      descricao: 'Amendoim torrado e salgado', produtor: 'Nozes & Sementes'
    },
    {
      id: 12, nome: 'Batata', preco: 40.00, categoria: 'Raízes', disponivel: true,
      descricao: 'Batatas brancas para cozinhar', produtor: 'Raízes de Moçambique'
    }
  ]

  const activeSlug = slug || ''
  const activeCategory = useMemo(() => {
    if (!activeSlug) return null
    return allCategories.find((c) => c.slug === activeSlug)
  }, [allCategories, activeSlug])

  // Produtos filtrados e ordenados
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filtrar por categoria
    if (activeSlug) {
      filtered = filtered.filter((p) => slugify(p.categoria) === activeSlug)
    }

    // Filtrar por busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((p) => 
        p.nome.toLowerCase().includes(term) ||
        (p.descricao && p.descricao.toLowerCase().includes(term)) ||
        (p.produtor && p.produtor.toLowerCase().includes(term))
      )
    }

    // Filtrar por preço
    filtered = filtered.filter((p) => 
      p.preco >= priceRange[0] && p.preco <= priceRange[1]
    )

    // Ordenar
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.preco - b.preco
        case 'price-high':
          return b.preco - a.preco
        case 'name':
        default:
          return a.nome.localeCompare(b.nome)
      }
    })

    return filtered
  }, [products, activeSlug, searchTerm, sortBy, priceRange])

  // Estatísticas
  const categoryStats = useMemo(() => {
    const stats = {
      totalProducts: products.length,
      availableProducts: products.filter(p => p.disponivel).length,
      totalCategories: allCategories.length
    }
    
    if (activeCategory) {
      const categoryProducts = products.filter(p => slugify(p.categoria) === activeSlug)
      stats.categoryProducts = categoryProducts.length
      stats.categoryAvailable = categoryProducts.filter(p => p.disponivel).length
    }
    
    return stats
  }, [products, allCategories, activeCategory, activeSlug])

  const handleAddToCart = (product) => {
    addItem(product)
    // Feedback visual
    const event = new CustomEvent('toast', {
      detail: {
        message: `${product.nome} adicionado ao carrinho!`,
        type: 'success'
      }
    })
    window.dispatchEvent(event)
  }

  if (categoriesLoading || productsLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>A carregar produtos...</p>
      </div>
    )
  }

  return (
    <div className="categories-page">
      {/* Header com Breadcrumb */}
      <header className="page-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Início</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/categorias" className="breadcrumb-link">Categorias</Link>
            {activeCategory && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{activeCategory.name}</span>
              </>
            )}
          </nav>

          <div className="header-content">
            <div className="header-text">
              {activeCategory ? (
                <>
                  <div className="category-icon-large">{activeCategory.icone}</div>
                  <h1 className="page-title">{activeCategory.name}</h1>
                  <p className="page-subtitle">{activeCategory.descricao}</p>
                </>
              ) : (
                <>
                  <h1 className="page-title">Todas as Categorias</h1>
                  <p className="page-subtitle">
                    Descubra todos os produtos disponíveis em nossa plataforma, 
                    desde hortícolas até cereais e leguminosas.
                  </p>
                </>
              )}
            </div>

            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-number">{categoryStats.totalProducts}</div>
                <div className="stat-label">Produtos Totais</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{categoryStats.availableProducts}</div>
                <div className="stat-label">Disponíveis</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{categoryStats.totalCategories}</div>
                <div className="stat-label">Categorias</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de Ferramentas */}
      <section className="tools-section">
        <div className="container">
          <div className="tools-grid">
            <div className="search-container">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="search-clear"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="tools-controls">
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>⚙️</span>
                Filtros
              </button>

              <div className="sort-container">
                <label htmlFor="sort-select" className="sort-label">Ordenar por:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Nome A-Z</option>
                  <option value="price-low">Preço: Menor primeiro</option>
                  <option value="price-high">Preço: Maior primeiro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filtros Expandíveis */}
          {showFilters && (
            <div className="filters-expanded">
              <div className="filter-group">
                <label className="filter-label">Faixa de Preço</label>
                <div className="price-range">
                  <span className="price-min">{priceRange[0]} MT</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="range-slider"
                  />
                  <span className="price-max">{priceRange[1]} MT</span>
                </div>
              </div>
              
              <div className="filter-actions">
                <button 
                  onClick={() => setPriceRange([0, 500])}
                  className="filter-reset"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid de Categorias */}
      <section className="categories-grid-section">
        <div className="container">
          <h2 className="section-title">Navegar por Categorias</h2>
          <div className="categories-grid">
            <div 
              className={`category-card ${!activeSlug ? 'active' : ''}`}
              onClick={() => navigate('/categorias')}
            >
              <div className="category-card-icon">📦</div>
              <div className="category-card-content">
                <h3 className="category-card-title">Todos os Produtos</h3>
                <p className="category-card-desc">Explore toda nossa variedade</p>
                <span className="category-card-count">
                  {categoryStats.totalProducts} produtos
                </span>
              </div>
            </div>

            {allCategories.map((category) => {
              const categoryProducts = products.filter(p => slugify(p.categoria) === category.slug)
              return (
                <div
                  key={category.slug}
                  className={`category-card ${activeSlug === category.slug ? 'active' : ''}`}
                  onClick={() => navigate(`/categorias/${category.slug}`)}
                >
                  <div className="category-card-icon">{category.icone}</div>
                  <div className="category-card-content">
                    <h3 className="category-card-title">{category.name}</h3>
                    <p className="category-card-desc">{category.descricao}</p>
                    <span className="category-card-count">
                      {categoryProducts.length} produtos
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Seção de Produtos */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-group">
              <h2 className="section-title">
                {activeCategory ? activeCategory.name : 'Todos os Produtos'}
                <span className="product-count-badge">
                  {filteredProducts.length}
                </span>
              </h2>
              {searchTerm && (
                <p className="search-results-info">
                  Resultados para: <strong>"{searchTerm}"</strong>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="clear-search-btn"
                  >
                    ✕
                  </button>
                </p>
              )}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3 className="empty-title">Nenhum produto encontrado</h3>
              <p className="empty-description">
                {searchTerm 
                  ? `Não encontramos produtos para "${searchTerm}". Tente outros termos.`
                  : 'Não há produtos disponíveis nesta categoria no momento.'
                }
              </p>
              <div className="empty-actions">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="cta-button primary"
                  >
                    Limpar Busca
                  </button>
                )}
                <button 
                  onClick={() => navigate('/categorias')}
                  className="cta-button secondary"
                >
                  Ver Todas as Categorias
                </button>
              </div>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img
                      src={resolveProductImage(product)}
                      onError={onImgError}
                      alt={product.nome}
                      loading="lazy"
                    />
                    <div className={`availability-badge ${product.disponivel ? 'available' : 'unavailable'}`}>
                      {product.disponivel ? 'Disponível' : 'Indisponível'}
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <div className="product-category">{product.categoria}</div>
                    <h3 className="product-name">{product.nome}</h3>
                    {product.descricao && (
                      <p className="product-description">{product.descricao}</p>
                    )}
                    {product.produtor && (
                      <div className="product-producer">
                        <span className="producer-label">Produtor:</span>
                        <span className="producer-name">{product.produtor}</span>
                      </div>
                    )}
                    
                    <div className="product-footer">
                      <div className="product-pricing">
                        <div className="product-price">
                          {product.preco.toLocaleString('pt-MZ', {
                            style: 'currency',
                            currency: 'MZN',
                          })}
                        </div>
                      </div>
                      <button 
                        className={`add-to-cart-btn ${!product.disponivel ? 'disabled' : ''}`}
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.disponivel}
                      >
                        {product.disponivel ? '🛒 Adicionar' : 'Indisponível'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Não encontrou o que procurava?</h2>
            <p className="cta-description">
              Entre em contacto connosco e vamos ajudá-lo a encontrar os produtos que precisa.
            </p>
            <div className="cta-actions">
              <button 
                onClick={() => navigate('/ajuda')}
                className="cta-button primary"
              >
                📞 Pedir Ajuda
              </button>
              <button 
                onClick={() => navigate('/produtos')}
                className="cta-button secondary"
              >
                🔍 Explorar Produtos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
