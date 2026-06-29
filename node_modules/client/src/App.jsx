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
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <Bot size={36} />
          <span>Agora Chatbot Stage</span>
        </div>

        <h1>Assistant intranet scolaire</h1>

        <p>
          Connecte-toi avec un compte démo pour tester le site intranet, le chatbot,
          les documents et les rendez-vous.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Courriel</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Mot de passe</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          {error && <div className="error">{error}</div>}

          <button disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="quick-logins">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => {
                setEmail(account.email);
                setPassword(PASSWORD);
              }}
            >
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
      setMessages((old) => [
        ...old,
        { question, answer: err.message, sources: [] }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function newConversation() {
    setMessages([]);
    setMessage("");
    setOpen(true);
  }

  function endConversation() {
    setMessages([]);
    setMessage("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        className="chat-floating"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir Agora Chatbot"
        type="button"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <aside className="chat-widget">
      <div className="chat-header">
        <div className="chat-title">
          <div className="chat-icon">
            <Bot />
          </div>

          <div>
            <strong>Agora Chatbot</strong>
            <span>Assistant intelligent</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button className="icon-btn" onClick={newConversation} title="Nouvelle conversation" type="button">
            +
          </button>
          <button className="icon-btn" onClick={() => setOpen(false)} type="button">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="chat-body">
        <div className="welcome-bubble">
          <Bot />
          <p>
            <strong>Bonjour {user.name?.split(" ")[0] || "Sara"} ! 👋</strong>
            <br />
            Je suis votre assistant Agora. Posez-moi une question ou utilisez les suggestions.
          </p>
        </div>

        <h3>Suggestions</h3>

        <div className="suggestions">
          {quickQuestions.map((q) => (
            <button key={q} onClick={(e) => sendMessage(e, q)} type="button">
              {q}
            </button>
          ))}
        </div>

        <div className="chat-messages">
          {messages.map((item, index) => (
            <article className="chat-exchange" key={`${item.id || index}`}>
              <div className="user-bubble">
                {item.question}
                <small>18:54</small>
              </div>

              <div className="bot-bubble">
                <p>{item.answer}</p>

                {!!item.sources?.length && (
                  <div className="sources">
                    <strong>Sources :</strong>
                    <ul>
                      {item.sources.map((source) => (
                        <li key={source.id}>{source.title}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <small>18:54</small>

                {index === messages.length - 1 && (
                  <div className="suggestions" style={{ marginTop: "12px" }}>
                    <button onClick={() => setMessage("")} type="button">
                      Poser une autre question
                    </button>
                    <button onClick={endConversation} type="button">
                      Terminer la conversation
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Posez votre question..."
        />
        <button disabled={loading} type="submit">
          <Send size={18} />
        </button>
      </form>

      <div className="powered">
        Propulsé par <strong>Agora Chatbot</strong>
      </div>
    </aside>
  );
}

function DetailButton({ title, text, onOpen }) {
  return (
    <button
      className="link-button"
      type="button"
      onClick={() => onOpen(title, text)}
    >
      Voir détail →
    </button>
  );
}

function DocumentsPanel({ roleName, onOpenDetail }) {
  const [query, setQuery] = useState("formulaire");
  const [documents, setDocuments] = useState([]);

  async function search(event) {
    event?.preventDefault();

    const data = await apiRequest(`/api/documents?q=${encodeURIComponent(query)}`);
    setDocuments(data.documents || []);
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <section className="dashboard-card documents-card">
      <div className="section-title">
        <h2>{roleName === "Administration" ? "Gestion des documents" : "Documents intranet"}</h2>
        <button
          className="link-button"
          type="button"
          onClick={() =>
            onOpenDetail(
              "Tous les documents",
              "Cette page regroupe les formulaires, guides et documents officiels disponibles sur l'intranet Agora."
            )
          }
        >
          Voir tous <ExternalLink size={15} />
        </button>
      </div>

      <form className="mini-search" onSubmit={search}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un document..."
        />
        <button>Rechercher</button>
      </form>

      <div className="doc-list">
        {documents.slice(0, 4).map((doc) => (
          <article key={doc.id}>
            <FileText />
            <div>
              <strong>{doc.title}</strong>
              <span>{doc.summary}</span>
              <DetailButton
                title={doc.title}
                text={doc.summary || "Document disponible dans l'intranet Agora."}
                onOpen={onOpenDetail}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AppointmentPanel({ roleName }) {
  const [form, setForm] = useState({
    service: roleName === "Administration" ? "Suivi administratif" : "Service pédagogique",
    subject: roleName === "Enseignant" ? "Question pédagogique" : "Question sur mon dossier",
    availability: "Lundi ou mercredi après-midi",
    mode: "en-ligne"
  });

  const [result, setResult] = useState("");

  async function submit(event) {
    event.preventDefault();
    setResult("");

    const data = await apiRequest("/api/appointments", {
      method: "POST",
      body: JSON.stringify(form)
    });

    setResult(`Demande envoyée : ${data.requestId}`);
  }

  return (
    <section className="dashboard-card appointment-card">
      <h2>Demande de rendez-vous</h2>

      <form onSubmit={submit}>
        <input
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        />

        <input
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <input
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
        />

        <select
          value={form.mode}
          onChange={(e) => setForm({ ...form, mode: e.target.value })}
        >
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

function SimplePage({ title, children }) {
  return (
    <section className="dashboard-card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState("Accueil");
  const [detail, setDetail] = useState(null);

  const roleLabel = user.roleLabel || "Étudiant";
  const role = roleLabel.toLowerCase();

  const isStudent = role.includes("étudiant") || role.includes("etudiant");
  const isTeacher = role.includes("enseignant");
  const isAdmin = role.includes("administration");

  const roleName = isAdmin ? "Administration" : isTeacher ? "Enseignant" : "Étudiant";

  const welcomeText = isAdmin
    ? "Gérez les demandes, les documents, les utilisateurs et le suivi administratif."
    : isTeacher
    ? "Gérez vos cours, vos documents pédagogiques et le suivi des étudiants."
    : "Consultez votre horaire, vos cours, vos notes et vos documents.";

  const nav = isAdmin
    ? ["Accueil", "Actualités", "Demandes", "Documents", "Utilisateurs", "Messagerie", "Services", "À propos", "Contact"]
    : isTeacher
    ? ["Accueil", "Actualités", "Mes cours", "Documents", "Messagerie", "Services", "À propos", "Contact"]
    : ["Accueil", "Actualités", "Mes cours", "Emploi du temps", "Notes et résultats", "Absences", "Documents", "Messagerie", "Services", "À propos", "Contact"];

  const services = useMemo(() => {
    if (isAdmin) {
      return [
        { icon: CalendarDays, title: "Demandes", text: "Suivre les demandes des étudiants." },
        { icon: UserRound, title: "Utilisateurs", text: "Gérer les comptes étudiants et enseignants." },
        { icon: FileText, title: "Documents", text: "Gérer les documents officiels." },
        { icon: Mail, title: "Messagerie", text: "Répondre aux messages internes." }
      ];
    }

    if (isTeacher) {
      return [
        { icon: BookOpen, title: "Mes cours", text: "Consulter et gérer les cours enseignés." },
        { icon: FileText, title: "Documents", text: "Partager des documents pédagogiques." },
        { icon: Mail, title: "Messagerie", text: "Échanger avec les étudiants." },
        { icon: CalendarDays, title: "Services", text: "Accéder aux services enseignants." }
      ];
    }

    return [
      { icon: CalendarDays, title: "Emploi du temps", text: "Consulter votre horaire hebdomadaire." },
      { icon: BookOpen, title: "Notes et résultats", text: "Voir vos notes, résultats et relevés." },
      { icon: UserRound, title: "Absences", text: "Consulter vos absences et retards." },
      { icon: Mail, title: "Messagerie", text: "Accéder à votre messagerie interne." }
    ];
  }, [isAdmin, isTeacher]);

  function openDetail(title, text) {
    setDetail({ title, text });
    setActivePage("Détail");
  }

  function renderPage() {
    if (activePage === "Détail" && detail) {
      return (
        <SimplePage title={detail.title}>
          <p>{detail.text}</p>
          <button className="link-button" type="button" onClick={() => setActivePage("Accueil")}>
            Retour à l'accueil
          </button>
        </SimplePage>
      );
    }

    if (activePage === "Accueil") {
      return (
        <>
          <section className="hero">
            <div>
              <h1>
                {isAdmin ? "Gérer efficacement," : isTeacher ? "Enseigner simplement," : "Réussir ensemble,"}
                <br />
                {isAdmin ? "chaque demande." : isTeacher ? "chaque cours." : "chaque jour."}
              </h1>

              <p>{welcomeText}</p>

              <div className="hero-actions">
                <button onClick={() => setActivePage(isAdmin ? "Demandes" : "Mes cours")} type="button">
                  <BookOpen size={18} /> {isAdmin ? "Voir les demandes" : "Voir mes cours"}
                </button>

                <button className="outline" onClick={() => setActivePage("Documents")} type="button">
                  <FileText size={18} /> Voir les documents
                </button>
              </div>
            </div>
          </section>

          <section className="dashboard-card services-card">
            <div className="section-title">
              <h2>Services rapides</h2>
              <button className="link-button" onClick={() => setActivePage("Services")} type="button">
                Voir tous les services →
              </button>
            </div>

            <div className="service-grid">
              {services.map(({ icon: Icon, title, text }) => (
                <article key={title} className="service-card">
                  <Icon />
                  <strong>{title}</strong>
                  <p>{text}</p>
                  <button className="link-button" onClick={() => setActivePage(title)} type="button">
                    Accéder →
                  </button>
                </article>
              ))}
            </div>
          </section>

          <div className="lower-grid">
            <section className="dashboard-card news-card">
              <div className="section-title">
                <h2>Actualités</h2>
                <button className="link-button" onClick={() => setActivePage("Actualités")} type="button">
                  Voir toutes →
                </button>
              </div>

              <article>
                <span>ANNONCE</span>
                <strong>
                  {isAdmin ? "Suivi des demandes" : isTeacher ? "Mise à jour pédagogique" : "Session d'examens"}
                </strong>
                <p>
                  {isAdmin
                    ? "Les demandes récentes sont disponibles dans le tableau de suivi."
                    : isTeacher
                    ? "Les documents pédagogiques peuvent maintenant être partagés."
                    : "Les examens de fin de semestre débuteront le 15 juin 2026."}
                </p>
                <DetailButton
                  title="Actualité"
                  text="Information interne Agora."
                  onOpen={openDetail}
                />
              </article>
            </section>

            <DocumentsPanel roleName={roleName} onOpenDetail={openDetail} />
            <AppointmentPanel roleName={roleName} />
          </div>
        </>
      );
    }

    if (activePage === "Documents") {
      return <DocumentsPanel roleName={roleName} onOpenDetail={openDetail} />;
    }

    if (activePage === "Mes cours") {
      return (
        <SimplePage title={isTeacher ? "Cours enseignés" : "Mes cours"}>
          <div className="doc-list">
            <article>
              <BookOpen />
              <div>
                <strong>{isTeacher ? "Programmation Web - Groupe A" : "Programmation Web"}</strong>
                <span>{isTeacher ? "Cours à gérer : contenu, documents et suivi." : "React, API et intégration frontend."}</span>
                <DetailButton title="Programmation Web" text="Détails du cours et ressources associées." onOpen={openDetail} />
              </div>
            </article>

            <article>
              <BookOpen />
              <div>
                <strong>{isTeacher ? "Base de données - Groupe B" : "Base de données"}</strong>
                <span>{isTeacher ? "Suivi des activités et documents de cours." : "SQL, modèles relationnels et requêtes."}</span>
                <DetailButton title="Base de données" text="Détails du cours et ressources associées." onOpen={openDetail} />
              </div>
            </article>
          </div>
        </SimplePage>
      );
    }

    if (activePage === "Emploi du temps") {
      return (
        <SimplePage title="Emploi du temps">
          <div className="doc-list">
            <article>
              <CalendarDays />
              <div>
                <strong>Lundi</strong>
                <span>09:00 - 12:00 · Projet intégrateur · Local A-220</span>
                <DetailButton title="Lundi" text="Projet intégrateur de 09:00 à 12:00 au local A-220." onOpen={openDetail} />
              </div>
            </article>

            <article>
              <CalendarDays />
              <div>
                <strong>Mercredi</strong>
                <span>13:00 - 16:00 · Programmation Web · Local B-204</span>
                <DetailButton title="Mercredi" text="Programmation Web de 13:00 à 16:00 au local B-204." onOpen={openDetail} />
              </div>
            </article>
          </div>
        </SimplePage>
      );
    }

    if (activePage === "Notes et résultats") {
      return (
        <SimplePage title="Notes et résultats">
          <div className="doc-list">
            <article>
              <BookOpen />
              <div>
                <strong>Programmation Web</strong>
                <span>88% · Réussi</span>
                <DetailButton title="Programmation Web" text="Note : 88%. Statut : Réussi." onOpen={openDetail} />
              </div>
            </article>

            <article>
              <BookOpen />
              <div>
                <strong>Base de données</strong>
                <span>91% · Réussi</span>
                <DetailButton title="Base de données" text="Note : 91%. Statut : Réussi." onOpen={openDetail} />
              </div>
            </article>
          </div>
        </SimplePage>
      );
    }

    if (activePage === "Absences") {
      return (
        <SimplePage title="Absences">
          <div className="doc-list">
            <article>
              <UserRound />
              <div>
                <strong>Aucune absence critique</strong>
                <span>Votre dossier est à jour pour la session actuelle.</span>
                <DetailButton title="Absences" text="Aucune absence critique enregistrée." onOpen={openDetail} />
              </div>
            </article>
          </div>
        </SimplePage>
      );
    }

    if (activePage === "Demandes") {
      return (
        <SimplePage title="Demandes administratives">
          <div className="doc-list">
            <article>
              <CalendarDays />
              <div>
                <strong>Reprise d'examen</strong>
                <span>3 demandes en attente de traitement.</span>
                <DetailButton title="Reprise d'examen" text="Demandes à vérifier par l'administration." onOpen={openDetail} />
              </div>
            </article>

            <article>
              <FileText />
              <div>
                <strong>Documents officiels</strong>
                <span>5 demandes de documents reçues.</span>
                <DetailButton title="Documents officiels" text="Demandes de documents à préparer." onOpen={openDetail} />
              </div>
            </article>
          </div>
        </SimplePage>
      );
    }

    if (activePage === "Utilisateurs") {
      return (
        <SimplePage title="Utilisateurs">
          <div className="doc-list">
            <article>
              <UserRound />
              <div>
                <strong>Étudiants</strong>
                <span>Gestion des comptes étudiants.</span>
                <DetailButton title="Étudiants" text="Liste des étudiants inscrits dans Agora." onOpen={openDetail} />
              </div>
            </article>

            <article>
              <UserRound />
              <div>
                <strong>Enseignants</strong>
                <span>Gestion des comptes enseignants.</span>
                <DetailButton title="Enseignants" text="Liste des enseignants inscrits dans Agora." onOpen={openDetail} />
              </div>
            </article>
          </div>
        </SimplePage>
      );
    }

    if (activePage === "Messagerie") {
      return (
        <SimplePage title="Messagerie">
          <div className="doc-list">
            <article>
              <Mail />
              <div>
                <strong>{isAdmin ? "Étudiant - demande document" : isTeacher ? "Étudiant - question cours" : "Service pédagogique"}</strong>
                <span>{isAdmin ? "Nouvelle demande à traiter." : isTeacher ? "Question reçue au sujet du cours." : "Votre demande a bien été reçue."}</span>
                <DetailButton title="Message" text="Message interne Agora." onOpen={openDetail} />
              </div>
            </article>

            <article>
              <Mail />
              <div>
                <strong>Support Agora</strong>
                <span>Besoin d'aide ? Utilisez le chatbot ou la page Contact.</span>
                <DetailButton title="Support Agora" text="Le chatbot peut répondre aux questions fréquentes." onOpen={openDetail} />
              </div>
            </article>
          </div>
        </SimplePage>
      );
    }

    if (activePage === "Services") {
      return (
        <section className="dashboard-card services-card">
          <h2>Tous les services</h2>

          <div className="service-grid">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title} className="service-card">
                <Icon />
                <strong>{title}</strong>
                <p>{text}</p>
                <button className="link-button" onClick={() => setActivePage(title)} type="button">
                  Accéder →
                </button>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (activePage === "Actualités") {
      return (
        <SimplePage title="Actualités">
          <p>
            {isAdmin
              ? "Consultez les annonces administratives et le suivi des demandes."
              : isTeacher
              ? "Consultez les informations pédagogiques importantes."
              : "Consultez les annonces, nouvelles importantes et informations de l'établissement."}
          </p>
          <DetailButton
            title="Actualités"
            text="Section regroupant les annonces et nouvelles importantes."
            onOpen={openDetail}
          />
        </SimplePage>
      );
    }

    if (activePage === "À propos") {
      return (
        <SimplePage title="À propos">
          <p>
            Agora est un intranet scolaire de démonstration avec un assistant chatbot intégré.
            Le projet centralise les informations, documents, services, messages et demandes
            de rendez-vous dans une seule interface.
          </p>
          <DetailButton
            title="À propos du projet"
            text="Projet de stage : intranet scolaire React + Express + chatbot avec base de connaissances interne."
            onOpen={openDetail}
          />
        </SimplePage>
      );
    }

    if (activePage === "Contact") {
      return <AppointmentPanel roleName={roleName} />;
    }

    return (
      <SimplePage title={activePage}>
        <p>Section en cours de préparation.</p>
      </SimplePage>
    );
  }

  return (
    <main className="site-shell">
      <nav className="left-sidebar">
        <div className="logo">
          <ShieldCheck />

          <div>
            <strong>Agora</strong>
            <span>Intranet Scolaire</span>
          </div>
        </div>

        <div className="nav-links">
          {nav.map((item) => (
            <button
              className={activePage === item ? "nav-button active" : "nav-button"}
              key={item}
              onClick={() => setActivePage(item)}
              type="button"
            >
              {item === "Accueil" && <Home size={22} />}
              {item === "Actualités" && <Bell size={22} />}
              {item === "Mes cours" && <BookOpen size={22} />}
              {item === "Emploi du temps" && <CalendarDays size={22} />}
              {item === "Notes et résultats" && <BookOpen size={22} />}
              {item === "Absences" && <UserRound size={22} />}
              {item === "Demandes" && <CalendarDays size={22} />}
              {item === "Documents" && <FileText size={22} />}
              {item === "Utilisateurs" && <UserRound size={22} />}
              {item === "Messagerie" && <Mail size={22} />}
              {item === "Services" && <ShieldCheck size={22} />}
              {item === "À propos" && <BookOpen size={22} />}
              {item === "Contact" && <MessageCircle size={22} />}
              <span>{item}</span>
            </button>
          ))}
        </div>

        <button className="help-btn" onClick={() => setActivePage("Contact")} type="button">
          <MessageCircle size={18} /> Besoin d'aide ?
        </button>
      </nav>

      <section className="portal-content">
        <header className="topbar">
          <button className="menu-btn" type="button">
            <Menu />
          </button>

          <div className="searchbar">
            <Search size={18} />
            <input placeholder="Rechercher dans l'intranet..." />
            <kbd>Ctrl + K</kbd>
          </div>

          <Bell />

          <div className="user-menu">
            <div className="avatar">S</div>

            <div>
              <strong>{user.name}</strong>
              <span>{roleLabel}</span>
            </div>

            <ChevronDown size={18} />
          </div>

          <button className="logout-top" onClick={onLogout} type="button">
            <LogOut size={18} />
          </button>
        </header>

        <div className="content-inner">
          <p className="hello">Bonjour {user.name?.split(" ")[0] || "Sara"} ! 👋</p>
          <p className="subtitle">{welcomeText}</p>
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

  return user ? (
    <Dashboard user={user} onLogout={logout} />
  ) : (
    <Login onLogin={setUser} />
  );
}
