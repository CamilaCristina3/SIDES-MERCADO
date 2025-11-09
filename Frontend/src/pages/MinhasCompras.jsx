import React, { useEffect, useState } from 'react'

export default function MinhasCompras() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('orders')
      const list = raw ? JSON.parse(raw) : []
      setOrders(list.reverse())
    } catch {
      setOrders([])
    }
  }, [])

  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 900 }}>
        <h2>Minhas Compras</h2>
        {orders.length === 0 ? (
          <p>Você ainda não tem encomendas registradas neste dispositivo.</p>
        ) : (
          <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            {orders.map((o) => (
              <div key={o.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <strong>Encomenda {o.id}</strong>
                    <div style={{ color: '#6b7280', fontSize: 14 }}>{new Date(o.createdAt).toLocaleString('pt-MZ')}</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>{o.total.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</div>
                </div>
                <div style={{ color: '#6b7280', fontSize: 14, marginTop: 6 }}>
                  Método: {o.metodo === 'retirada' ? 'Retirar' : 'Entrega'} • Pagamento: {o.pagamento.toUpperCase()}
                </div>
                <ul style={{ marginTop: 10 }}>
                  {o.items.map((it) => (
                    <li key={it.id}>
                      {it.quantity} x {it.nome} — {(it.preco * it.quantity).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 8 }}>
                  <span style={{ background: '#eef3ec', color: '#2f6d3b', padding: '4px 10px', borderRadius: 999, fontSize: 12 }}>Estado: {o.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


