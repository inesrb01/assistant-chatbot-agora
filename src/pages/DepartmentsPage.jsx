import { Link } from "react-router-dom";

function DepartmentsPage() {
  const departments = [
    {
      name: "Informatique",
      slug: "informatique"
    },
    {
      name: "Gestion",
      slug: "gestion"
    },
    {
      name: "Design et arts numériques",
      slug: "design"
    },
    {
      name: "Marketing et commerce",
      slug: "marketing"
    },
    {
      name: "Sciences humaines",
      slug: "sciences-humaines"
    },
    {
      name: "Formation générale",
      slug: "formation-generale"
    }
  ];

  return (
    <div className="simple-page">
      <Link to="/home" className="back-link">
        ← Retour
      </Link>

      <h1>Départements</h1>

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
    </div>
  );
}

export default DepartmentsPage;