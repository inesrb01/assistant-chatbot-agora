import { Link, useParams } from "react-router-dom";

function DepartmentDetailsPage() {
  const { slug } = useParams();

  const departmentData = {
    informatique: {
      name: "Informatique",
      description:
        "Ressources liées aux cours de programmation, bases de données, web et développement logiciel.",
      courses: [
        "Développement Web Client I",
        "Base de données",
        "Programmation Java",
        "Analyse et modélisation"
      ]
    },
    gestion: {
      name: "Gestion",
      description:
        "Ressources liées à la gestion, administration, comptabilité et organisation.",
      courses: [
        "Introduction à la gestion",
        "Comptabilité",
        "Marketing",
        "Gestion de projet"
      ]
    },
    design: {
      name: "Design et arts numériques",
      description:
        "Ressources liées au design, à la création visuelle et aux outils numériques.",
      courses: [
        "Design graphique",
        "Création numérique",
        "Interface utilisateur",
        "Communication visuelle"
      ]
    },
    marketing: {
      name: "Marketing et commerce",
      description:
        "Ressources liées au commerce, à la vente, au marketing et à la communication.",
      courses: [
        "Marketing numérique",
        "Commerce international",
        "Vente",
        "Publicité"
      ]
    },
    "sciences-humaines": {
      name: "Sciences humaines",
      description:
        "Ressources liées aux sciences humaines, à la société et à la communication.",
      courses: [
        "Psychologie",
        "Sociologie",
        "Histoire",
        "Méthodes de recherche"
      ]
    },
    "formation-generale": {
      name: "Formation générale",
      description:
        "Ressources liées aux cours généraux comme français, philosophie, anglais et éducation physique.",
      courses: [
        "Français",
        "Philosophie",
        "Anglais",
        "Éducation physique"
      ]
    }
  };

  const department = departmentData[slug];

  if (!department) {
    return (
      <div className="simple-page">
        <Link to="/departements" className="back-link">
          ← Retour
        </Link>

        <h1>Département introuvable</h1>
      </div>
    );
  }

  return (
    <div className="simple-page">
      <Link to="/departements" className="back-link">
        ← Retour aux départements
      </Link>

      <h1>{department.name}</h1>

      <p className="page-description">
        {department.description}
      </p>

      <h2>Cours disponibles</h2>

      <div className="documents-grid">
        {department.courses.map((course) => (
          <div className="document-card" key={course}>
            <h3>{course}</h3>
            <p>Document ou ressource disponible pour ce cours.</p>
            <button>Voir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentDetailsPage;