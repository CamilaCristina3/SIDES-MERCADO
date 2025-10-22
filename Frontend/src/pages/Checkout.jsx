import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const [metodo, setMetodo] = useState('entrega') // 'entrega' | 'retirada'
  const [pagamento, setPagamento] = useState('mpesa') // mpesa | emola | conta_movel | card | transferencia
  const navigate = useNavigate()
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : ''

  const finalizar = (e) => {
    e.preventDefault()
    if (items.length === 0) {
      alert('Carrinho vazio')
      return
    }
    if (!token) {
      alert('Para concluir a compra, por favor inicie sessão.')
      navigate('/login')
      return
    }
    if (pagamento === 'transferencia') {
      const ref = 'SIDES-' + Math.random().toString(36).slice(2, 8).toUpperCase()
      alert(`Gerada referência ${ref}. Por favor efetue a transferência e envie o comprovativo para info@sides.co.mz.`)
    } else if (['mpesa','emola','conta_movel'].includes(pagamento)) {
      alert(`Pagamento via ${pagamento.toUpperCase()} será processado. Receberá confirmação por SMS/Email.`)
    } else if (pagamento === 'card') {
      alert('Redirecionaremos para pagamento seguro por cartão (simulado).')
    }
    clear()
    navigate('/')
  }

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h2>Checkout</h2>
        {items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <div style={{ background: '#fff', borderRadius: 10, padding: 12, margin: '12px 0' }}>
              <h3>Resumo do Pedido</h3>
              <ul>
                {items.map((it) => (
                  <li key={it.id}>
                    {it.quantity} × {it.nome} —{' '}
                    {(it.preco * it.quantity).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 8 }}><strong>Total: {total.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</strong></div>
            </div>

            <form onSubmit={finalizar} style={{ display: 'grid', gap: 10 }}>
              <div>
                <label>
                  <input type="radio" name="metodo" value="entrega" checked={metodo === 'entrega'} onChange={() => setMetodo('entrega')} />
                  Entrega
                </label>
                <label style={{ marginLeft: 16 }}>
                  <input type="radio" name="metodo" value="retirada" checked={metodo === 'retirada'} onChange={() => setMetodo('retirada')} />
                  Retirar no local
                </label>
              </div>

              <input name="nome" placeholder="Nome completo" required style={{ padding: '8px 12px' }} />
              <input name="email" type="email" placeholder="E-mail" required style={{ padding: '8px 12px' }} />
              {metodo === 'entrega' && (
                <>
                  <input name="endereco" placeholder="Endereço para entrega" required style={{ padding: '8px 12px' }} />
                  <input name="cidade" placeholder="Cidade" required style={{ padding: '8px 12px' }} />
                </>
              )}

              <div style={{ background: '#fff', borderRadius: 10, padding: 12 }}>
                <h3>Forma de Pagamento</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label><input type="radio" name="pagamento" value="mpesa" checked={pagamento==='mpesa'} onChange={()=>setPagamento('mpesa')} /> Mpesa (Vodacom)</label>
                  <label><input type="radio" name="pagamento" value="emola" checked={pagamento==='emola'} onChange={()=>setPagamento('emola')} /> E-Mola (Tmcel)</label>
                  <label><input type="radio" name="pagamento" value="conta_movel" checked={pagamento==='conta_movel'} onChange={()=>setPagamento('conta_movel')} /> Conta Móvel (Movitel)</label>
                  <label><input type="radio" name="pagamento" value="card" checked={pagamento==='card'} onChange={()=>setPagamento('card')} /> Cartão (Visa/Mastercard)</label>
                  <label><input type="radio" name="pagamento" value="transferencia" checked={pagamento==='transferencia'} onChange={()=>setPagamento('transferencia')} /> Transferência Bancária</label>
                </div>
                <p style={{ marginTop: 8, color: '#6b7280' }}>
                  Para detalhes de cada opção, visite a página <a href="/pagamentos">Formas de Pagamento</a>.
                </p>
              </div>

              <button type="submit">Finalizar Compra</button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
