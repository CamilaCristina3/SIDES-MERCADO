import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Header(){
  return (
    <header className="header">
      <div className="container">
        <div className="logo"><h1>SIDES</h1></div>
        <nav className="nav">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
          <NavLink to="/solucoes">Soluções</NavLink>
          <NavLink to="/produtos">Produtos</NavLink>
          <NavLink to="/produtor/cadastro">Sou Produtor</NavLink>
        </nav>
      </div>
    </header>
  );
}
