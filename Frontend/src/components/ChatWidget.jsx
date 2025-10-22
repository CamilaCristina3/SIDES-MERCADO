import React, { useMemo, useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Olá! Sou o assistente da SIDES. Como posso ajudar?' }
  ])
  const [input, setInput] = useState('')

  const faqs = useMemo(() => ([
    { q: ['como me registro', 'como me registo', 'cadastro', 'registo'], a: 'Para se registar, aceda ao menu “Cadastre” no topo e preencha os seus dados. Se preferir, vá direto: /cadastro' },
    { q: ['navegar', 'como navegar', 'como uso', 'ajuda'], a: 'Use o menu para explorar: Produtos, Categorias, Quem Somos e Formas de Pagamento. Para comprar, adicione itens ao carrinho e siga para o Checkout.' },
    { q: ['pagamento', 'mpesa', 'visa', 'cartão', 'transferência', 'emola', 'conta móvel'], a: 'Aceitamos Mpesa (Vodacom), E-Mola (Tmcel), Conta Móvel (Movitel), cartões via Visa/Mastercard e transferência bancária. Veja detalhes em /pagamentos.' },
    { q: ['falar com humano', 'atendente', 'contacto', 'contato', 'suporte'], a: 'Claro! Envie um email para info@sides.co.mz ou ligue +258 84 123 4567. Em breve ofereceremos chat humano integrado.' },
  ]), [])

  function findAnswer(text) {
    const t = (text || '').toLowerCase()
    for (const item of faqs) {
      if (item.q.some(k => t.includes(k))) return item.a
    }
    return 'Posso ajudar com registo, navegação e pagamentos. Para suporte humano: info@sides.co.mz ou +258 84 123 4567.'
  }

  function sendMessage(e) {
    e?.preventDefault()
    const question = input.trim()
    if (!question) return
    const answer = findAnswer(question)
    setMessages(prev => [...prev, { role: 'user', text: question }, { role: 'assistant', text: answer }])
    setInput('')
  }

  return (
    <>
      <button
        className="chat-fab"
        aria-label={open ? 'Fechar chat' : 'Abrir chat'}
        onClick={() => setOpen(o => !o)}
      >
        {open ? '×' : '💬'}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="SIDES Assistente" aria-modal="false">
          <div className="chat-header">
            <strong>SIDES Assistente</strong>
            <button className="chat-close" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="bubble">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-quick">
            <button onClick={() => setInput('Como me registro?')}>Registo</button>
            <button onClick={() => setInput('Como navegar na plataforma?')}>Navegação</button>
            <button onClick={() => setInput('Quais formas de pagamento?')}>Pagamentos</button>
            <a className="chat-link" href="mailto:info@sides.co.mz">Falar com humano</a>
          </div>
          <form className="chat-input" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua pergunta..."
              aria-label="Mensagem"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </>
  )
}

