import crypto from "node:crypto";
import jwt from "jsonwebtoken";

const PASSWORD = "Agora2026!";
const JWT_SECRET = process.env.JWT_SECRET || "demo-secret-change-me";

function hashPassword(password) {
  return crypto
    .createHash("sha256")
    .update(`agora-stage:${password}`)
    .digest("hex");
}

export const users = [
  {
    id: "u-student-1",
    name: "Sara Étudiante",
    email: "etudiant@college.local",
    role: "student",
    roleLabel: "Étudiant",
    passwordHash: hashPassword(PASSWORD)
  },
  {
    id: "u-teacher-1",
    name: "Nadia Enseignante",
    email: "enseignant@college.local",
    role: "teacher",
    roleLabel: "Enseignant",
    passwordHash: hashPassword(PASSWORD)
  },
  {
    id: "u-admin-1",
    name: "Karim Administration",
    email: "admin@college.local",
    role: "staff",
    roleLabel: "Administration",
    passwordHash: hashPassword(PASSWORD)
  }
];

export function sanitizeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

export function authenticate(email, password) {
  const user = users.find(
    (entry) => entry.email.toLowerCase() === String(email).toLowerCase()
  );

  if (!user) return null;

  return user.passwordHash === hashPassword(password)
    ? sanitizeUser(user)
    : null;
}

export function signToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "8h" });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ error: "Jeton manquant." });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Session invalide ou expirée." });
  }
}