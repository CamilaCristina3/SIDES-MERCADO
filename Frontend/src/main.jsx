// frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.js'
import { HelpProvider } from './context/HelpContext.js'
import { CategoryProvider } from './context/CategoryContext.js'
import './App.css'

console.log('🚀 React app is loading...')

const root = ReactDOM.createRoot(document.getElementById('root'))

// Se o App não carregar, vamos tentar carregar um componente de fallback
function Fallback() {
  return <div>Loading...</div>
}

const AppComponent = App ? App : Fallback

try {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <CartProvider>
          <HelpProvider>
            <CategoryProvider>
              <AppComponent />
            </CategoryProvider>
          </HelpProvider>
        </CartProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
  console.log('✅ React app rendered successfully')
} catch (error) {
  console.error('❌ Error rendering React app:', error)
  root.render(<div>Error loading application. Please check the console.</div>)
}
