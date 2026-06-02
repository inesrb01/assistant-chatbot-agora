function DocumentCard({ document }) {
  return (
    <div className="item-card">
      <h3>{document.title}</h3>
      <p>{document.category}</p>
      <button>Consulter</button>
    </div>
  );
}

export default DocumentCard;