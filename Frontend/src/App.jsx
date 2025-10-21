// sides-frontend/src/App.jsx
import React from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';
import Home from './pages/Home.jsx';
import Solucoes from './pages/Solucoes.jsx';
import Produtos from './pages/Produtos.jsx';
import Categorias from './pages/Categorias.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Carrinho from './pages/Carrinho.jsx';
import Checkout from './pages/Checkout.jsx';
import Sobre from './pages/Sobre.jsx';
import './App.css';

function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Sides Mercado</h1>
        </div>
        <nav className="nav">
          <NavLink to="/sobre">Quem Somos</NavLink>
          <NavLink to="/solucoes">Soluções</NavLink>
          <NavLink to="/produtos">Produtos</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
          <NavLink to="/cadastro">Cadastre</NavLink>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="buscar" onClick={() => navigate('/produtos')}>
            🔍
          </button>
          <button className="cart-btn" aria-label="carrinho" onClick={() => navigate('/carrinho')}>
            🛒 <span className="cart-count">{count}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="#sobre">Sobre Nós</a>
          <a href="#privacidade">Política de Privacidade</a>
          <a href="#contatos">Contactos</a>
          <a href="#termos">Termos de Uso</a>
        </div>
        <div className="socials">
          <a href="#" aria-label="Instagram">📷</a>
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="WhatsApp">🟢</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
}
