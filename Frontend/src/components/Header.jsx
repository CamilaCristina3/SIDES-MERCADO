import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCategory } from '../context/CategoryContext.js'
import { useCart } from '../context/CartContext.js'

export default function Header() {
  const { categories } = useCategory()
  const { cart } = useCart()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const path = pathname

  // Search UI state
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const produtosActive = /^\/(produtos|categorias)(\b|\/)/.test(path)
  const solucoesActive = /^\/solucoes(\b|\/)/.test(path)

  useEffect(() => {
    if (showSearch && inputRef.current) inputRef.current.focus()
  }, [showSearch])

  function submitSearch(e) {
    e?.preventDefault?.()
    const q = String(query || '').trim()
    setShowSearch(false)
    if (q) navigate(`/categorias?q=${encodeURIComponent(q)}`)
    else navigate('/categorias')
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#2F8C43"/>
                <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6Z" fill="white"/>
                <path d="M16 10C12.686 10 10 12.686 10 16C10 19.314 12.686 22 16 22C19.314 22 22 19.314 22 16C22 12.686 19.314 10 16 10Z" fill="#2F8C43"/>
              </svg>
              <h1>SIDES</h1>
            </Link>
          </div>

          <nav className="nav">
            <Link to="/" className={path === '/' ? 'active' : ''}>Início</Link>
            
            <details className="dropdown" data-active={produtosActive}>
              <summary>Produtos</summary>
              <div className="submenu">
                {categories.map(category => (
                  <Link key={category.id} to={`/categorias/${category.slug}`}>
                    {category.nome}
                  </Link>
                ))}
              </div>
            </details>

            <details className="dropdown" data-active={solucoesActive}>
              <summary>Soluções</summary>
              <div className="submenu">
                <Link to="/produtor/cadastro">Para Produtores</Link>
                <Link to="/categorias">Para Consumidores</Link>
              </div>
            </details>

            <Link to="/sobre" className={path === '/sobre' ? 'active' : ''}>Sobre</Link>
            <Link to="/ajuda" className={path === '/ajuda' ? 'active' : ''}>Ajuda</Link>
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Pesquisar" onClick={() => setShowSearch(s=>!s)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <Link to="/carrinho" className="cart-btn" aria-label="Carrinho">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cart.length > 0 && (
                <span className="cart-count" aria-live="polite">{cart.length}</span>
              )}
            </Link>
            <details className="dropdown">
              <summary>Conta</summary>
              <div className="submenu">
                <Link to="/login">Entrar</Link>
                <Link to="/registro">Criar Conta</Link>
                <Link to="/produtor/cadastro">Sou Produtor</Link>
              </div>
            </details>
          </div>
        </div>
      </header>

      {showSearch && (
        <div className="header-search-panel" role="dialog" aria-modal="true">
          <div className="container">
            <form className="header-search-form" onSubmit={submitSearch}>
              <span className="search-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                ref={inputRef}
                type="search"
                className="header-search-input"
                placeholder="Pesquisar produtos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setShowSearch(false) }}
              />
              <button type="button" className="header-search-close" onClick={() => setShowSearch(false)} aria-label="Fechar pesquisa">✕</button>
              <button type="submit" className="search-button">Pesquisar</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

