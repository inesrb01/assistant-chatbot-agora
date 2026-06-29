import { createServer } from "./server.js";

const port = Number(process.env.PORT || 3103);
createServer().listen(port, () => {
  console.log(`API production running on port ${port}`);
});
