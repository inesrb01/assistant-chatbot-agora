import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { z } from "zod";
import { authenticate, requireAuth, signToken } from "./auth.js";
import { getKnowledgeForRole, searchDocuments, searchKnowledge } from "./knowledge.js";
import { generateAnswer } from "./ai.js";
import { appendConversation, readHistory } from "./store.js";

dotenv.config({ path: "server/.env" });

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
const messageSchema = z.object({ message: z.string().min(2).max(800) });
const appointmentSchema = z.object({
  service: z.string().min(2),
  subject: z.string().min(3),
  availability: z.string().min(3),
  mode: z.enum(["presentiel", "en-ligne", "telephone"])
});

export function createServer() {
  const app = express();
  const clientOrigin = process.env.CLIENT_ORIGIN || "http://127.0.0.1:5173";

  app.use(helmet());
  app.use(cors({ origin: clientOrigin, credentials: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => res.json({ ok: true, app: "Agora Chatbot Stage" }));

  app.post("/api/auth/login", (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Données de connexion invalides." });
    const user = authenticate(parsed.data.email, parsed.data.password);
    if (!user) return res.status(401).json({ error: "Courriel ou mot de passe incorrect." });
    res.json({ token: signToken(user), user });
  });

  app.get("/api/auth/me", requireAuth, (req, res) => res.json({ user: req.user }));

  app.get("/api/knowledge", requireAuth, async (req, res) => {
    res.json({ items: await getKnowledgeForRole(req.user.role) });
  });

  app.get("/api/documents", requireAuth, async (req, res) => {
    const query = String(req.query.q || "");
    res.json({ documents: await searchDocuments(query, req.user.role) });
  });

  app.get("/api/chat/history", requireAuth, async (req, res) => {
    res.json({ messages: await readHistory(req.user.id) });
  });

  app.post("/api/chat/message", requireAuth, async (req, res) => {
    const parsed = messageSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Message invalide." });

    const question = parsed.data.message;
    const sources = await searchKnowledge(question, req.user.role);
    const documents = await searchDocuments(question, req.user.role);
    const result = await generateAnswer({ question, sources, documents });

    const entry = {
      userId: req.user.id,
      role: req.user.role,
      question,
      answer: result.answer,
      sources: sources.map(({ score, ...source }) => source),
      documents: documents.slice(0, 3)
    };
    await appendConversation(entry);
    res.json({ ...entry, mode: result.mode });
  });

  app.post("/api/appointments", requireAuth, async (req, res) => {
    const parsed = appointmentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Demande de rendez-vous invalide." });
    res.status(201).json({ requestId: `RDV-${Date.now().toString().slice(-6)}`, status: "reçue", request: parsed.data });
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  });

  return app;
}
