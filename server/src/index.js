import { createServer } from "./server.js";

const port = Number(process.env.PORT || 3103);
const app = createServer();

app.listen(port, "127.0.0.1", () => {
  console.log(`API running on http://127.0.0.1:${port}`);
});
