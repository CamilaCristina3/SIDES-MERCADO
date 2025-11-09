import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Pages
import Home from './pages/Home.jsx'
import Produtos from './pages/Produtos.jsx'
import Categorias from './pages/Categorias.jsx'
import Carrinho from './pages/Carrinho.jsx'
import Checkout from './pages/Checkout.jsx'
import ClienteLogin from './pages/ClienteLogin.jsx'
import ClienteRegister from './pages/ClienteRegister.jsx'
import FormasPagamento from './pages/FormasPagamento.jsx'
import MinhasCompras from './pages/MinhasCompras.jsx'
import ProdutorCadastro from './pages/ProdutorCadastro.jsx'
import ProdutorDashboard from './pages/ProdutorDashboard.jsx'
import Sobre from './pages/Sobre.jsx'
import Solucoes from './pages/Solucoes.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminUpload from './pages/AdminUpload.jsx'

// Admin utilities/components
import NovoProduto from './components/NovoProduto.jsx'

function NotFound() {
  return (
    <section className="about-section">
      <div className="container" style={{ padding: '40px 20px' }}>
        <h2>Página não encontrada</h2>
        <p>O recurso solicitado não existe.</p>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Loja */}
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:slug" element={<Categorias />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/formas-pagamento" element={<FormasPagamento />} />
          <Route path="/minhas-compras" element={<MinhasCompras />} />

          {/* Conta do cliente */}
          <Route path="/login" element={<ClienteLogin />} />
          <Route path="/registro" element={<ClienteRegister />} />
          <Route path="/registo" element={<ClienteRegister />} />
          <Route path="/cadastro" element={<ClienteRegister />} />

          {/* Produtor */}
          <Route path="/produtor/cadastro" element={<ProdutorCadastro />} />
          <Route
            path="/produtor/dashboard"
            element={
              <ProtectedRoute role="P">
                <ProdutorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="A">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/upload"
            element={
              <ProtectedRoute role="A">
                <AdminUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/novo-produto"
            element={
              <ProtectedRoute role="A">
                <NovoProduto />
              </ProtectedRoute>
            }
          />

          {/* Institucional */}
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/solucoes" element={<Solucoes />} />

          {/* Alias comuns */}
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

