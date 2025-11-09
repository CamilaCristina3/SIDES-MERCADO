import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CategoryProvider } from './context/CategoryContext.js'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Produtos from './pages/Produtos'
import ProdutorCadastro from './pages/ProdutorCadastro'
import Solucoes from './pages/Solucoes'
import './App.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Algo deu errado</h2>
          <p>{this.state.error?.message || 'Erro desconhecido'}</p>
          <button onClick={() => window.location.reload()}>
            Recarregar Página
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <main style={{ minHeight: '60vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtor/cadastro" element={<ProdutorCadastro />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="*" element={
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Página não encontrada</h2>
                <p>A página que você está procurando não existe.</p>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
