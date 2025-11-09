import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export default function Solucoes() {
  const [searchParams] = useSearchParams()
  const tipo = searchParams.get('tipo')

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {tipo === 'produtores' && (
        <div>
          <h1>Soluções para Produtores</h1>
          <p>Ferramentas e recursos para impulsionar suas vendas.</p>
          <Link to="/produtor/cadastro" className="cta-button primary">
            Cadastrar como Produtor
          </Link>
        </div>
      )}

      {tipo === 'consumidores' && (
        <div>
          <h1>Soluções para Consumidores</h1>
          <p>Compre produtos frescos diretamente do produtor.</p>
          <Link to="/produtos" className="cta-button primary">
            Ver Produtos
          </Link>
        </div>
      )}

      {!tipo && (
        <div>
          <h1>Nossas Soluções</h1>
          <p>Selecione para quem são as soluções:</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <Link to="/solucoes?tipo=produtores" className="cta-button">
              Para Produtores
            </Link>
            <Link to="/solucoes?tipo=consumidores" className="cta-button">
              Para Consumidores
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
