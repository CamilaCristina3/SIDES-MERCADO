import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiFetch } from '@/lib/api'

export default function CadastroCliente() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('registro') // 'registro' ou 'login'
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  // Estados para registro
  const [registro, setRegistro] = useState({
    primeiro_nome: '',
    ultimo_nome: '',
    email: '',
    palavra_passe: '',
    confirmar_palavra_passe: '',
    telefone: '',
    morada: '',
    provincia: '',
    distrito: '',
    aceito_termos: false,
    newsletter: true
  })

  // Estados para login
  const [login, setLogin] = useState({
    email: '',
    palavra_passe: '',
    lembrar_me: false
  })

  // Funções de atualização
  const atualizarRegistro = (campo, valor) => {
    setRegistro(prev => ({ ...prev, [campo]: valor }))
    setErro('')
  }

  const atualizarLogin = (campo, valor) => {
    setLogin(prev => ({ ...prev, [campo]: valor }))
    setErro('')
  }

  // Validação do formulário de registro
  const validarRegistro = () => {
    if (!registro.primeiro_nome.trim() || registro.primeiro_nome.length < 2) {
      setErro('Nome deve ter pelo menos 2 caracteres')
      return false
    }
    if (!registro.ultimo_nome.trim() || registro.ultimo_nome.length < 2) {
      setErro('Sobrenome deve ter pelo menos 2 caracteres')
      return false
    }
    if (!registro.email.trim() || !/\S+@\S+\.\S+/.test(registro.email)) {
      setErro('Email válido é obrigatório')
      return false
    }
    if (registro.palavra_passe.length < 8) {
      setErro('A palavra-passe deve ter pelo menos 8 caracteres')
      return false
    }
    if (registro.palavra_passe !== registro.confirmar_palavra_passe) {
      setErro('As palavras-passe não coincidem')
      return false
    }
    if (!registro.telefone.trim()) {
      setErro('Telefone é obrigatório')
      return false
    }
    if (!registro.aceito_termos) {
      setErro('Deve aceitar os termos e condições')
      return false
    }
    return true
  }

  // Validação do formulário de login
  const validarLogin = () => {
    if (!login.email.trim() || !/\S+@\S+\.\S+/.test(login.email)) {
      setErro('Email válido é obrigatório')
      return false
    }
    if (login.palavra_passe.length < 8) {
      setErro('Palavra-passe é obrigatória')
      return false
    }
    return true
  }

  // Submissão do registro
  const submeterRegistro = async (e) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (!validarRegistro()) return

    setCarregando(true)

    try {
      const payload = {
        primeiro_nome: registro.primeiro_nome,
        ultimo_nome: registro.ultimo_nome,
        email: registro.email,
        palavra_passe: registro.palavra_passe,
        telefone: registro.telefone,
        morada: registro.morada || '',
        provincia: registro.provincia || '',
        distrito: registro.distrito || '',
        newsletter: registro.newsletter,
        tipo: 'C' // Cliente
      }

      const resposta = await apiFetch('/utilizadores/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const dados = await resposta.json()

      if (!resposta.ok || !dados?.sucesso) {
        throw new Error(dados?.mensagem || 'Erro no registo. Tente novamente.')
      }

      // Guardar token e dados do utilizador
      localStorage.setItem('authToken', dados.token)
      localStorage.setItem('user', JSON.stringify(dados.utilizador))
      
      setSucesso('Conta criada com sucesso! A redirecionar...')
      
      // Redirecionar para a página inicial após 2 segundos
      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (err) {
      setErro(err.message || 'Erro no registo. Verifique os dados e tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  // Submissão do login
  const submeterLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (!validarLogin()) return

    setCarregando(true)

    try {
      const payload = {
        email: login.email,
        palavra_passe: login.palavra_passe
      }

      const resposta = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const dados = await resposta.json()

      if (!resposta.ok || !dados?.sucesso) {
        throw new Error(dados?.mensagem || 'Credenciais inválidas')
      }

      // Guardar token e dados do utilizador
      localStorage.setItem('authToken', dados.token)
      localStorage.setItem('user', JSON.stringify(dados.utilizador))
      
      if (login.lembrar_me) {
        localStorage.setItem('lembrarMe', 'true')
      }
      
      setSucesso('Login realizado com sucesso! A redirecionar...')
      
      // Redirecionar imediatamente
      navigate('/')

    } catch (err) {
      setErro(err.message || 'Erro no login. Verifique as credenciais.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Cabeçalho */}
        <div className="auth-header">
          <div className="logo">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0Z" fill="#2F8C43"/>
                <path d="M28 15H12C10.9 15 10 15.9 10 17V23C10 24.1 10.9 25 12 25H28C29.1 25 30 24.1 30 23V17C30 15.9 29.1 15 28 15Z" fill="#F09E1F"/>
                <path d="M22 19C22 20.66 20.66 22 19 22C17.34 22 16 20.66 16 19C16 17.34 17.34 16 19 16C20.66 16 22 17.34 22 19Z" fill="white"/>
              </svg>
            </div>
            <div className="logo-text">
              <h2>SIDES</h2>
              <p>Plataforma Digital Sustentável</p>
            </div>
          </div>
          <p className="auth-subtitle">
            {modo === 'registro' 
              ? 'Junte-se à nossa comunidade de clientes conscientes' 
              : 'Aceda à sua conta de cliente'
            }
          </p>
        </div>

        {/* Alternar entre Registro/Login */}
        <div className="auth-tabs">
          <button 
            className={`tab ${modo === 'registro' ? 'active' : ''}`}
            onClick={() => setModo('registro')}
          >
            ✨ Criar Conta
          </button>
          <button 
            className={`tab ${modo === 'login' ? 'active' : ''}`}
            onClick={() => setModo('login')}
          >
            🔐 Entrar
          </button>
        </div>

        {/* Mensagens de feedback */}
        {erro && (
          <div className="alert error">
            <span className="alert-icon">⚠️</span>
            <div className="alert-content">
              <strong>Erro</strong>
              <span>{erro}</span>
            </div>
          </div>
        )}

        {sucesso && (
          <div className="alert success">
            <span className="alert-icon">✅</span>
            <div className="alert-content">
              <strong>Sucesso</strong>
              <span>{sucesso}</span>
            </div>
          </div>
        )}

        {/* Formulário de REGISTRO */}
        {modo === 'registro' && (
          <form onSubmit={submeterRegistro} className="auth-form">
            <div className="form-section">
              <h4>Informações Pessoais</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome *</label>
                  <input
                    type="text"
                    value={registro.primeiro_nome}
                    onChange={(e) => atualizarRegistro('primeiro_nome', e.target.value)}
                    placeholder="Seu nome"
                    disabled={carregando}
                    maxLength={60}
                  />
                </div>

                <div className="form-group">
                  <label>Sobrenome *</label>
                  <input
                    type="text"
                    value={registro.ultimo_nome}
                    onChange={(e) => atualizarRegistro('ultimo_nome', e.target.value)}
                    placeholder="Seu sobrenome"
                    disabled={carregando}
                    maxLength={60}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={registro.email}
                  onChange={(e) => atualizarRegistro('email', e.target.value)}
                  placeholder="seu@email.com"
                  disabled={carregando}
                />
              </div>

              <div className="form-group">
                <label>Telefone *</label>
                <input
                  type="tel"
                  value={registro.telefone}
                  onChange={(e) => atualizarRegistro('telefone', e.target.value)}
                  placeholder="+258 8X XXX XXXX"
                  disabled={carregando}
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Segurança da Conta</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Palavra-passe *</label>
                  <input
                    type="password"
                    value={registro.palavra_passe}
                    onChange={(e) => atualizarRegistro('palavra_passe', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    disabled={carregando}
                  />
                  <div className="password-strength">
                    {registro.palavra_passe.length > 0 && (
                      <div className={`strength-bar ${registro.palavra_passe.length < 8 ? 'weak' : registro.palavra_passe.length < 12 ? 'medium' : 'strong'}`}>
                        <div className="strength-fill"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirmar palavra-passe *</label>
                  <input
                    type="password"
                    value={registro.confirmar_palavra_passe}
                    onChange={(e) => atualizarRegistro('confirmar_palavra_passe', e.target.value)}
                    placeholder="Repita a palavra-passe"
                    disabled={carregando}
                  />
                  {registro.confirmar_palavra_passe && registro.palavra_passe !== registro.confirmar_palavra_passe && (
                    <span className="field-error">As palavras-passe não coincidem</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Localização (Opcional)</h4>
              <div className="form-group">
                <label>Morada</label>
                <input
                  type="text"
                  value={registro.morada}
                  onChange={(e) => atualizarRegistro('morada', e.target.value)}
                  placeholder="Sua morada completa"
                  disabled={carregando}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Província</label>
                  <input
                    type="text"
                    value={registro.provincia}
                    onChange={(e) => atualizarRegistro('provincia', e.target.value)}
                    placeholder="Sua província"
                    disabled={carregando}
                  />
                </div>

                <div className="form-group">
                  <label>Distrito</label>
                  <input
                    type="text"
                    value={registro.distrito}
                    onChange={(e) => atualizarRegistro('distrito', e.target.value)}
                    placeholder="Seu distrito"
                    disabled={carregando}
                  />
                </div>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={registro.aceito_termos}
                  onChange={(e) => atualizarRegistro('aceito_termos', e.target.checked)}
                  disabled={carregando}
                />
                <span>
                  Aceito os <Link to="/termos" className="link">termos e condições</Link> e a <Link to="/privacidade" className="link">política de privacidade</Link>
                </span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={registro.newsletter}
                  onChange={(e) => atualizarRegistro('newsletter', e.target.checked)}
                  disabled={carregando}
                />
                <span>
                  Desejo receber novidades e promoções por email
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="auth-button primary"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <span className="loading-spinner"></span>
                  A processar...
                </>
              ) : (
                '🎉 Criar Conta de Cliente'
              )}
            </button>

            <div className="auth-divider">
              <span>ou</span>
            </div>

            <button type="button" className="auth-button secondary">
              <span className="social-icon">📱</span>
              Continuar com telemóvel
            </button>
          </form>
        )}

        {/* Formulário de LOGIN */}
        {modo === 'login' && (
          <form onSubmit={submeterLogin} className="auth-form">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={login.email}
                onChange={(e) => atualizarLogin('email', e.target.value)}
                placeholder="seu@email.com"
                disabled={carregando}
              />
            </div>

            <div className="form-group">
              <label>Palavra-passe *</label>
              <input
                type="password"
                value={login.palavra_passe}
                onChange={(e) => atualizarLogin('palavra_passe', e.target.value)}
                placeholder="Sua palavra-passe"
                disabled={carregando}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={login.lembrar_me}
                  onChange={(e) => atualizarLogin('lembrar_me', e.target.checked)}
                  disabled={carregando}
                />
                <span>Lembrar-me</span>
              </label>
              <Link to="/recuperar-password" className="forgot-password">
                Esqueceu a palavra-passe?
              </Link>
            </div>

            <button 
              type="submit" 
              className="auth-button primary"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <span className="loading-spinner"></span>
                  A entrar...
                </>
              ) : (
                '🔐 Entrar na Minha Conta'
              )}
            </button>

            <div className="auth-divider">
              <span>ou</span>
            </div>

            <button type="button" className="auth-button secondary">
              <span className="social-icon">📱</span>
              Entrar com telemóvel
            </button>
          </form>
        )}

        {/* Rodapé */}
        <div className="auth-footer">
          {modo === 'registro' ? (
            <p>
              Já tem uma conta?{' '}
              <button 
                type="button" 
                className="link-button"
                onClick={() => setModo('login')}
              >
                Faça login aqui
              </button>
            </p>
          ) : (
            <p>
              Não tem uma conta?{' '}
              <button 
                type="button" 
                className="link-button"
                onClick={() => setModo('registro')}
              >
                Registe-se aqui
              </button>
            </p>
          )}
          
          <div className="security-notice">
            <span>🔒</span>
            <span>Os seus dados estão protegidos e seguros</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2F8C43 0%, #1a5c2a 100%);
          padding: 20px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .auth-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          padding: 40px;
          width: 100%;
          max-width: 480px;
          position: relative;
          overflow: hidden;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2F8C43, #F09E1F);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .logo-icon {
          flex-shrink: 0;
        }

        .logo-text h2 {
          margin: 0;
          color: #2F8C43;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .logo-text p {
          margin: 4px 0 0 0;
          color: #666;
          font-size: 0.9rem;
        }

        .auth-subtitle {
          color: #666;
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
        }

        .auth-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 30px;
          background: #f8f9fa;
          padding: 6px;
          border-radius: 12px;
        }

        .tab {
          padding: 14px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          color: #666;
        }

        .tab.active {
          background: white;
          color: #2F8C43;
          box-shadow: 0 2px 8px rgba(47, 140, 67, 0.15);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-section {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e9ecef;
        }

        .form-section h4 {
          margin: 0 0 16px 0;
          color: #2F8C43;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .form-group input {
          padding: 14px 16px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: white;
        }

        .form-group input:focus {
          outline: none;
          border-color: #2F8C43;
          box-shadow: 0 0 0 3px rgba(47, 140, 67, 0.1);
        }

        .form-group input:disabled {
          background-color: #f8f9fa;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .password-strength {
          margin-top: 4px;
        }

        .strength-bar {
          height: 4px;
          background: #e9ecef;
          border-radius: 2px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          transition: all 0.3s ease;
        }

        .strength-bar.weak .strength-fill {
          width: 33%;
          background: #e53e3e;
        }

        .strength-bar.medium .strength-fill {
          width: 66%;
          background: #dd6b20;
        }

        .strength-bar.strong .strength-fill {
          width: 100%;
          background: #38a169;
        }

        .field-error {
          color: #e53e3e;
          font-size: 0.8rem;
          margin-top: 4px;
        }

        .form-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
          font-size: 0.9rem;
          color: #555;
          line-height: 1.4;
        }

        .checkbox-label input {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .link {
          color: #2F8C43;
          text-decoration: none;
          font-weight: 500;
        }

        .link:hover {
          text-decoration: underline;
        }

        .forgot-password {
          color: #2F8C43;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        .auth-button {
          padding: 16px 20px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .auth-button.primary {
          background: linear-gradient(135deg, #2F8C43, #256735);
          color: white;
        }

        .auth-button.primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(47, 140, 67, 0.3);
        }

        .auth-button.secondary {
          background: white;
          color: #333;
          border: 2px solid #e9ecef;
        }

        .auth-button.secondary:hover:not(:disabled) {
          border-color: #2F8C43;
          color: #2F8C43;
        }

        .auth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .social-icon {
          font-size: 18px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: #666;
          font-size: 0.9rem;
          margin: 8px 0;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e9ecef;
        }

        .auth-divider span {
          padding: 0 16px;
        }

        .alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .alert.error {
          background: #fed7d7;
          color: #c53030;
          border: 1px solid #feb2b2;
        }

        .alert.success {
          background: #c6f6d5;
          color: #276749;
          border: 1px solid #9ae6b4;
        }

        .alert-icon {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .alert-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .alert-content strong {
          font-size: 0.9rem;
        }

        .alert-content span {
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .auth-footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          color: #666;
          font-size: 0.9rem;
        }

        .link-button {
          background: none;
          border: none;
          color: #2F8C43;
          cursor: pointer;
          text-decoration: underline;
          font-size: inherit;
          font-weight: 500;
        }

        .link-button:hover {
          color: #256735;
        }

        .security-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 0.85rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .auth-card {
            padding: 30px 20px;
            margin: 10px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 16px;
          }

          .logo {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .auth-tabs {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 10px;
          }

          .auth-card {
            padding: 24px 16px;
          }

          .auth-button {
            padding: 14px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}
