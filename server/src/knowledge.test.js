import test from "node:test";
import assert from "node:assert/strict";
import { authenticate } from "./auth.js";
import { searchKnowledge } from "./knowledge.js";

test("authentifie un compte démo valide", () => {
  const user = authenticate("etudiant@college.local", "Agora2026!");
  assert.equal(user.role, "student");
});

test("refuse un mauvais mot de passe", () => {
  const user = authenticate("etudiant@college.local", "bad");
  assert.equal(user, null);
});

test("filtre les connaissances selon le rôle", async () => {
  const results = await searchKnowledge("saisie notes", "student");
  assert.equal(results.some((item) => item.id === "kb-enseignant-notes"), false);
});
