import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useCategory } from '../context/CategoryContext'
import { resolveProductImage } from '../utils/resolveImage'

// Utilitários de imagem
const onImgError = (e) => {
  e.target.src = '/images/placeholder.jpg'
}

// Função para slugify
function slugify(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function Produto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, cart } = useCart()
  const { categories } = useCategory()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])

  // Buscar dados do produto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        // Tentar API primeiro
        const response = await fetch(`/api/produtos/${id}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setProduct(data.data)
            fetchRelatedProducts(data.data.categoria, data.data.id)
          } else {
            throw new Error('Produto não encontrado')
          }
        } else {
          throw new Error('Falha ao carregar produto')
        }
      } catch (error) {
        console.warn('Usando produto mock:', error.message)
        // Fallback para produto mock
        const mockProduct = getMockProduct(id)
        if (mockProduct) {
          setProduct(mockProduct)
          fetchRelatedProducts(mockProduct.categoria, mockProduct.id)
        } else {
          setError('Produto não encontrado')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // Buscar produtos relacionados
  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const response = await fetch(`/api/produtos?categoria=${category}&limit=4`)
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          const products = data.data.products || data.data
          const filtered = products
            .filter(p => p.id !== currentProductId)
            .slice(0, 4)
          setRelatedProducts(filtered)
        }
      } else {
        throw new Error('Falha ao carregar produtos relacionados')
      }
    } catch (error) {
      console.warn('Usando produtos relacionados mock:', error.message)
      // Fallback para produtos relacionados mock
      setRelatedProducts(getMockRelatedProducts(category, currentProductId))
    }
  }

  // Produto mock de fallback
  const getMockProduct = (productId) => {
    const mockProducts = [
      {
        id: 1,
        nome: 'Tomate Fresco',
        preco: 45.00,
        precoOriginal: 55.00,
        imagem: null,
        imagens: [
          '/images/Alface.jng',
          '/images/tomate.jng',
          '/images/tomate-3.jpg'
        ],
        categoria: 'Hortícolas',
        disponivel: true,
        stock: 15,
        descricao: 'Tomates vermelhos frescos colhidos diariamente da nossa quinta em Boane. Perfeitos para saladas, molhos e cozinhados.',
        caracteristicas: [
          '🌱 Cultivo orgânico',
          '📏 Tamanho médio: 50-70g cada',
          '🎯 Colheita diária',
          '🚚 Entrega no mesmo dia'
        ],
        produtor: {
          nome: 'A Horta Da GovUrb',
          localizacao: 'Boane, Maputo',
          avaliacao: 4.8,
          totalVendas: 127
        },
        nutricao: {
          calorias: '18 kcal',
          carboidratos: '3.9g',
          proteinas: '0.9g',
          gordura: '0.2g'
        },
        conservacao: 'Manter em local fresco e arejado. Durabilidade: 5-7 dias.'
      },
      {
        id: 2,
        nome: 'Cebola Amarela',
        preco: 35.00,
        precoOriginal: 42.00,
        imagem: null,
        imagens: [
          '/images/cebola-1.jpg',
          '/images/cebola-2.jpg'
        ],
        categoria: 'Hortícolas',
        disponivel: true,
        stock: 28,
        descricao: 'Cebolas amarelas de tamanho médio, ideais para refogados, sopas e temperos. Sabor suave e textura firme.',
        caracteristicas: [
          '🌱 Cultivo tradicional',
          '📏 Tamanho uniforme',
          '🎯 Alta durabilidade',
          '🚚 Pronta para uso'
        ],
        produtor: {
          nome: 'Fazenda Esperança',
          localizacao: 'Manhiça, Maputo',
          avaliacao: 4.6,
          totalVendas: 89
        },
        nutricao: {
          calorias: '40 kcal',
          carboidratos: '9.3g',
          proteinas: '1.1g',
          gordura: '0.1g'
        },
        conservacao: 'Armazenar em local seco e escuro. Durabilidade: 2-3 meses.'
      }
    ]

    return mockProducts.find(p => p.id === parseInt(productId)) || mockProducts[0]
  }

  // Produtos relacionados mock
  const getMockRelatedProducts = (category, currentProductId) => {
    const allProducts = [
      {
        id: 3,
        nome: 'Alface Crespa',
        preco: 25.00,
        imagem: null,
        categoria: 'Hortícolas',
        disponivel: true
      },
      {
        id: 4,
        nome: 'Cenoura',
        preco: 30.00,
        imagem: null,
        categoria: 'Hortícolas',
        disponivel: true
      },
      {
        id: 5,
        nome: 'Pimento Verde',
        preco: 48.00,
        imagem: null,
        categoria: 'Hortícolas',
        disponivel: false
      },
      {
        id: 6,
        nome: 'Couve Portuguesa',
        preco: 32.00,
        imagem: null,
        categoria: 'Hortícolas',
        disponivel: true
      }
    ]

    return allProducts
      .filter(p => p.categoria === category && p.id !== currentProductId)
      .slice(0, 4)
  }

  const handleAddToCart = () => {
    if (product && product.disponivel) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
      
      // Feedback visual
      const event = new CustomEvent('cartNotification', {
        detail: {
          message: `${quantity}x ${product.nome} adicionado ao carrinho!`,
          type: 'success'
        }
      })
      window.dispatchEvent(event)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  const isInCart = product && cart.some(item => item.id === product.id)

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>A carregar produto...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">😕</div>
          <h2>Produto Não Encontrado</h2>
          <p>O produto que está a procurar não existe ou foi removido.</p>
          <div className="error-actions">
            <button onClick={() => navigate('/produtos')} className="cta-button primary">
              Voltar aos Produtos
            </button>
            <button onClick={() => navigate('/')} className="cta-button secondary">
              Página Inicial
            </button>
          </div>
        </div>
      </div>
    )
  }

  const productImages = product.imagens || [resolveProductImage(product)]
  const hasDiscount = product.precoOriginal && product.precoOriginal > product.preco
  const discountPercentage = hasDiscount 
    ? Math.round(((product.precoOriginal - product.preco) / product.precoOriginal) * 100)
    : 0

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container">
          <Link to="/">Início</Link>
          <span> / </span>
          <Link to="/categorias">Categorias</Link>
          <span> / </span>
          <Link to={`/categorias/${slugify(product.categoria)}`}>{product.categoria}</Link>
          <span> / </span>
          <span>{product.nome}</span>
        </div>
      </nav>

      {/* Produto Principal */}
      <section className="product-main">
        <div className="container">
          <div className="product-layout">
            {/* Galeria de Imagens */}
            <div className="product-gallery">
              <div className="gallery-main">
                <img
                  src={productImages[selectedImage]}
                  alt={product.nome}
                  onError={onImgError}
                  className="main-image"
                />
                {hasDiscount && (
                  <div className="discount-badge">
                    -{discountPercentage}%
                  </div>
                )}
                {!product.disponivel && (
                  <div className="unavailable-overlay">
                    <span>Indisponível</span>
                  </div>
                )}
              </div>
              
              {productImages.length > 1 && (
                <div className="gallery-thumbnails">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.nome} ${index + 1}`}
                        onError={onImgError}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="product-info">
              <div className="product-header">
                <div className="product-category">{product.categoria}</div>
                <h1 className="product-title">{product.nome}</h1>
                
                {/* Avaliação do Produtor */}
                {product.produtor && (
                  <div className="producer-info">
                    <div className="producer-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating">{product.produtor.avaliacao}</span>
                    </div>
                    <div className="producer-details">
                      <strong>{product.produtor.nome}</strong>
                      <span> • {product.produtor.localizacao}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Preço */}
              <div className="product-pricing">
                {hasDiscount ? (
                  <>
                    <div className="current-price">
                      {product.preco.toLocaleString('pt-MZ', {
                        style: 'currency',
                        currency: 'MZN'
                      })}
                    </div>
                    <div className="original-price">
                      {product.precoOriginal.toLocaleString('pt-MZ', {
                        style: 'currency',
                        currency: 'MZN'
                      })}
                    </div>
                  </>
                ) : (
                  <div className="current-price">
                    {product.preco.toLocaleString('pt-MZ', {
                      style: 'currency',
                      currency: 'MZN'
                    })}
                  </div>
                )}
              </div>

              {/* Descrição */}
              <div className="product-description">
                <p>{product.descricao}</p>
              </div>

              {/* Características */}
              {product.caracteristicas && product.caracteristicas.length > 0 && (
                <div className="product-features">
                  <h4>Características</h4>
                  <ul className="features-list">
                    {product.caracteristicas.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Informações de Nutrição */}
              {product.nutricao && (
                <div className="nutrition-info">
                  <h4>Informação Nutricional (por 100g)</h4>
                  <div className="nutrition-grid">
                    {Object.entries(product.nutricao).map(([key, value]) => (
                      <div key={key} className="nutrition-item">
                        <span className="nutrition-value">{value}</span>
                        <span className="nutrition-label">
                          {key === 'calorias' ? 'Calorias' :
                           key === 'carboidratos' ? 'Carboidratos' :
                           key === 'proteinas' ? 'Proteínas' : 'Gordura'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conservação */}
              {product.conservacao && (
                <div className="storage-info">
                  <h4>🍃 Conservação</h4>
                  <p>{product.conservacao}</p>
                </div>
              )}

              {/* Ações do Produto */}
              <div className="product-actions">
                {product.disponivel ? (
                  <>
                    <div className="quantity-selector">
                      <label>Quantidade:</label>
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= (product.stock || 10)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                      {product.stock && (
                        <span className="stock-info">
                          {product.stock} unidades disponíveis
                        </span>
                      )}
                    </div>

                    <div className="action-buttons">
                      <button
                        onClick={handleAddToCart}
                        className={`cta-button primary large ${isInCart ? 'in-cart' : ''}`}
                      >
                        {isInCart ? '✓ No Carrinho' : '🛒 Adicionar ao Carrinho'}
                      </button>
                      <button className="cta-button secondary">
                        💚 Favorito
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="unavailable-message">
                    <div className="unavailable-icon">⏳</div>
                    <div>
                      <h4>Produto Indisponível</h4>
                      <p>Este produto está temporariamente fora de stock.</p>
                      <button className="cta-button secondary">
                        🔔 Avise-me quando disponível
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações de Entrega */}
              <div className="delivery-info">
                <div className="delivery-item">
                  <span className="icon">🚚</span>
                  <div>
                    <strong>Entrega Grátis</strong>
                    <p>Para compras acima de 500 MT em Maputo</p>
                  </div>
                </div>
                <div className="delivery-item">
                  <span className="icon">⏰</span>
                  <div>
                    <strong>Entrega Rápida</strong>
                    <p>24-48 horas na área metropolitana</p>
                  </div>
                </div>
                <div className="delivery-item">
                  <span className="icon">🔄</span>
                  <div>
                    <strong>Devolução Fácil</strong>
                    <p>7 dias para devoluções</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos Relacionados */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <div className="section-header">
              <h2>Produtos Relacionados</h2>
              <Link to={`/categorias/${slugify(product.categoria)}`} className="view-all-link">
                Ver todos →
              </Link>
            </div>
            <div className="products-grid compact">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="product-card">
                  <div className="product-image">
                    <img
                      src={resolveProductImage(relatedProduct)}
                      onError={onImgError}
                      alt={relatedProduct.nome}
                    />
                    {!relatedProduct.disponivel && (
                      <div className="availability-badge unavailable">
                        Indisponível
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{relatedProduct.nome}</h3>
                    <div className="product-footer">
                      <div className="product-price">
                        {relatedProduct.preco.toLocaleString('pt-MZ', {
                          style: 'currency',
                          currency: 'MZN'
                        })}
                      </div>
                      <button 
                        className={`add-to-cart-btn ${!relatedProduct.disponivel ? 'disabled' : ''}`}
                        onClick={() => navigate(`/produto/${relatedProduct.id}`)}
                      >
                        {relatedProduct.disponivel ? 'Ver Detalhes' : 'Indisponível'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Precisa de ajuda com sua compra?</h2>
            <p>Nossa equipa está pronta para ajudá-lo a encontrar os melhores produtos</p>
            <div className="cta-actions">
              <button 
                onClick={() => navigate('/ajuda')}
                className="cta-button primary"
              >
                📞 Falar com Atendimento
              </button>
              <button 
                onClick={() => navigate('/categorias')}
                className="cta-button secondary"
              >
                🔍 Continuar a Comprar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
