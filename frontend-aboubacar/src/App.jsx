import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Bot,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  FileText,
  Home,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
  UserRound,
  X
} from "lucide-react";
import { apiRequest, clearSession, getSavedUser, saveSession } from "./api.js";

const demoAccounts = [
  { label: "Étudiant", email: "etudiant@college.local" },
  { label: "Enseignant", email: "enseignant@college.local" },
  { label: "Administration", email: "admin@college.local" }
];
const PASSWORD = "Agora2026!";

const quickQuestions = [
  "Où consulter mon horaire de cours ?",
  "Comment demander une reprise d'examen ?",
  "Je veux un document officiel",
  "Problème de connexion Agora"
];

function Login({ onLogin }) {
  const [email, setEmail] = useState("etudiant@college.local");
  const [password, setPassword] = useState(PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      saveSession(data.token, data.user);
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
      <main className="login-page">
        <section className="login-card">
          <div className="brand"><Bot size={36} /><span>Agora Chatbot Stage</span></div>
          <h1>Assistant intranet scolaire</h1>
          <p>Connecte-toi avec un compte démo pour tester le site intranet, le chatbot, les documents et les rendez-vous.</p>
          <form onSubmit={handleSubmit}>
            <label>Courriel</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Mot de passe</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            {error && <div className="error">{error}</div>}
            <button disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</button>
          </form>
          <div className="quick-logins">
            {demoAccounts.map((account) => (
                <button key={account.email} type="button" onClick={() => { setEmail(account.email); setPassword(PASSWORD); }}>
                  {account.label}
                </button>
            ))}
          </div>
        </section>
      </main>
  );
}

