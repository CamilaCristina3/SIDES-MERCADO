import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import Sobre from './pages/Sobre.js';
import Produtos from './pages/Produtos.js';
import ProdutorCadastro from './pages/ProdutorCadastro.js';
import Solucoes from './pages/Solucoes.js';
import './App.css';

export default function App(){
  return (
    <div className="App">
      <Header />
      <main style={{ minHeight: '60vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtor/cadastro" element={<ProdutorCadastro />} />
          <Route path="/solucoes" element={<Solucoes />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
