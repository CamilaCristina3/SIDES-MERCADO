import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import About from '../components/About/About'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard/ProductCard'

const Home = () => {
  const [products, setProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const navigate = useNavigate()

  // Mock data com produtos agrícolas reais (valores em Metical)
  useEffect(() => {
    const mockProducts = [
      // VERDURAS
      { id: 1, name: 'Espinafres Frescos', price: 2.50, description: 'Espinafres biológicos colhidos diariamente, ricos em ferro', category: 'Verduras', available: true, unit: 'molho', supplier: 'Quinta Verde', rating: 4.8 },
      { id: 2, name: 'Alface Americana', price: 1.80, description: 'Alface crocante e fresca, ideal para saladas', category: 'Verduras', available: true, unit: 'unidade', supplier: 'Horta da Maria', rating: 4.6 },
      { id: 3, name: 'Couve Portuguesa', price: 1.20, description: 'Couve tradicional portuguesa, perfeita para caldos', category: 'Verduras', available: true, unit: 'unidade', supplier: 'Quinta Familiar', rating: 4.7 },
      // HORTÍCOLAS
      { id: 4, name: 'Tomate Coração de Boi', price: 3.20, description: 'Tomates grandes e saborosos, ideais para saladas', category: 'Hortícolas', available: true, unit: 'kg', supplier: 'Horta Biológica', rating: 4.9 },
      { id: 5, name: 'Cenouras Baby', price: 2.80, description: 'Cenouras pequenas e doces, colhidas na manhã', category: 'Hortícolas', available: true, unit: 'kg', supplier: 'Campo Dourado', rating: 4.5 },
      { id: 6, name: 'Pimentos Vermelhos', price: 4.50, description: 'Pimentos carnudos e doces, perfeitos para grelhados', category: 'Hortícolas', available: true, unit: 'kg', supplier: 'Horta Solar', rating: 4.7 },
      // CEREAIS
      { id: 7, name: 'Arroz Carolino', price: 2.20, description: 'Arroz tradicional português, grão redondo e cremoso', category: 'Cereais', available: true, unit: 'kg', supplier: 'Arrozeiras do Tejo', rating: 4.8 },
      { id: 8, name: 'Aveia em Flocos', price: 3.50, description: 'Aveia integral em flocos, ideal para papas e granola', category: 'Cereais', available: true, unit: 'kg', supplier: 'Cereais do Norte', rating: 4.6 },
      { id: 9, name: 'Trigo para Moagem', price: 2.80, description: 'Trigo nacional para fazer pão caseiro', category: 'Cereais', available: true, unit: 'kg', supplier: 'Campo de Trigo', rating: 4.4 },
      // FRUTAS
      { id: 10, name: 'Maçãs Fuji', price: 2.90, description: 'Maçãs doces e crocantes, colhidas no pico de maturação', category: 'Frutas', available: true, unit: 'kg', supplier: 'Pomares da Serra', rating: 4.7 },
      { id: 11, name: 'Laranjas Algarve', price: 2.50, description: 'Laranjas sumarentas do Algarve, ricas em vitamina C', category: 'Frutas', available: true, unit: 'kg', supplier: 'Citrinos do Sul', rating: 4.9 },
      { id: 12, name: 'Morangos Planta', price: 5.90, description: 'Morangos frescos da planta, doces e aromáticos', category: 'Frutas', available: false, unit: 'bandeja', supplier: 'Berries & Co', rating: 4.8 },
      // LEGUMINOSAS
      { id: 13, name: 'Feijão Catarino', price: 4.20, description: 'Feijão tradicional português, ideal para feijoada', category: 'Leguminosas', available: true, unit: 'kg', supplier: 'Legumes do Campo', rating: 4.6 },
      { id: 14, name: 'Grão-de-Bico', price: 3.80, description: 'Grão-de-bico nacional, perfeito para saladas e ensopados', category: 'Leguminosas', available: true, unit: 'kg', supplier: 'Quinta Seca', rating: 4.5 },
      // RAÍZES
      { id: 15, name: 'Batata Doce', price: 2.20, description: 'Batata doce laranja, naturalmente doce e nutritiva', category: 'Raízes', available: true, unit: 'kg', supplier: 'Raízes da Terra', rating: 4.7 },
      { id: 16, name: 'Cebolas Amarelas', price: 1.80, description: 'Cebolas de sabor suave, ideais para cozinhar', category: 'Raízes', available: true, unit: 'kg', supplier: 'Horta Nacional', rating: 4.4 },
      // ERVAS AROMÁTICAS
      { id: 17, name: 'Manjericão Fresco', price: 1.50, description: 'Manjericão fresco, aroma intenso para pizzas e pesto', category: 'Ervas Aromáticas', available: true, unit: 'molho', supplier: 'Ervas do Chefe', rating: 4.8 },
      { id: 18, name: 'Salsa e Coentros', price: 1.20, description: 'Mix de salsa e coentros frescos, para temperar', category: 'Ervas Aromáticas', available: true, unit: 'molho', supplier: 'Aromas do Campo', rating: 4.6 },
    ]
    setProducts(mockProducts)
    setFeaturedProducts(mockProducts.slice(0, 8))
    setLoading(false)
  }, [])

  const handleAddToCart = (product) => {
    addItem(product)
    try {
      // feedback simples
      alert(`Adicionado ${product.name} ao carrinho!`)
    } catch {}
  }

  const handleToggleFavorite = (id, fav) => {
    console.log(`Produto ${id} ${fav ? 'adicionado aos' : 'removido dos'} favoritos`)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>A carregar produtos...</p>
      </div>
    )
  }

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <span className="badge">🌱 100% Produtos Locais</span>
              <h2>Da  Terra para o Consumidor </h2>
              <p>
                Conectamos diretamente produtores agrícolas a consumidores e empresas.
                Produtos frescos, preços justos e comércio sustentável.
              </p>
              <div className="hero-actions">
                <button className="cta-button" onClick={() => navigate('/produtos')}>Comprar Agora</button>
                <button className="ghost-button" onClick={() => navigate('/produtor/cadastro')}>Ser Produtor</button>
              </div>

              {/* KPIs do Hero */}
              <div className="hero-kpis">
                <div className="kpi"><strong>18</strong><span>Categorias</span></div>
                <div className="kpi"><strong>50+</strong><span>Produtores</span></div>
                <div className="kpi"><strong>100+</strong><span>Produtos</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <About />

      {/* Categorias */}
      <section className="how-section" id="categories">
        <div className="container">
          <div className="section-header">
            <h2>Nossas Categorias</h2>
            <p>Descubra a variedade de produtos agrícolas disponíveis</p>
          </div>
          <div className="how-cards">
            <div className="how-card"><div className="how-icon">🥬</div><h3>Verduras</h3><p>Espinafres, alface, couve e outras verduras frescas</p></div>
            <div className="how-card"><div className="how-icon">🥦</div><h3>Hortícolas</h3><p>Tomate, cenoura, pimento e outros produtos hortícolas</p></div>
            <div className="how-card"><div className="how-icon">🌾</div><h3>Cereais</h3><p>Arroz, aveia, trigo e outros cereais nacionais</p></div>
            <div className="how-card"><div className="how-icon">🍎</div><h3>Frutas</h3><p>Maçãs, laranjas, morangos e frutas da época</p></div>
            <div className="how-card"><div className="how-icon">🫘</div><h3>Leguminosas</h3><p>Feijão, grão-de-bico, lentilhas e outras leguminosas</p></div>
            <div className="how-card"><div className="how-icon">🥔</div><h3>Raízes</h3><p>Batata, batata-doce, cebola e outros tubérculos</p></div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2>Produtos em Destaque</h2>
          <p>Os produtos mais frescos dos nossos agricultores parceiros</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
        <div className="section-footer" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn-outline" onClick={() => navigate('/produtos')}>Ver Todos os Produtos</button>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="how-section" id="business">
        <div className="container">
          <div className="section-header">
            <h2>Soluções para Empresas</h2>
            <p>Fornecemos produtos agrícolas de qualidade para o seu negócio</p>
          </div>
          <div className="how-cards">
            <div className="how-card">
              <div className="how-icon">🍽️</div>
              <h3>Restaurantes</h3>
              <p>Ingredientes frescos diretamente para sua cozinha com entrega programada e certificação de qualidade.</p>
            </div>
            <div className="how-card">
              <div className="how-icon">🛒</div>
              <h3>Mercearias</h3>
              <p>Abasteça sua loja com produtos locais de qualidade, preços competitivos e logística eficiente.</p>
            </div>
            <div className="how-card">
              <div className="how-icon">🏭</div>
              <h3>Distribuidores</h3>
              <p>Parcerias estratégicas para revenda em grande escala com volume flexível e suporte dedicado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona - Processo Real */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <h2>Como Funciona</h2>
            <p>Processo simples e transparente para comprar produtos agricolas</p>
          </div>

          <div className="how-cards">
            <div className="how-card">
              <div className="how-icon">🛒</div>
              <h3>1. Escolha & Adicione</h3>
              <p>Navegue pelos produtos disponiveis de produtores verificados e adicione ao carrinho</p>
              <div className="step-details">
                <span className="step-badge">Catalogo Completo</span>
                <span className="step-badge">Produtos Locais</span>
              </div>
            </div>

            <div className="how-card">
              <div className="how-icon">📋</div>
              <h3>2. Finalize a Encomenda</h3>
              <p>Revise seu carrinho, selecione metodo de pagamento e confirme os dados</p>
              <div className="step-details">
                <span className="step-badge">Pagamento Seguro</span>
                <span className="step-badge">Dados Protegidos</span>
              </div>
            </div>

            <div className="how-card">
              <div className="how-icon">✅</div>
              <h3>3. Confirmacao & Recolha</h3>
              <p>Receba confirmacao da encomenda e escolha o local de recolha mais conveniente</p>
              <div className="step-details">
                <span className="step-badge">Confirmacao Imediata</span>
                <span className="step-badge">Multiplos Pontos</span>
              </div>
            </div>

            <div className="how-card">
              <div className="how-icon">🚚</div>
              <h3>4. Receba seu Pedido</h3>
              <p>Recolha no local escolhido ou receba entrega direta do produtor</p>
              <div className="step-details">
                <span className="step-badge">Fresco Garantido</span>
                <span className="step-badge">Rastreavel</span>
              </div>
            </div>
          </div>

          {/* Detalhes do Processo */}
          <div className="process-details">
            <div className="process-info">
              <h4>📍 Pontos de Recolha Disponiveis</h4>
              <div className="location-grid">
                <div className="location-item">
                  <span className="location-icon">🏪</span>
                  <div>
                    <strong>Lojas Parceiras</strong>
                    <p>Mercearias e estabelecimentos locais</p>
                  </div>
                </div>
                <div className="location-item">
                  <span className="location-icon">🏢</span>
                  <div>
                    <strong>Centros de Distribuicao</strong>
                    <p>Pontos centrais em cada cidade</p>
                  </div>
                </div>
                <div className="location-item">
                  <span className="location-icon">👨‍🌾</span>
                  <div>
                    <strong>Diretamente do Produtor</strong>
                    <p>Recolha na quinta ou quintal</p>
                  </div>
                </div>
                <div className="location-item">
                  <span className="location-icon">🚚</span>
                  <div>
                    <strong>Entrega ao Domicilio</strong>
                    <p>Entregas diretas para sua casa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="process-timeline">
              <h4>⏱️ Timeline Tipico</h4>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker">📅</div>
                  <div className="timeline-content">
                    <strong>Dia 0 - Encomenda</strong>
                    <p>Realize sua compra ate as 18h</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker">✅</div>
                  <div className="timeline-content">
                    <strong>Dia 0 - Confirmacao</strong>
                    <p>Confirmacao imediata por email/SMS</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker">📍</div>
                  <div className="timeline-content">
                    <strong>Dia 1 - Preparacao</strong>
                    <p>Produtos recolhidos e preparados</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker">🚚</div>
                  <div className="timeline-content">
                    <strong>Dia 2 - Recolha/Entrega</strong>
                    <p>Disponivel para recolha ou entrega</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (Mantém outras secções abaixo se existirem) */}
    </div>
  )
}

export default Home
