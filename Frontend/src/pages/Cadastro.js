import React from 'react'

export default function Cadastro() {
  return (
    <section className="signup-section">
      <div className="container">
        <h2>Seja um Agricultor Parceiro</h2>
        <p>Deixe seu contato e retornaremos para concluir o cadastro.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const nome = form.get('nome')
            const email = form.get('email')
            alert(`Obrigado, ${nome}! Entraremos em contato em ${email}.`)
            e.currentTarget.reset()
          }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}
        >
          <input name="nome" placeholder="Seu nome" required style={{ padding: '8px 12px' }} />
          <input name="email" type="email" placeholder="Seu e-mail" required style={{ padding: '8px 12px' }} />
          <button type="submit">Enviar Interesse</button>
        </form>
      </div>
    </section>
  )
}

