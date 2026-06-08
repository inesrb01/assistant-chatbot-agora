import { Link } from "react-router-dom";

function PlansPage() {
  return (
    <div className="simple-page">
      <Link to="/home" className="back-link">← Retour</Link>
      <h1>Plans de cours</h1>

      <div className="documents-grid">
        <div className="document-card">
          <h3>420-WC1-AS</h3>
          <p>Développement Web Client I</p>
          <button>PDF</button>
        </div>

        <div className="document-card">
          <h3>420-AS2-AS</h3>
          <p>Analyse et modélisation</p>
          <button>PDF</button>
        </div>
      </div>
    </div>
  );
}

export default PlansPage;