import React, { useEffect, useState } from 'react'

export default function Sobre() {
  const [kpis, setKpis] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    let cancelado = false
    ;(async () => {
      try {
        const resposta = await fetch('/api/metricas', { headers: { Accept: 'application/json' } })
        let dados = null
        try {
          dados = await resposta.json()
        } catch {
          dados = null
        }
        if (!cancelado && dados?.sucesso) {
          setKpis(dados.dados)
        }
      } catch {}
      if (!cancelado) setCarregando(false)
    })()
    return () => { cancelado = true }
  }, [])

  const formatarDinheiro = (valor) => {
    try { 
      return Number(valor || 0).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' }) 
    } catch { 
      return `MT ${Number(valor || 0).toFixed(2)}` 
    }
  }

  return (
    <div className="sobre">
      {/* Hero Section - Com identidade Moçambicana */}
      <section className="hero-mocambique">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🌱 Plataforma 100% Moçambicana</span>
            </div>
            <h1>Conectamos Agricultores Locais com Compradores em Todo Moçambique</h1>
            <p className="hero-subtitle">
              Mercado digital que valoriza produtos nacionais, promove comércio justo e fortalece 
              a economia local através da tecnologia.
            </p>
            <div className="hero-actions">
              <a className="cta-button primary" href="/produtos">
                🛒 Comprar Produtos Locais
              </a>
              <a className="cta-button secondary" href="/produtor/cadastro">
                👨‍🌾 Vender na Plataforma
              </a>
            </div>
            
            {/* Elementos visuais contextuais */}
            <div className="hero-elements">
              <div className="element-item">
                <span>🇲🇿</span>
                <span>Feito em Moçambique</span>
              </div>
              <div className="element-item">
                <span>🌍</span>
                <span>Para Moçambicanos</span>
              </div>
              <div className="element-item">
                <span>💚</span>
                <span>Sustentável</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História e Impacto */}
      <section className="historia-section">
        <div className="container">
          <div className="section-header">
            <h2>Nossa História em Moçambique</h2>
            <p>Nascemos para resolver desafios reais do setor agrícola moçambicano</p>
          </div>

          <div className="historia-content">
            <div className="historia-texto">
              <h3>Do Campo para o Digital</h3>
              <p>
                A SIDES surgiu da necessidade de conectar pequenos e médios agricultores moçambicanos 
                diretamente aos consumidores finais, eliminando intermediários e garantindo preços justos 
                para ambos os lados.
              </p>
              
              <div className="impacto-grid">
                <div className="impacto-item">
                  <div className="impacto-icon">📈</div>
                  <div className="impacto-content">
                    <h4>Mais Renda para Agricultores</h4>
                    <p>Aumento médio de 40% no rendimento dos produtores</p>
                  </div>
                </div>
                <div className="impacto-item">
                  <div className="impacto-icon">🛒</div>
                  <div className="impacto-content">
                    <h4>Preços Acessíveis</h4>
                    <p>Produtos frescos com preços 20% abaixo do mercado tradicional</p>
                  </div>
                </div>
                <div className="impacto-item">
                  <div className="impacto-icon">🚚</div>
                  <div className="impacto-content">
                    <h4>Logística Eficiente</h4>
                    <p>Entrega em Maputo, Matola e arredores em até 24h</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="historia-visual">
              <div className="mz-map">
                <div className="provincia active" data-provincia="Maputo">
                  <span>Maputo</span>
                </div>
                <div className="provincia" data-provincia="Gaza">
                  <span>Gaza</span>
                </div>
                <div className="provincia" data-provincia="Inhambane">
                  <span>Inhambane</span>
                </div>
                <div className="legenda">
                  <div className="legenda-item">
                    <div className="ponto ativo"></div>
                    <span>Já Ativos</span>
                  </div>
                  <div className="legenda-item">
                    <div className="ponto planeado"></div>
                    <span>Em Expansão</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="valores-section">
        <div className="container">
          <div className="section-header">
            <h2>O Que Nos Guia</h2>
            <p>Princípios que orientam cada decisão na nossa plataforma</p>
          </div>

          <div className="valores-grid">
            <div className="valor-card">
              <div className="valor-icon">🎯</div>
              <h3>Missão</h3>
              <p>
                Democratizar o acesso ao mercado agrícola em Moçambique, empoderando pequenos 
                produtores com tecnologia e conectando-os diretamente com consumidores que valorizam 
                produtos frescos e locais.
              </p>
            </div>
            
            <div className="valor-card">
              <div className="valor-icon">🌍</div>
              <h3>Visão</h3>
              <p>
                Ser a principal plataforma digital de comércio agrícola em Moçambique, reconhecida 
                por transformar vidas no campo e promover segurança alimentar através da inovação 
                tecnológica.
              </p>
            </div>
            
            <div className="valor-card">
              <div className="valor-icon">💚</div>
              <h3>Valores</h3>
              <ul className="valores-lista">
                <li>✅ <strong>Transparência:</strong> Preços justos e processos claros</li>
                <li>✅ <strong>Sustentabilidade:</strong> Agricultura responsável</li>
                <li>✅ <strong>Inclusão:</strong> Acesso para todos os produtores</li>
                <li>✅ <strong>Inovação:</strong> Soluções adaptadas à realidade local</li>
                <li>✅ <strong>Qualidade:</strong> Produtos frescos e de origem garantida</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs em Destaque */}
      <section className="metricas-section">
        <div className="container">
          <div className="section-header">
            <h2>O Nosso Impacto em Números</h2>
            <p>Resultados reais que mostram a transformação que estamos a criar</p>
          </div>
          
          <div className="metricas-grid">
            <div className="metrica-card">
              <div className="metrica-icon">🥬</div>
              <div className="metrica-valor">{kpis?.produtos ?? '500+'}</div>
              <div className="metrica-label">Produtos Locais</div>
              <div className="metrica-desc">Frescos e sazonais</div>
            </div>
            
            <div className="metrica-card">
              <div className="metrica-icon">👨‍🌾</div>
              <div className="metrica-valor">{kpis?.produtores ?? '150+'}</div>
              <div className="metrica-label">Agricultores Parceiros</div>
              <div className="metrica-desc">Famílias moçambicanas</div>
            </div>
            
            <div className="metrica-card">
              <div className="metrica-icon">🛒</div>
              <div className="metrica-valor">{kpis?.pedidos_30d ?? '2.5k+'}</div>
              <div className="metrica-label">Pedidos Mensais</div>
              <div className="metrica-desc">Clientes satisfeitos</div>
            </div>
            
            <div className="metrica-card">
              <div className="metrica-icon">💰</div>
              <div className="metrica-valor">{kpis ? formatarDinheiro(kpis.total_vendas_30d) : 'MT 500k+'}</div>
              <div className="metrica-label">Movimentação Mensal</div>
              <div className="metrica-desc">Economia local</div>
            </div>
          </div>
          
          {carregando && (
            <div className="carregando-metricas">
              <div className="spinner"></div>
              <span>A carregar dados em tempo real...</span>
            </div>
          )}
        </div>
      </section>

      {/* Como Funciona - Adaptado à Realidade Moçambicana */}
      <section className="funcionamento-section">
        <div className="container">
          <div className="section-header">
            <h2>Como Funciona na Prática</h2>
            <p>Processo simples pensado para a realidade moçambicana</p>
          </div>

          <div className="passos-grid">
            <div className="passo-item">
              <div className="passo-numero">1</div>
              <div className="passo-icon">📱</div>
              <h3>Acesso por Telemóvel</h3>
              <p>Plataforma otimizada para smartphone, acessível mesmo com internet limitada</p>
            </div>
            
            <div className="passo-item">
              <div className="passo-numero">2</div>
              <div className="passo-icon">🥬</div>
              <h3>Escolha Produtos Locais</h3>
              <p>Navegue por categorias como hortícolas, frutas, cereais e produtos tradicionais</p>
            </div>
            
            <div className="passo-item">
              <div className="passo-numero">3</div>
              <div className="passo-icon">💳</div>
              <h3>Pague à Moçambicana</h3>
              <p>M-Pesa, e-Mola, transferência bancária ou dinheiro na entrega</p>
            </div>
            
            <div className="passo-item">
              <div className="passo-numero">4</div>
              <div className="passo-icon">🚚</div>
              <h3>Receba em Casa</h3>
              <p>Entregas em Maputo e Matola, ou recolha em pontos parceiros</p>
            </div>
          </div>

          {/* Especificidades para Moçambique */}
          <div className="especificidades">
            <div className="especificidade-card">
              <h4>🛡️ Segurança Garantida</h4>
              <ul>
                <li>Pagamentos protegidos e confirmados</li>
                <li>Produtos com origem verificada</li>
                <li>Suporte em Português e línguas locais</li>
              </ul>
            </div>
            
            <div className="especificidade-card">
              <h4>🌱 Compra Consciente</h4>
              <ul>
                <li>Apoie agricultores familiares</li>
                <li>Produtos sazonais e frescos</li>
                <li>Embalagens ecológicas quando possível</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada Final para Ação */}
      <section className="cta-final">
        <div className="container">
          <div className="cta-content">
            <h2>Junte-se à Revolução Agrícola Digital de Moçambique</h2>
            <p>Seja parte da transformação que está a fortalecer a agricultura familiar e a economia local</p>
            <div className="cta-actions">
              <a href="/registro" className="cta-button large primary">
                🛒 Começar a Comprar
              </a>
              <a href="/produtor/cadastro" className="cta-button large secondary">
                👨‍🌾 Começar a Vender
              </a>
            </div>
            <div className="cta-garantia">
              <span>✅ Plataforma segura e confiável</span>
              <span>✅ Suporte dedicado</span>
              <span>✅ Feito para Moçambique</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .sobre {
          font-family: 'Segoe UI', system-ui, sans-serif;
          line-height: 1.6;
        }

        /* Hero Section */
        .hero-mocambique {
          background: linear-gradient(135deg, #2F8C43 0%, #1a5c2a 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-mocambique::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .hero-mocambique h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          font-weight: 700;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .cta-button {
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .cta-button.primary {
          background: #F09E1F;
          color: white;
        }

        .cta-button.secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .hero-elements {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .element-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        /* Container geral */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Headers de seção */
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          color: #2F8C43;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .section-header p {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Seção História */
        .historia-section {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .historia-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .historia-texto h3 {
          font-size: 1.8rem;
          color: #2F8C43;
          margin-bottom: 20px;
        }

        .historia-texto p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 40px;
          color: #555;
        }

        .impacto-grid {
          display: grid;
          gap: 24px;
        }

        .impacto-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .impacto-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .impacto-content h4 {
          margin: 0 0 8px 0;
          color: #333;
        }

        .impacto-content p {
          margin: 0;
          color: #666;
          font-size: 0.95rem;
        }

        .mz-map {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .provincia {
          padding: 12px;
          margin: 8px 0;
          border-radius: 6px;
          background: #e9ecef;
          color: #666;
          font-weight: 500;
        }

        .provincia.active {
          background: #2F8C43;
          color: white;
        }

        .legenda {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 20px;
        }

        .legenda-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .ponto {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .ponto.ativo {
          background: #2F8C43;
        }

        .ponto.planeado {
          background: #e9ecef;
          border: 2px solid #2F8C43;
        }

        /* Seção Valores */
        .valores-section {
          padding: 80px 0;
        }

        .valores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .valor-card {
          background: white;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: transform 0.3s ease;
        }

        .valor-card:hover {
          transform: translateY(-5px);
        }

        .valor-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .valor-card h3 {
          color: #2F8C43;
          margin-bottom: 16px;
          font-size: 1.5rem;
        }

        .valor-card p {
          color: #666;
          line-height: 1.6;
        }

        .valores-lista {
          text-align: left;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .valores-lista li {
          margin-bottom: 8px;
          color: #555;
        }

        /* Seção Métricas */
        .metricas-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1a5c2a 0%, #2F8C43 100%);
          color: white;
        }

        .metricas-section .section-header h2,
        .metricas-section .section-header p {
          color: white;
        }

        .metricas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .metrica-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 40px 20px;
          border-radius: 12px;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .metrica-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .metrica-valor {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .metrica-label {
          font-size: 1.1rem;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .metrica-desc {
          opacity: 0.8;
          font-size: 0.9rem;
        }

        .carregando-metricas {
          text-align: center;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Seção Funcionamento */
        .funcionamento-section {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .passos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .passo-item {
          background: white;
          padding: 40px 24px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .passo-numero {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: #2F8C43;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .passo-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .passo-item h3 {
          color: #2F8C43;
          margin-bottom: 16px;
          font-size: 1.3rem;
        }

        .passo-item p {
          color: #666;
          line-height: 1.6;
        }

        .especificidades {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .especificidade-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .especificidade-card h4 {
          color: #2F8C43;
          margin-bottom: 16px;
          font-size: 1.2rem;
        }

        .especificidade-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .especificidade-card li {
          padding: 8px 0;
          color: #555;
          border-bottom: 1px solid #f0f0f0;
        }

        .especificidade-card li:last-child {
          border-bottom: none;
        }

        /* CTA Final */
        .cta-final {
          padding: 80px 0;
          background: linear-gradient(135deg, #2F8C43 0%, #1a5c2a 100%);
          color: white;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .cta-button.large {
          padding: 20px 40px;
          font-size: 1.1rem;
        }

        .cta-garantia {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .hero-mocambique h1 {
            font-size: 2.2rem;
          }

          .historia-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-actions,
          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .legenda {
            flex-direction: column;
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .hero-mocambique {
            padding: 60px 0;
          }

          .hero-mocambique h1 {
            font-size: 1.8rem;
          }

          .section-header h2 {
            font-size: 1.8rem;
          }

          .container {
            padding: 0 15px;
          }
        }
      `}</style>
    </div>
  )
}