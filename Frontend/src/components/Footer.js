import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Ajuda() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('geral')
  const [termoPesquisa, setTermoPesquisa] = useState('')

  // FAQs organizadas por categoria
  const faqs = {
    geral: [
      {
        pergunta: "O que é a SIDES Mercado?",
        resposta: "A SIDES Mercado é uma plataforma digital 100% moçambicana que conecta agricultores locais diretamente com consumidores, eliminando intermediários e garantindo preços justos para ambos os lados."
      },
      {
        pergunta: "Como posso criar uma conta?",
        resposta: "Clique em 'Criar Conta' no canto superior direito, preencha seus dados pessoais e confirme seu email. O processo é gratuito e leva menos de 2 minutos."
      },
      {
        pergunta: "A plataforma é segura?",
        resposta: "Sim! Utilizamos criptografia SSL, seguimos as melhores práticas de segurança e estamos em conformidade com a Lei de Proteção de Dados Pessoais de Moçambique."
      }
    ],
    compras: [
      {
        pergunta: "Quais métodos de pagamento aceitam?",
        resposta: "Aceitamos M-Pesa, e-Mola, transferências bancárias, cartões de crédito/débito e pagamento na entrega (apenas para Maputo e Matola)."
      },
      {
        pergunta: "Como funciona a entrega?",
        resposta: "Entregamos em Maputo e Matola em 24-48h. Fora destas áreas, trabalhamos com pontos de recolha parceiros. O custo de entrega varia consoante a localização."
      },
      {
        pergunta: "Posso devolver um produto?",
        resposta: "Sim, aceitamos devoluções em 7 dias para produtos não perecíveis. Para produtos frescos, a qualidade é verificada no momento da entrega."
      },
      {
        pergunta: "Os preços incluem IVA?",
        resposta: "Sim, todos os preços na plataforma incluem IVA conforme a legislação moçambicana. O valor total é sempre mostrado antes da confirmação do pedido."
      }
    ],
    vendedores: [
      {
        pergunta: "Como me torno um agricultor parceiro?",
        resposta: "Registe-se como produtor, complete o perfil com documentos válidos e submeta seus produtos. Nossa equipa fará a verificação em até 48h."
      },
      {
        pergunta: "Quais as comissões da plataforma?",
        resposta: "Cobramos uma comissão de 15% sobre as vendas, que inclui processamento de pagamento, suporte ao cliente e manutenção da plataforma."
      },
      {
        pergunta: "Como recebo os pagamentos?",
        resposta: "Os pagamentos são processados semanalmente através de transferência bancária, M-Pesa ou e-Mola, conforme sua preferência."
      },
      {
        pergunta: "Preciso de fatura?",
        resposta: "Sim, emitimos fatura electrónica para todas as transações, em conformidade com a Autoridade Tributária de Moçambique."
      }
    ],
    tecnico: [
      {
        pergunta: "A plataforma funciona em telemóveis antigos?",
        resposta: "Sim, otimizamos a plataforma para funcionar mesmo em dispositivos com poucos recursos e conexões de internet limitadas."
      },
      {
        pergunta: "Como altero minha palavra-passe?",
        resposta: "Aceda ao seu perfil > Configurações de Segurança > Alterar Palavra-passe. Enviaremos um email de confirmação."
      },
      {
        pergunta: "Não consigo aceder à minha conta",
        resposta: "Use a opção 'Recuperar Palavra-passe' na página de login ou contacte nosso suporte através do email suporte@sides.co.mz"
      }
    ]
  }

  const categorias = [
    { id: 'geral', nome: '📋 Geral', icon: '📋' },
    { id: 'compras', nome: '🛒 Compras', icon: '🛒' },
    { id: 'vendedores', nome: '👨‍🌾 Vendedores', icon: '👨‍🌾' },
    { id: 'tecnico', nome: '📱 Técnico', icon: '📱' }
  ]

  const faqsFiltradas = faqs[categoriaAtiva].filter(faq => 
    faq.pergunta.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
    faq.resposta.toLowerCase().includes(termoPesquisa.toLowerCase())
  )

  return (
    <div className="ajuda-container">
      {/* Hero Section */}
      <section className="ajuda-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Centro de Ajuda SIDES</h1>
            <p>Encontre respostas rápidas para suas dúvidas ou entre em contacto com nossa equipa</p>
            
            {/* Barra de Pesquisa */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Pesquisar por palavra-chave (ex: pagamento, entrega, conta...)"
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                className="search-input"
              />
              <button className="search-button">
                🔍 Pesquisar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="ajuda-content">
        <div className="container">
          <div className="ajuda-layout">
            {/* Sidebar de Categorias */}
            <aside className="categorias-sidebar">
              <h3>Categorias de Ajuda</h3>
              <nav className="categorias-nav">
                {categorias.map(categoria => (
                  <button
                    key={categoria.id}
                    className={`categoria-btn ${categoriaAtiva === categoria.id ? 'active' : ''}`}
                    onClick={() => {
                      setCategoriaAtiva(categoria.id)
                      setTermoPesquisa('')
                    }}
                  >
                    <span className="categoria-icon">{categoria.icon}</span>
                    <span className="categoria-nome">{categoria.nome}</span>
                  </button>
                ))}
              </nav>

              {/* Contacto Rápido */}
              <div className="contacto-rapido">
                <h4>📞 Contacto Rápido</h4>
                <div className="contacto-info">
                  <div className="contacto-item">
                    <strong>Email:</strong>
                    <a href="mailto:suporte@sides.co.mz">suporte@sides.co.mz</a>
                  </div>
                  <div className="contacto-item">
                    <strong>Telefone:</strong>
                    <a href="tel:+258841234567">+258 84 123 4567</a>
                  </div>
                  <div className="contacto-item">
                    <strong>Horário:</strong>
                    <span>Seg-Sex: 8h-18h</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Conteúdo das FAQs */}
            <main className="faqs-content">
              <div className="faqs-header">
                <h2>{categorias.find(c => c.id === categoriaAtiva)?.nome}</h2>
                <p>Encontre respostas para as dúvidas mais frequentes</p>
              </div>

              {termoPesquisa && (
                <div className="resultados-pesquisa">
                  <p>
                    {faqsFiltradas.length} resultado(s) encontrado(s) para "{termoPesquisa}"
                  </p>
                </div>
              )}

              <div className="faqs-list">
                {faqsFiltradas.length > 0 ? (
                  faqsFiltradas.map((faq, index) => (
                    <FAQItem 
                      key={index} 
                      pergunta={faq.pergunta} 
                      resposta={faq.resposta} 
                    />
                  ))
                ) : (
                  <div className="sem-resultados">
                    <h3>😕 Nenhum resultado encontrado</h3>
                    <p>Tente pesquisar com outras palavras-chave ou entre em contacto com nosso suporte.</p>
                  </div>
                )}
              </div>

              {/* Ainda precisa de ajuda? */}
              <div className="ajuda-extra">
                <div className="ajuda-card">
                  <div className="ajuda-icon">💬</div>
                  <div className="ajuda-content">
                    <h3>Ainda precisa de ajuda?</h3>
                    <p>Nossa equipa de suporte está pronta para ajudá-lo com qualquer dúvida ou problema.</p>
                    <div className="ajuda-actions">
                      <a href="mailto:suporte@sides.co.mz" className="cta-button primary">
                        📧 Enviar Email
                      </a>
                      <a href="tel:+258841234567" className="cta-button secondary">
                        📞 Ligar Agora
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Informações Legais e Links */}
      <section className="info-legal">
        <div className="container">
          <h2>Informações Legais e Documentação</h2>
          <div className="docs-grid">
            <div className="doc-card">
              <h4>📄 Termos de Serviço</h4>
              <p>Condições gerais de uso da plataforma, em conformidade com a legislação moçambicana e recomendações da UE para e-commerce.</p>
              <a href="/termos-servico" className="doc-link">Ler Documento →</a>
            </div>
            <div className="doc-card">
              <h4>🛡️ Política de Privacidade</h4>
              <p>Como protegemos e utilizamos seus dados pessoais, seguindo a Lei de Proteção de Dados Pessoais de Moçambique.</p>
              <a href="/privacidade" className="doc-link">Ler Documento →</a>
            </div>
            <div className="doc-card">
              <h4>⚖️ Conformidade Legal</h4>
              <p>Documentação sobre nossa conformidade com COBIT, regulamentações locais e melhores práticas internacionais.</p>
              <a href="/conformidade" className="doc-link">Ler Documento →</a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ajuda-container {
          min-height: 100vh;
          background: #f8f9fa;
        }

        /* Hero Section */
        .ajuda-hero {
          background: linear-gradient(135deg, #2F8C43 0%, #1a5c2a 100%);
          color: white;
          padding: 80px 0 60px;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-bar {
          display: flex;
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .search-input {
          flex: 1;
          padding: 16px 20px;
          border: none;
          outline: none;
          font-size: 1rem;
          background: transparent;
        }

        .search-button {
          background: #F09E1F;
          color: white;
          border: none;
          padding: 16px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          white-space: nowrap;
        }

        .search-button:hover {
          background: #dd8b1a;
        }

        /* Layout Principal */
        .ajuda-content {
          padding: 60px 0;
        }

        .ajuda-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* Sidebar */
        .categorias-sidebar {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 20px;
        }

        .categorias-sidebar h3 {
          color: #2F8C43;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .categorias-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 30px;
        }

        .categoria-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          color: #555;
        }

        .categoria-btn:hover {
          background: #f8f9fa;
          color: #2F8C43;
        }

        .categoria-btn.active {
          background: #2F8C43;
          color: white;
        }

        .categoria-icon {
          font-size: 1.2rem;
          width: 24px;
          text-align: center;
        }

        .categoria-nome {
          font-weight: 500;
        }

        .contacto-rapido {
          border-top: 1px solid #e9ecef;
          padding-top: 20px;
        }

        .contacto-rapido h4 {
          color: #2F8C43;
          margin-bottom: 16px;
          font-size: 1.1rem;
        }

        .contacto-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contacto-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contacto-item strong {
          color: #333;
          font-size: 0.9rem;
        }

        .contacto-item a, .contacto-item span {
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .contacto-item a:hover {
          color: #2F8C43;
        }

        /* Conteúdo das FAQs */
        .faqs-content {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .faqs-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .faqs-header h2 {
          color: #2F8C43;
          margin-bottom: 8px;
          font-size: 2rem;
        }

        .faqs-header p {
          color: #666;
          margin: 0;
        }

        .resultados-pesquisa {
          background: #e7f3ff;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          border-left: 4px solid #2F8C43;
        }

        .resultados-pesquisa p {
          margin: 0;
          color: #2F8C43;
          font-weight: 500;
        }

        .faqs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .sem-resultados {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .sem-resultados h3 {
          margin-bottom: 12px;
          color: #333;
        }

        /* Ajuda Extra */
        .ajuda-extra {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 40px;
          border-radius: 12px;
          border: 1px solid #e9ecef;
        }

        .ajuda-card {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .ajuda-icon {
          font-size: 3rem;
          flex-shrink: 0;
        }

        .ajuda-content h3 {
          color: #2F8C43;
          margin-bottom: 8px;
          font-size: 1.5rem;
        }

        .ajuda-content p {
          color: #666;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .ajuda-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
        }

        .cta-button.primary {
          background: #2F8C43;
          color: white;
        }

        .cta-button.secondary {
          background: transparent;
          color: #2F8C43;
          border: 2px solid #2F8C43;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        /* Informações Legais */
        .info-legal {
          padding: 80px 0;
          background: white;
        }

        .info-legal h2 {
          text-align: center;
          color: #2F8C43;
          margin-bottom: 40px;
          font-size: 2.5rem;
        }

        .docs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .doc-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          transition: transform 0.3s ease;
        }

        .doc-card:hover {
          transform: translateY(-5px);
        }

        .doc-card h4 {
          color: #2F8C43;
          margin-bottom: 12px;
          font-size: 1.3rem;
        }

        .doc-card p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .doc-link {
          color: #2F8C43;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .doc-link:hover {
          color: #1a5c2a;
        }

        /* Responsividade */
        @media (max-width: 1024px) {
          .ajuda-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .categorias-sidebar {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .ajuda-hero {
            padding: 60px 0 40px;
          }

          .hero-content h1 {
            font-size: 2.2rem;
          }

          .search-bar {
            flex-direction: column;
          }

          .search-input {
            padding: 12px 16px;
          }

          .search-button {
            padding: 12px 16px;
          }

          .ajuda-content {
            padding: 40px 0;
          }

          .faqs-content {
            padding: 30px 20px;
          }

          .ajuda-card {
            flex-direction: column;
            text-align: center;
          }

          .ajuda-actions {
            justify-content: center;
          }

          .info-legal h2 {
            font-size: 2rem;
          }

          .docs-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 1.8rem;
          }

          .faqs-header h2 {
            font-size: 1.5rem;
          }

          .cta-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

// Componente para cada item FAQ
function FAQItem({ pergunta, resposta }) {
  const [aberto, setAberto] = useState(false)

  return (
    <div className={`faq-item ${aberto ? 'aberto' : ''}`}>
      <button 
        className="faq-pergunta"
        onClick={() => setAberto(!aberto)}
      >
        <span className="faq-texto">{pergunta}</span>
        <span className="faq-icone">{aberto ? '➖' : '➕'}</span>
      </button>
      {aberto && (
        <div className="faq-resposta">
          <p>{resposta}</p>
        </div>
      )}

      <style jsx>{`
        .faq-item {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item.aberto {
          border-color: #2F8C43;
          box-shadow: 0 4px 12px rgba(47, 140, 67, 0.1);
        }

        .faq-pergunta {
          width: 100%;
          padding: 20px;
          background: white;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: background 0.3s ease;
          text-align: left;
        }

        .faq-pergunta:hover {
          background: #f8f9fa;
        }

        .faq-texto {
          font-weight: 600;
          color: #333;
          font-size: 1rem;
          flex: 1;
          margin-right: 16px;
        }

        .faq-icone {
          color: #2F8C43;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .faq-resposta {
          padding: 0 20px 20px;
          background: white;
        }

        .faq-resposta p {
          margin: 0;
          color: #666;
          line-height: 1.6;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  )
}

