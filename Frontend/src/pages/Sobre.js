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
    <div className="sobre-page">
      <section className="sobre-hero">
        <div className="container">
          <div className="sobre-hero-content">
            <div className="sobre-hero-badge">
              <span>🌱 Plataforma 100% Moçambicana</span>
            </div>
            <h1>Conectamos Agricultores Locais com Compradores em Todo Moçambique</h1>
            <p className="sobre-hero-subtitle">
              Mercado digital que valoriza produtos nacionais, promove comércio justo e fortalece 
              a economia local através da tecnologia.
            </p>
            <div className="sobre-hero-actions">
              <a className="cta-button primary" href="/produtos">
                🛒 Comprar Produtos Locais
              </a>
              <a className="cta-button secondary" href="/produtor/cadastro">
                👨‍🌾 Vender na Plataforma
              </a>
            </div>
            
            <div className="sobre-hero-elements">
              <div className="sobre-element-item">
                <span>🇲🇿</span>
                <span>Feito em Moçambique</span>
              </div>
              <div className="sobre-element-item">
                <span>🌍</span>
                <span>Para Moçambicanos</span>
              </div>
              <div className="sobre-element-item">
                <span>💚</span>
                <span>Sustentável</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="cta-final">
        <div className="container">
          <div className="cta-content">
            <h2>Junte-se à Revolução Agrícola Digital de Moçambique</h2>
            <p>Seja parte da transformação que está a fortalecer a agricultura familiar e a economia local</p>
            <div className="cta-final-actions">
              <a href="/registro" className="cta-button large primary">
                🛒 Começar a Comprar
              </a>
              <a href="/produtor/cadastro" className="cta-button large secondary">
                👨‍🌾 Começar a Vender
              </a>
            </div>
            <div className="cta-garantia">
              <span> Plataforma segura e confiável</span>
              <span> Suporte dedicado</span>
              <span> Feito para Moçambique</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}