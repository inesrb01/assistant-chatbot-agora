import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, User, Send, FileText, Calendar, MessageCircle, LogOut } from 'lucide-react'
import '../styles/Chat.css'

const suggestions = [
  'Où consulter mon horaire de cours ?',
  'Comment demander une reprise d\'examen ?',
  'Je cherche un formulaire administratif',
  'Comment ouvrir un billet au soutien TI ?',
]

const documents = [
  { title: 'Guide des évaluations et reprises', desc: 'Règles générales sur les examens, absences et reprises.' },
  { title: 'Répertoire des formulaires étudiants', desc: 'Attestations, relevés et documents officiels.' },
  { title: 'Politique d\'utilisation responsable de l\'IA', desc: 'Règles de confidentialité et bonnes pratiques.' },
  { title: 'Procédure de soutien informatique', desc: 'Comment ouvrir un billet pour mot de passe, Wi-Fi.' },
]

function Chat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Bonjour. Posez une question sur les horaires, examens, formulaires, ressources, rendez-vous ou le soutien TI.' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = (text) => {
    const msg = text || input
    if (!msg.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: 'Je traite votre demande. Cette fonctionnalité sera connectée à l\'API OpenAI.' }])
    }, 1000)
  }

  return (
      <div className="chat-container">
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
              <MessageCircle size={20} /><span>Chat</span>
            </button>
            <button className="nav-item" onClick={() => navigate('/documents')}>
              <FileText size={20} /><span>Documents</span>
            </button>
            <button className="nav-item" onClick={() => navigate('/rendezvous')}>
              <Calendar size={20} /><span>Rendez-vous</span>
            </button>
          </nav>
          <button className="logout-btn" onClick={() => navigate('/login')}>
            <LogOut size={18} /><span>Déconnexion</span>
          </button>
        </aside>

        <main className="chat-main">
          <div className="chat-header">
            <div>
              <p className="header-subtitle">INTRANET SÉCURISÉ</p>
              <h1 className="header-title">Assistant de services aux utilisateurs</h1>
            </div>
            <div className="ia-badge">
              <Bot size={16} /> IA + base interne
            </div>
          </div>

          <div className="chat-content">
            <div className="chat-zone">
              <div className="chat-label">
                <span>CONVERSATION</span>
                <span className="chat-sublabel">Questions en langage naturel</span>
              </div>

              <div className="suggestions">
                {suggestions.map((s, i) => (
                    <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>
                      {s}
                    </button>
                ))}
              </div>

              <div className="messages">
                {messages.map((m, i) => (
                    <div key={i} className={`message ${m.role}`}>
                      <div className="message-icon">
                        {m.role === 'bot' ? <Bot size={18} /> : <User size={18} />}
                      </div>
                      <div className="message-text">{m.text}</div>
                    </div>
                ))}
              </div>

              <div className="chat-input-zone">
                <input
                    type="text"
                    placeholder="Posez votre question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="send-btn" onClick={() => sendMessage()}>
                  <Send size={20} />
                </button>
              </div>
            </div>

            <div className="docs-panel">
              <div className="docs-label">RECHERCHE</div>
              <h3 className="docs-title">Documents</h3>
              <div className="docs-search">
                <input type="text" placeholder="formulaire, examen, TI..." />
              </div>
              <div className="docs-list">
                {documents.map((d, i) => (
                    <div key={i} className="doc-item">
                      <h4>{d.title}</h4>
                      <p>{d.desc}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}

export default Chat