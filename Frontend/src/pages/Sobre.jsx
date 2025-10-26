import React from 'react'

export default function Sobre() {
  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 900, display: 'grid', gap: 16 }}>
        <h2>Quem Somos</h2>
        <p>
           Acesso direto aos melhores produtos agrícolas, frescos da quinta para sua mesa. 
           Conheça a história por trás de cada produto e apoie agricultores locais.
        </p>

        <h3>Nossa Missão</h3>
        <p>
          Conectar diretamente produtores agrícolas com consumidores finais e empresas, 
          garantindo preços justos para ambos os lados. 
          Promovemos o comércio sustentável e o acesso a produtos frescos e de qualidade.
        </p>

        <h3>Nossa Visão</h3>
        <p>
         Ser a principal plataforma digital de comércio agrícola em Moçambique, 
        revolucionando a forma como produtores e consumidores se conectam. 
        Queremos construir uma comunidade sustentável onde todos beneficiam.
        </p>

        <h3>Valores</h3>
        <p>Sustentabilidade, Transparência, Inclusão, Inovação e Equidade.</p>
      </div>
    </section>
  )
}

