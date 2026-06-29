# Agora Chatbot Stage

lAssistant chatbot pour intranet scolaire Agora.

## Fonctionnalités

- Connexion avec comptes démo
- Authentification JWT
- Chatbot basé sur une base de connaissances JSON
- Affichage des sources internes
- Recherche de documents selon le rôle
- Formulaire de demande de rendez-vous
- Historique des conversations
- Tests backend

## Comptes démo

Mot de passe commun : `Agora2026!`

| Rôle | Courriel |
|---|---|
| Étudiant | etudiant@college.local |
| Enseignant | enseignant@college.local |
| Administration | admin@college.local |

## Installation

```powershell
npm install
Copy-Item .env.example server\.env
npm run dev
```

Ouvrir l'adresse client affichée dans le terminal, normalement :

```txt
http://127.0.0.1:5173
```

## Commandes

```powershell
npm run dev
npm run build
npm run test
npm run start
```

## Structure

```txt
client/      Frontend React Vite
server/      API Express, JWT, données JSON
scripts/     Script de lancement dev
server/data/ knowledgeBase, documents, conversations
```

## Démo rapide

1. Lancer `npm run dev`
2. Se connecter comme étudiant
3. Poser : `Où consulter mon horaire de cours ?`
4. Chercher `formulaire` dans Documents
5. Envoyer une demande de rendez-vous
6. Se connecter comme enseignant ou admin pour montrer le filtrage par rôle

## Limites

- Comptes démo seulement
- Données stockées en JSON
- IA optionnelle non obligatoire
- À remplacer par SSO et base de données réelle en production
