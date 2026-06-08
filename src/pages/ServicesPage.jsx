import { Link } from "react-router-dom";

function ServicesPage() {
  return (
    <div className="simple-page">
      <Link to="/home" className="back-link">← Retour</Link>
      <h1>Services étudiants</h1>

      <div className="services-section page-services">
        <div className="service-card">
          <h3>Rendez-vous aux services</h3>
          <p>Registrariat, aide pédagogique et soutien TI.</p>
          <button>Explorer</button>
        </div>

        <div className="service-card">
          <h3>Vie étudiante</h3>
          <p>Ressources, ateliers et accompagnement.</p>
          <button>Explorer</button>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;