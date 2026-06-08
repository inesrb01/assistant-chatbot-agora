import { Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  Users,
  MessageCircle,
  GraduationCap,
  Search,
  BookOpen,
  ClipboardList
} from "lucide-react";
import FloatingChatbot from "../components/FloatingChatbot";

function HomePage() {
  const departments = [
    { name: "Informatique", slug: "informatique" },
    { name: "Gestion", slug: "gestion" },
    { name: "Design et arts numériques", slug: "design" },
    { name: "Marketing et commerce", slug: "marketing" },
    { name: "Sciences humaines", slug: "sciences-humaines" },
    { name: "Formation générale", slug: "formation-generale" }
  ];

  const categories = [
    { title: "Plans de cours", icon: BookOpen },
    { title: "Formulaires", icon: ClipboardList },
    { title: "Guides étudiants", icon: GraduationCap },
    { title: "FAQ", icon: MessageCircle },
    { title: "Services", icon: Users },
    { title: "Documents", icon: FileText }
  ];

  return (
    <div className="home-page">
      <nav className="navbar premium-navbar">
        <div className="logo">
          <span>CL</span>
          <div>
            <h2>Collège LaSalle</h2>
            <p>Portail intranet</p>
          </div>
        </div>

        <div className="nav-links">
          <Link to="/departements">Départements</Link>
          <Link to="/plans-cours">Plans de cours</Link>
          <Link to="/services">Services</Link>
          <a href="#chatbot">Chatbot</a>
        </div>

        <div className="user-badge">
          <span>AB</span>
          <p>Akram</p>
        </div>
      </nav>

      <section className="hero-section premium-hero">
        <div className="hero-text">
          <span className="hero-label">Assistant intranet intelligent</span>

          <h1>
            Un portail étudiant moderne avec assistant intégré
          </h1>

          <p>
            Retrouvez rapidement vos documents, plans de cours, services étudiants
            et ressources académiques à partir d’une seule interface.
          </p>

          <div className="hero-buttons">
            <Link to="/services">
              <button>Explorer les services</button>
            </Link>

            <a href="#chatbot">
              <button className="secondary-btn">Ouvrir le chatbot</button>
            </a>
          </div>
        </div>

        <div className="hero-dashboard-card">
          <div className="dashboard-header">
            <MessageCircle size={28} />
            <div>
              <h3>Assistant Agora</h3>
              <p>Disponible 24/7</p>
            </div>
          </div>

          <div className="dashboard-list">
            <div>
              <Search size={18} />
              Recherche de documents
            </div>

            <div>
              <Calendar size={18} />
              Rendez-vous étudiant
            </div>

            <div>
              <GraduationCap size={18} />
              Support pédagogique
            </div>
          </div>
        </div>
      </section>

      <section className="services-section premium-section">
        <div className="service-card">
          <Calendar size={32} />
          <h3>Rendez-vous aux services</h3>
          <p>
            Registrariat, aide pédagogique, soutien TI et accompagnement étudiant.
          </p>
          <Link to="/services"><button>Explorer</button></Link>
        </div>

        <div className="service-card">
          <FileText size={32} />
          <h3>Plans de cours PDF</h3>
          <p>
            Recherche dans les plans de cours, guides et documents.
          </p>
          <Link to="/plans-cours"><button>Explorer</button></Link>
        </div>

        <div className="service-card">
          <Users size={32} />
          <h3>Vie étudiante</h3>
          <p>
            Informations sur les ateliers, ressources et formulaires.
          </p>
          <Link to="/services"><button>Explorer</button></Link>
        </div>

        <div className="service-card">
          <MessageCircle size={32} />
          <h3>Chatbot intégré</h3>
          <p>
            Assistant disponible partout dans le portail.
          </p>
          <a href="#chatbot"><button>Explorer</button></a>
        </div>
      </section>

      <section className="departments-section">
        <span className="section-label">Programmes</span>
        <h2>Départements et ressources académiques</h2>

        <div className="departments-grid">
          {departments.map((department) => (
            <Link
              to={`/departements/${department.slug}`}
              className="department-link"
              key={department.slug}
            >
              <div className="department-card">
                <strong>{department.name}</strong>
                <span>›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="documents-section">
        <span className="section-label">Documents</span>
        <h2>Recherche de documents et plans de cours</h2>

        <div className="search-box premium-search">
          <input type="text" placeholder="Rechercher un document, un cours ou un service..." />
          <Link to="/plans-cours"><button>Rechercher</button></Link>
        </div>

        <div className="documents-grid">
          <div className="document-card">
            <h3>420-WC1-AS</h3>
            <p>Développement Web Client I</p>
            <Link to="/plans-cours"><button>PDF</button></Link>
          </div>

          <div className="document-card">
            <h3>420-AS2-AS</h3>
            <p>Analyse et modélisation</p>
            <Link to="/plans-cours"><button>PDF</button></Link>
          </div>

          <div className="document-card">
            <h3>420-DB1-AS</h3>
            <p>Bases de données</p>
            <Link to="/plans-cours"><button>PDF</button></Link>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <span className="section-label">Ressources</span>
        <h2>Catégories disponibles</h2>

        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div className="category-card" key={category.title}>
                <Icon size={30} />
                <h3>{category.title}</h3>
                <p>Accès rapide aux ressources liées à cette catégorie.</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Collège LaSalle — Portail intranet étudiant</p>
      </footer>

      <div id="chatbot">
        <FloatingChatbot />
      </div>
    </div>
  );
}

export default HomePage;