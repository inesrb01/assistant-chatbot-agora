import { spawn } from "node:child_process";
import net from "node:net";

function isFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port, "127.0.0.1");
  });
}

async function findPort(start) {
  let port = start;
  while (!(await isFree(port))) port++;
  return port;
}

const apiPort = await findPort(Number(process.env.PORT || 3103));
const clientPort = await findPort(5173);
const apiUrl = `http://127.0.0.1:${apiPort}`;
const clientUrl = `http://127.0.0.1:${clientPort}`;

console.log("Agora Assistant dev");
console.log(`API:    ${apiUrl}/api/health`);
console.log(`Client: ${clientUrl}`);

const common = { shell: true, stdio: "inherit" };

const api = spawn("npm", ["run", "dev", "--workspace=server"], {
  ...common,
  env: { ...process.env, PORT: String(apiPort), CLIENT_ORIGIN: clientUrl }
});

const client = spawn("npm", ["run", "dev", "--workspace=client", "--", "--host", "127.0.0.1", "--port", String(clientPort)], {
  ...common,
  env: { ...process.env, VITE_API_PROXY_TARGET: apiUrl }
});

function stop() {
  api.kill();
  client.kill();
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
