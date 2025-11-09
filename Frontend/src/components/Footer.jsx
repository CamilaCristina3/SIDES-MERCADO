import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SIDES Mercado</h3>
            <p>Conectando agricultores moçambicanos com consumidores através de uma plataforma digital segura e eficiente.</p>
          </div>
          
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <div className="footer-links">
              <Link to="/sobre">Sobre Nós</Link>
              <Link to="/produtos">Produtos</Link>
              <Link to="/ajuda">Ajuda</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <div className="footer-links">
              <Link to="/termos">Termos de Serviço</Link>
              <Link to="/politica-privacidade">Política de Privacidade</Link>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Email: info@sides.co.mz</p>
            <p>Telefone: +258 84 123 4567</p>
            <p>Endereço: Maputo, Moçambique</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 SIDES Mercado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
