import fs from "node:fs/promises";
import path from "node:path";

const conversationsPath = path.resolve("data", "conversations.json");

export async function readHistory(userId) {
  try {
    const raw = await fs.readFile(conversationsPath, "utf8");
    const messages = JSON.parse(raw);
    return messages.filter((msg) => msg.userId === userId).slice(-30);
  } catch {
    return [];
  }
}

export async function appendConversation(entry) {
  let messages = [];
  try {
    messages = JSON.parse(await fs.readFile(conversationsPath, "utf8"));
  } catch {
    messages = [];
  }

  messages.push({
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...entry
  });

  await fs.writeFile(conversationsPath, JSON.stringify(messages, null, 2));
}