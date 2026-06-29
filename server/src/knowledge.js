import fs from "node:fs/promises";
import path from "node:path";

const dataDir = path.resolve("server", "data");

const STOP_WORDS = new Set([
  "les", "des", "une", "dans", "pour", "avec", "comment", "quoi", "mon", "mes",
  "est", "sur", "que", "qui", "de", "du", "la", "le", "l", "un", "a", "au",
  "aux", "je", "veux", "ou", "où", "d", "en"
]);

const DIRECT_ANSWERS = [
  {
    keywords: ["horaire", "cours", "emploi", "temps"],
    title: "Consulter l'horaire de cours",
    category: "Horaire",
    content:
      "Vous pouvez consulter votre horaire dans la section Emploi du temps de l'intranet Agora. Vous pouvez aussi utiliser le bouton Emploi du temps dans le menu de gauche.",
    audience: ["student", "teacher", "staff", "all"],
    tags: ["horaire", "cours", "emploi du temps"]
  },
  {
    keywords: ["reprise", "examen", "absence", "justifiee", "justifiée"],
    title: "Demander une reprise d'examen",
    category: "Examens",
    content:
      "Pour demander une reprise d'examen, vous devez remplir le formulaire de reprise d'examen dans la section Documents, puis contacter le service pédagogique avec votre justification.",
    audience: ["student", "teacher", "staff", "all"],
    tags: ["reprise", "examen", "formulaire"]
  },
  {
    keywords: ["document", "officiel", "attestation", "releve", "relevé", "formulaire"],
    title: "Demander un document officiel",
    category: "Documents",
    content:
      "Pour obtenir un document officiel, allez dans la section Documents, recherchez le formulaire nécessaire, puis envoyez votre demande à l'administration.",
    audience: ["student", "teacher", "staff", "all"],
    tags: ["document", "officiel", "formulaire"]
  },
  {
    keywords: ["connexion", "probleme", "problème", "login", "mot", "passe", "agora"],
    title: "Problème de connexion Agora",
    category: "Support",
    content:
      "En cas de problème de connexion Agora, vérifiez votre courriel et votre mot de passe. Si le problème continue, contactez le support ou l'administration.",
    audience: ["student", "teacher", "staff", "all"],
    tags: ["connexion", "support", "mot de passe"]
  }
];

export function normalize(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ");
}

export function tokenize(text) {
  return normalize(text)
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

async function readJson(filename, fallback = []) {
  try {
    const file = await fs.readFile(path.join(dataDir, filename), "utf8");
    return JSON.parse(file);
  } catch {
    return fallback;
  }
}

export async function getKnowledgeForRole(role) {
  const items = await readJson("knowledgeBase.json");
  return [...DIRECT_ANSWERS, ...items].filter(
    (item) => item.audience.includes(role) || item.audience.includes("all")
  );
}

export async function searchKnowledge(query, role, limit = 3) {
  const words = tokenize(query);
  const normalizedQuery = normalize(query);
  const items = await getKnowledgeForRole(role);

  return items
    .map((item) => {
      const haystack = normalize(
        `${item.title} ${item.category} ${(item.tags || []).join(" ")} ${item.content}`
      );

      const keywordScore = (item.keywords || []).reduce((total, word) => {
        return total + (normalizedQuery.includes(normalize(word)) ? 3 : 0);
      }, 0);

      const wordScore = words.reduce((total, word) => {
        return total + (haystack.includes(word) ? 1 : 0);
      }, 0);

      return { ...item, score: keywordScore + wordScore };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export async function searchDocuments(query, role) {
  const docs = await readJson("documents.json");
  const words = tokenize(query);

  return docs
    .filter((doc) => doc.audience.includes(role) || doc.audience.includes("all"))
    .map((doc) => {
      const haystack = normalize(`${doc.title} ${doc.category} ${doc.summary}`);
      const score =
        words.length === 0
          ? 1
          : words.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);

      return { ...doc, score };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score);
}