function ChatWidget({ user }) {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("Où consulter mon horaire de cours ?");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiRequest("/api/chat/history")
        .then((data) => setMessages(data.messages || []))
        .catch(() => {});
  }, []);

  async function sendMessage(event, suggestedQuestion) {
    event?.preventDefault();
    const question = suggestedQuestion || message;
    if (!question.trim()) return;
    setMessage("");
    setOpen(true);
    setLoading(true);
    try {
      const data = await apiRequest("/api/chat/message", {
        method: "POST",
        body: JSON.stringify({ message: question })
      });
      setMessages((old) => [...old, data]);
    } catch (err) {
      setMessages((old) => [...old, { question, answer: err.message, sources: [] }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
        <button className="chat-floating" onClick={() => setOpen(true)} aria-label="Ouvrir Agora Chatbot">
          <MessageCircle size={24} />
        </button>
    );
  }

  return (
      <aside className="chat-widget">
        <div className="chat-header">
          <div className="chat-title">
            <div className="chat-icon"><Bot /></div>
            <div>
              <strong>Agora Chatbot</strong>
              <span>Assistant intelligent</span>
            </div>
          </div>
          <button className="icon-btn" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>

        <div className="chat-body">
          <div className="welcome-bubble">
            <Bot />
            <p><strong>Bonjour {user.name?.split(" ")[0] || "Sara"} ! 👋</strong><br />Je suis votre assistant Agora. Posez-moi une question ou utilisez les suggestions.</p>
          </div>

          <h3>Suggestions</h3>
          <div className="suggestions">
            {quickQuestions.map((q) => (
                <button key={q} onClick={(e) => sendMessage(e, q)}>{q}</button>
            ))}
          </div>

          <div className="chat-messages">
            {messages.map((item, index) => (
                <article className="chat-exchange" key={`${item.id || index}`}>
                  <div className="user-bubble">{item.question}<small>18:54</small></div>
                  <div className="bot-bubble">
                    <p>{item.answer}</p>
                    {!!item.sources?.length && (
                        <div className="sources">
                          <strong>Sources :</strong>
                          <ul>{item.sources.map((source) => <li key={source.id}>{source.title}</li>)}</ul>
                        </div>
                    )}
                    <small>18:54</small>
                  </div>
                </article>
            ))}
          </div>
        </div>

        <form className="chat-input" onSubmit={sendMessage}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Posez votre question..." />
          <button disabled={loading}><Send size={18} /></button>
        </form>
        <div className="powered">Propulsé par <strong>Agora Chatbot</strong></div>
      </aside>
  );
}

function DocumentsPanel() {
    const [query, setQuery] = useState("");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    async function search(event) {
        event?.preventDefault();
        setLoading(true);
        setShowAll(false);
        try {
            const data = await apiRequest(`/api/documents?q=${encodeURIComponent(query)}`);
            setDocuments(data.documents || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function loadAll() {
        setLoading(true);
        setShowAll(true);
        setQuery("");
        try {
            const data = await apiRequest(`/api/documents?q=`);
            setDocuments(data.documents || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="dashboard-card documents-card">
            <div className="section-title">
                <h2>Documents intranet</h2>
                <a onClick={loadAll} style={{cursor: 'pointer', color: '#6c63d4', fontSize: '14px', fontWeight: '600'}}>
                    Voir tous →
                </a>
            </div>
            <form className="mini-search" onSubmit={search}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un document..."
                />
                <button type="submit">{loading ? "..." : "Rechercher"}</button>
            </form>
            <div className="doc-list">
                {documents.length === 0 && !loading && (
                    <p style={{color: '#888', marginTop: '12px'}}>
                        {showAll ? "Aucun document disponible." : "Faites une recherche ou cliquez sur Voir tous."}
                    </p>
                )}
                {documents.map((doc) => (
                    <article
                        key={doc.id}
                        style={{cursor: 'pointer'}}
                        onClick={() => alert(`Document : ${doc.title}\n\nCe document sera disponible prochainement.`)}
                    >
                        <FileText />
                        <div>
                            <strong>{doc.title}</strong>
                            <span>{doc.summary}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function AppointmentPanel() {
  const [form, setForm] = useState({ service: "Service pédagogique", subject: "Question sur mon dossier", availability: "Lundi ou mercredi après-midi", mode: "en-ligne" });
  const [result, setResult] = useState("");

  async function submit(event) {
    event.preventDefault();
    setResult("");
    const data = await apiRequest("/api/appointments", { method: "POST", body: JSON.stringify(form) });
    setResult(`Demande envoyée : ${data.requestId}`);
  }

  return (
      <section className="dashboard-card appointment-card">
        <h2>Demande de rendez-vous</h2>
        <form onSubmit={submit}>
          <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
          <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <input value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} />
          <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
            <option value="en-ligne">En ligne</option>
            <option value="presentiel">Présentiel</option>
            <option value="telephone">Téléphone</option>
          </select>
          <button>Envoyer</button>
        </form>
        {result && <div className="success">{result}</div>}
      </section>
  );
}

function AccueilPage({ user, setActivePage }) {
  const services = useMemo(() => [
    { icon: CalendarDays, title: "Emploi du temps", text: "Consulter votre horaire hebdomadaire." },
    { icon: BookOpen, title: "Notes et résultats", text: "Voir vos notes, résultats et relevés." },
    { icon: UserRound, title: "Absences", text: "Consulter vos absences et retards." },
    { icon: Mail, title: "Messagerie", text: "Accéder à votre messagerie interne." }
  ], []);

  return (
      <>
        <section className="hero">
          <div>
            <h1>Réussir ensemble,<br />chaque jour.</h1>
            <p>Accédez rapidement à vos cours, documents et services essentiels.</p>
            <div className="hero-actions">
              <button onClick={() => setActivePage("Mes cours")}><BookOpen size={18} /> Voir mes cours</button>
              <button className="outline" onClick={() => setActivePage("Documents")}>
                <FileText size={18} /> Voir les documents
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-card services-card">
          <div className="section-title"><h2>Services rapides</h2><a>Voir tous les services →</a></div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, text }) => (
                <article key={title} className="service-card" onClick={() => setActivePage(title)}>
                  <Icon />
                  <strong>{title}</strong>
                  <p>{text}</p>
                  <a>Accéder →</a>
                </article>
            ))}
          </div>
        </section>

        <div className="lower-grid">
          <section className="dashboard-card news-card">
            <div className="section-title"><h2>Actualités</h2><a>Voir toutes →</a></div>
            <article><span>ANNONCE</span><strong>Session d'examens</strong><p>Les examens de fin de semestre débuteront le 15 juin 2026.</p></article>
            <article><span>INFO</span><strong>Nouveau règlement intérieur</strong><p>Le nouveau règlement intérieur est disponible.</p></article>
          </section>
          <DocumentsPanel />
          <AppointmentPanel />
        </div>
      </>
  );
}

function MesCoursPage() {
  return (
      <section className="dashboard-card">
        <h2>Mes cours</h2>
        <p style={{color: '#888', marginTop: '12px'}}>Vos cours du semestre apparaîtront ici.</p>
      </section>
  );
}

function ActualitesPage() {
  return (
      <section className="dashboard-card news-card">
        <div className="section-title"><h2>Actualités</h2></div>
        <article><span>ANNONCE</span><strong>Session d'examens</strong><p>Les examens de fin de semestre débuteront le 15 juin 2026.</p></article>
        <article><span>INFO</span><strong>Nouveau règlement intérieur</strong><p>Le nouveau règlement intérieur est disponible.</p></article>
        <article><span>INFO</span><strong>Fermeture exceptionnelle</strong><p>Le collège sera fermé le 24 juin 2026 pour la fête nationale.</p></article>
      </section>
  );
}

function EmploiDuTempsPage() {
  return (
      <section className="dashboard-card">
        <h2>Emploi du temps</h2>
        <p style={{color: '#888', marginTop: '12px'}}>Votre horaire hebdomadaire apparaîtra ici.</p>
      </section>
  );
}

function AbsencesPage() {
  return (
      <section className="dashboard-card">
        <h2>Absences</h2>
        <p style={{color: '#888', marginTop: '12px'}}>Vos absences et retards apparaîtront ici.</p>
      </section>
  );
}

function MessagériePage() {
  return (
      <section className="dashboard-card">
        <h2>Messagerie</h2>
        <p style={{color: '#888', marginTop: '12px'}}>Votre messagerie interne apparaîtra ici.</p>
      </section>
  );
}

function ServicesPage() {
  return (
      <section className="dashboard-card">
        <h2>Services</h2>
        <p style={{color: '#888', marginTop: '12px'}}>Tous les services disponibles apparaîtront ici.</p>
      </section>
  );
}

function AProposPage() {
  return (
      <section className="dashboard-card">
        <h2>À propos</h2>
        <p style={{color: '#888', marginTop: '12px'}}>Informations sur le collège Agora et l'intranet.</p>
      </section>
  );
}

function ContactPage() {
  return (
      <section className="dashboard-card">
        <h2>Contact</h2>
        <p style={{color: '#888', marginTop: '12px'}}>Coordonnées et formulaire de contact.</p>
      </section>
  );
}

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState("Accueil");

  const nav = ["Accueil", "Actualités", "Mes cours", "Emploi du temps", "Notes et résultats", "Absences", "Documents", "Messagerie", "Services", "À propos", "Contact"];

  function renderPage() {
    switch (activePage) {
      case "Accueil": return <AccueilPage user={user} setActivePage={setActivePage} />;
      case "Actualités": return <ActualitesPage />;
      case "Mes cours": return <MesCoursPage />;
      case "Emploi du temps": return <EmploiDuTempsPage />;
      case "Notes et résultats": return <MesCoursPage />;
      case "Absences": return <AbsencesPage />;
      case "Documents": return <DocumentsPanel />;
      case "Messagerie": return <MessagériePage />;
      case "Services": return <ServicesPage />;
      case "À propos": return <AProposPage />;
      case "Contact": return <ContactPage />;
      default: return <AccueilPage user={user} setActivePage={setActivePage} />;
    }
  }

  return (
      <main className="site-shell">
        <nav className="left-sidebar">
          <div className="logo"><ShieldCheck /><div><strong>Agora</strong><span>Intranet Scolaire</span></div></div>
          <div className="nav-links">
            {nav.map((item, index) => (
                <button
                    className={activePage === item ? "active nav-button" : "nav-button"}
                    key={item}
                    onClick={() => setActivePage(item)}
                >
                  {index === 0 ? <Home /> : index === 6 ? <FileText /> : <span className="dot" />}
                  {item}
                </button>
            ))}
          </div>
          <button className="help-btn"><MessageCircle size={18} /> Besoin d'aide ?</button>
        </nav>

        <section className="portal-content">
          <header className="topbar">
            <button className="menu-btn"><Menu /></button>
            <div className="searchbar"><Search size={18} /><input placeholder="Rechercher dans l'intranet..." /><kbd>Ctrl + K</kbd></div>
            <Bell />
            <div className="user-menu"><div className="avatar">S</div><div><strong>{user.name}</strong><span>{user.roleLabel}</span></div><ChevronDown size={18} /></div>
            <button className="logout-top" onClick={onLogout}><LogOut size={18} /></button>
          </header>

          <div className="content-inner">
            <p className="hello">Bonjour {user.name?.split(" ")[0] || "Sara"} ! 👋</p>
            <p className="subtitle">Bienvenue sur votre espace intranet. Retrouvez ici toutes vos informations et services.</p>
            {renderPage()}
          </div>
        </section>

        <ChatWidget user={user} />
      </main>
  );
}

export default function App() {
  const [user, setUser] = useState(getSavedUser());

  function logout() {
    clearSession();
    setUser(null);
  }

  return user ? <Dashboard user={user} onLogout={logout} /> : <Login onLogin={setUser} />;
}