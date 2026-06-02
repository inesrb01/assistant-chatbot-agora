import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, Shield, Mail, Lock } from 'lucide-react'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  const fillDemo = (type) => {
    if (type === 'etudiant') {
      setEmail('etudiant@college.local')
      setPassword('etudiant123')
    } else if (type === 'enseignant') {
      setEmail('enseignant@college.local')
      setPassword('enseignant123')
    } else {
      setEmail('admin@college.local')
      setPassword('admin123')
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">
            <Bot size={28} color="white" />
          </div>
          <div>
            <p className="login-subtitle">AGORA LCI EDUCATION</p>
            <h1 className="login-title">Assistant intranet</h1>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Courriel institutionnel</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="etudiant@college.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login">
            <Shield size={18} />
            Se connecter
          </button>
        </form>

        <div className="demo-accounts">
          <span>Comptes demo</span>
          <button onClick={() => fillDemo('etudiant')}>Étudiant</button>
          <button onClick={() => fillDemo('enseignant')}>Enseignant</button>
          <button onClick={() => fillDemo('admin')}>Admin</button>
        </div>
      </div>
    </div>
  )
}

export default Login