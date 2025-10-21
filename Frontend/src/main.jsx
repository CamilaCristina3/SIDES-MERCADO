// frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './App.css'

// Verificação básica - se este console.log aparece, o JS está carregando
console.log('🚀 React app is loading...')

const root = ReactDOM.createRoot(document.getElementById('root'))

// Renderização com tratamento de erro
try {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
  console.log('✅ React app rendered successfully')
} catch (error) {
  console.error('❌ Error rendering React app:', error)
  root.render(<div>Error loading application</div>)
}
