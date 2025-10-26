// sides-frontend/src/App.jsx
import React, { useMemo } from 'react';
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
import FormasPagamento from './pages/FormasPagamento.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import ClienteLogin from './pages/ClienteLogin.jsx';
import ClienteRegister from './pages/ClienteRegister.jsx';
import ProdutorCadastro from './pages/ProdutorCadastro.jsx';
import AdminUpload from './pages/AdminUpload.jsx';
import NovoProduto from './components/NovoProduto.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProdutorDashboard from './pages/ProdutorDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MinhasCompras from './pages/MinhasCompras.jsx';

function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const auth = useMemo(() => {
    if (typeof window === 'undefined') return { loggedIn: false };
    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const role = user?.tipo || user?.role || null; // 'A' admin | 'P' produtor | 'C' cliente
      return { loggedIn: !!token, user, role };
    } catch {
      return { loggedIn: false };
    }
  }, []);

  function logout() {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch {}
    navigate('/');
  }
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Sides Mercado</h1>
        </div>
        <nav className="nav">
          <NavLink to="/sobre">Quem Somos</NavLink>
          <NavLink to="/solucoes">Soluções</NavLink>

          <details className="dropdown">
            <summary aria-haspopup="menu">Explorar</summary>
            <div className="submenu" role="menu">
              <NavLink to="/produtos" role="menuitem">Produtos</NavLink>
              <NavLink to="/categorias" role="menuitem">Categorias</NavLink>
              <NavLink to="/pagamentos" role="menuitem">Formas de Pagamento</NavLink>
              <NavLink to="/minhas-compras" role="menuitem">Minhas Compras</NavLink>
            </div>
          </details>

          <details className="dropdown">
            <summary aria-haspopup="menu">Conta</summary>
            <div className="submenu" role="menu">
              {/* Acesso geral */}
              <NavLink to="/minhas-compras" role="menuitem">Minhas Compras</NavLink>
              <NavLink to="/carrinho" role="menuitem">Carrinho</NavLink>
              <NavLink to="/checkout" role="menuitem">Checkout</NavLink>

              {/* Fluxo do produtor */}
              <NavLink to="/produtor/cadastro" role="menuitem">Sou Produtor</NavLink>
              {auth.role === 'P' && (
                <NavLink to="/produtor" role="menuitem">Painel Produtor</NavLink>
              )}

              {/* Admin */}
              <NavLink to="/admin/login" role="menuitem">Admin Login</NavLink>
              {auth.role === 'A' && (
                <>
                  <NavLink to="/admin" role="menuitem">Painel Admin</NavLink>
                  <NavLink to="/admin/upload" role="menuitem">Upload de Imagens</NavLink>
                  <NavLink to="/admin/novo-produto" role="menuitem">Novo Produto</NavLink>
                </>
              )}

              {/* Autenticação cliente */}
              {!auth.loggedIn ? (
                <>
                  <NavLink to="/registo" role="menuitem">Registar</NavLink>
                  <NavLink to="/login" role="menuitem">Entrar</NavLink>
                </>
              ) : (
                <button onClick={logout} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '8px 10px', cursor: 'pointer' }} role="menuitem">
                  Sair
                </button>
              )}
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="buscar" onClick={() => navigate('/produtos')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm9.707 13.293-3.4-3.4a1 1 0 1 0-1.414 1.414l3.4 3.4a1 1 0 0 0 1.414-1.414Z" fill="currentColor"/>
            </svg>
          </button>
          <button className="cart-btn" aria-label="carrinho" onClick={() => navigate('/carrinho')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 4h-.5a1 1 0 0 0 0 2H7l1.2 7.2A3 3 0 0 0 11.16 16h5.8a3 3 0 0 0 2.96-2.52l.84-5.04A1 1 0 0 0 19.78 7H8.62L8.3 5.2A2 2 0 0 0 6.33 4H7Zm3.84 10a1 1 0 0 1-.99-.84L9.4 9h9.2l-.67 4.02a1 1 0 0 1-.99.84h-5.1Z" fill="currentColor"/>
              <circle cx="10" cy="19" r="1.5" fill="currentColor"/>
              <circle cx="17" cy="19" r="1.5" fill="currentColor"/>
            </svg>
            <span className="cart-count">{count}</span>
          </button>
        </div>
      </div>
    </header>
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
        <Route path="/pagamentos" element={<FormasPagamento />} />
        <Route path="/login" element={<ClienteLogin />} />
        <Route path="/registo" element={<ClienteRegister />} />
        <Route path="/produtor/cadastro" element={<ProdutorCadastro />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
        <Route path="/admin" element={<ProtectedRoute role="A"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/produtor" element={<ProtectedRoute role="P"><ProdutorDashboard /></ProtectedRoute>} />
        <Route path="/admin/novo-produto" element={<NovoProduto />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/minhas-compras" element={<MinhasCompras />} />
      </Routes>
      <ChatWidget />
      {/* WhatsApp floating button removido por solicitação */}
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  const FB = import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com';
  const IG = import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com';
  const LI = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com';
  return (
    <footer className="footer">
      <div className="container" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 2, minWidth: 260 }}>
          <h3 style={{ marginBottom: 8 }}>SIDES - Sistema Integrado de Desempenho Sustentável, Lda.</h3>
          <p style={{ color: 'var(--text-light)' }}>
            “Promovendo o desenvolvimento sustentável através do agronegócio e do turismo consciente em Moçambique.”
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <strong>Contacto</strong>
          <div style={{ color: 'var(--text-light)' }}>
            <div>Email: <a href="mailto:info@sides.co.mz">info@sides.co.mz</a></div>
            <div>Telefone: <a href="tel:+258852620360">+258 85 262 0360</a></div>
            <div>Endereço: Rua da Frente de Libertação, Nº56, Sommerschield, Maputo – Moçambique</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <strong>Redes sociais</strong>
          <div className="socials" style={{ marginTop: 6 }}>
            <a href={FB} target="_blank" rel="noreferrer" aria-label="Facebook">Facebook</a>
            <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>
            <a href={LI} target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
        <div style={{ width: '100%', marginTop: 10 }}>
          <a
            className="btn-whatsapp"
            href="https://wa.me/258852620360?text=Ol%C3%A1%20SIDES%2C%20preciso%20de%20ajuda"
            target="_blank"
            rel="noreferrer"
            aria-label="Falar no WhatsApp"
          >
            WhatsApp
          </a>
          <span style={{ marginLeft: 8, color: 'var(--text-light)' }}>Atendimento rápido</span>
        </div>
      </div>
    </footer>
  );
}
