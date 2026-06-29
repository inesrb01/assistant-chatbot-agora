# Rapport technique - Agora Chatbot Stage

## Architecture

Le projet suit une architecture full stack :

Navigateur → React/Vite → API Express → JWT → Données JSON → Réponse chatbot.

## Backend

Le backend contient les routes API suivantes :

- GET /api/health
- POST /api/auth/login
- GET /api/auth/me
- GET /api/knowledge
- GET /api/documents
- GET /api/chat/history
- POST /api/chat/message
- POST /api/appointments

## Sécurité

- JWT obligatoire pour les routes protégées
- Validation des données avec Zod
- Helmet pour protections HTTP de base
- Filtrage des données selon le rôle utilisateur

## Frontend

L'interface contient :

- Écran de connexion
- Sidebar avec profil utilisateur
- Zone chatbot
- Sources internes
- Recherche de documents
- Formulaire de rendez-vous

## Tests

La commande `npm run test` vérifie :

- Authentification valide
- Mauvais mot de passe refusé
- Filtrage par rôle

## Conclusion

Le projet est une version démonstration complète et présentable d'un assistant intranet scolaire.
