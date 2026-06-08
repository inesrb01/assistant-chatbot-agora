function LoginPage({ onLogin }) {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Assistant Intranet</h1>

        <p>
          Connectez-vous pour accéder au portail étudiant et à
          l'assistant intelligent.
        </p>

        <input
          type="email"
          placeholder="Adresse courriel"
        />

        <input
          type="password"
          placeholder="Mot de passe"
        />

        <button onClick={onLogin}>
          Se connecter
        </button>

        <div className="demo-buttons">
          <button onClick={onLogin}>
            Démo Étudiant
          </button>

          <button onClick={onLogin}>
            Démo Enseignant
          </button>

          <button onClick={onLogin}>
            Démo Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;