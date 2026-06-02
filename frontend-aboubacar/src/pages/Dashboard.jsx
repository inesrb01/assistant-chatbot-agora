import { useNavigate } from 'react-router-dom'
import { Bot, MessageCircle, FileText, Calendar, LogOut } from 'lucide-react'
import '../styles/Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  return (
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <Bot size={24} color="white" />
            </div>
            <div>
              <p className="sidebar-project">PROJET 6</p>
              <h2 className="sidebar-title">Agora Assistant</h2>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button className="nav-item active" onClick={() => navigate('/chat')}>
              <MessageCircle size={20} />
              <span>Chat</span>
            </button>
            <button className="nav-item" onClick={() => navigate('/documents')}>
              <FileText size={20} />
              <span>Documents</span>
            </button>
            <button className="nav-item" onClick={() => navigate('/rendezvous')}>
              <Calendar size={20} />
              <span>Rendez-vous</span>
            </button>
          </nav>

          <button className="logout-btn" onClick={() => navigate('/login')}>
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-header">
            <div>
              <p className="header-subtitle">INTRANET SÉCURISÉ</p>
              <h1 className="header-title">Bienvenue sur l'Assistant Agora</h1>
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="card" onClick={() => navigate('/chat')}>
              <div className="card-icon chat-icon">
                <MessageCircle size={28} color="#6c63d4" />
              </div>
              <h3>Chat IA</h3>
              <p>Posez vos questions en langage naturel</p>
              <span className="card-link">Ouvrir le chat →</span>
            </div>

            <div className="card" onClick={() => navigate('/documents')}>
              <div className="card-icon docs-icon">
                <FileText size={28} color="#c49a20" />
              </div>
              <h3>Documents</h3>
              <p>Accédez aux formulaires et ressources</p>
              <span className="card-link">Voir les documents →</span>
            </div>

            <div className="card" onClick={() => navigate('/rendezvous')}>
              <div className="card-icon rdv-icon">
                <Calendar size={28} color="#1D9E75" />
              </div>
              <h3>Rendez-vous</h3>
              <p>Planifiez vos rendez-vous avec les services</p>
              <span className="card-link">Prendre un rendez-vous →</span>
            </div>
          </div>
        </main>
      </div>
  )
}

export default Dashboard