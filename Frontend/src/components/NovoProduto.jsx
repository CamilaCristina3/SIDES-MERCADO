import React, { useState } from 'react'
import UploadImagem from './UploadImagem'

export default function NovoProduto() {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState(null)

  const handleSalvar = async () => {
    const novoProduto = { nome, preco: Number(preco), imagem }
    console.log('Produto salvo:', novoProduto)
    alert('Produto salvo (simulado). Implementar POST /api/produtos para persistir.')
  }

  return (
    <div className="container" style={{ maxWidth: 720, padding: 16 }}>
      <h2>Cadastrar Novo Produto</h2>
      <div style={{ display: 'grid', gap: 10, background: '#fff', padding: 16, borderRadius: 12 }}>
        <input placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />

        <UploadImagem onUpload={(url) => setImagem(url)} />

        <button className="icon-btn" onClick={handleSalvar}>Salvar Produto</button>

        {imagem && (
          <div>
            <strong>Pré-visualização:</strong>
            <div style={{ marginTop: 8 }}>
              <img src={imagem} alt="Produto" loading="lazy" decoding="async" style={{ width: 180, borderRadius: 8 }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
