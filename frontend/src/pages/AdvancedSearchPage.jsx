function AdvancedSearchPage() {
  return (
    <div>
      <h2>Recherche avancée</h2>

      <div className="item-card">
        <h3>Rechercher un document</h3>

        <input
          type="text"
          placeholder="Entrez un mot-clé..."
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        />

        <button>Rechercher</button>
      </div>
    </div>
  );
}

export default AdvancedSearchPage;