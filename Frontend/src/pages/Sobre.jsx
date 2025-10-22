import React from 'react'

export default function Sobre() {
  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 900, display: 'grid', gap: 16 }}>
        <h2>Quem Somos</h2>
        <p>
          A SIDES é uma empresa moçambicana focada em promover o desenvolvimento sustentável
          via soluções digitais para o agronegócio e turismo comunitário.
        </p>

        <h3>Nossa Missão</h3>
        <p>
          Empoderar produtores agrícolas e comunidades turísticas com inclusão financeira e comércio justo.
        </p>

        <h3>Nossa Visão</h3>
        <p>
          Ser a principal plataforma digital sustentável de Moçambique, conectando comunidades ao mercado
          com inovação e impacto positivo.
        </p>

        <h3>Valores</h3>
        <p>Sustentabilidade, Transparência, Inclusão, Inovação e Equidade.</p>
      </div>
    </section>
  )
}

