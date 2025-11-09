import React from 'react'

export default function FormasPagamento() {
  return (
    <section className="about-section">
      <div className="container" style={{ maxWidth: 900, display: 'grid', gap: 16 }}>
        <h2>Formas de Pagamento</h2>
        <p>Oferecemos múltiplas opções para facilitar a sua compra:</p>

        <h3>Mpesa (Vodacom)</h3>
        <p>Integração via API oficial. No checkout, selecione Mpesa e siga as instruções.</p>

        <h3>E-Mola (Tmcel)</h3>
        <p>Pagamento via gateway local. Similar ao Mpesa, com confirmação automática.</p>

        <h3>Conta Móvel (Movitel)</h3>
        <p>Integração básica/manual. Após escolher esta opção, iremos confirmar o pagamento por referência.</p>

        <h3>Cartão (Visa/Mastercard)</h3>
        <p>Via parceiros como Stripe, PayGate ou Flutterwave. O checkout direciona para uma página segura.</p>

        <h3>Transferência Bancária</h3>
        <p>
          Geração de referência e upload do comprovativo. O sistema notifica comprador e vendedor.
        </p>
      </div>
    </section>
  )}


