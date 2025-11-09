import React from 'react';
export default function Footer(){
  return (
    <footer className="footer">
      <div className="container" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1.6, minWidth: 260 }}>
          <strong>SIDES</strong>
          <p style={{ color: 'var(--text-light)' }}>Soluções para agronegócio e turismo sustentável.</p>
        </div>
      </div>
    </footer>
  );
}
