export async function generateAnswer({ question, sources, documents }) {
  const best = sources[0];
  if (!best) {
    return {
      answer: "Je n'ai pas trouvé d'information interne assez précise pour répondre. Essaie avec une question plus détaillée ou contacte l'administration.",
      mode: "local"
    };
  }

  const docLine = documents?.length
    ? `\n\nDocuments utiles : ${documents.slice(0, 2).map((doc) => doc.title).join(", ")}.`
    : "";

  return {
    answer: `D'après la base interne, ${best.content}${docLine}`,
    mode: process.env.OPENAI_API_KEY ? "fallback-local" : "local"
  };
}
