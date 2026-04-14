import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Load .env file explicitly
// Try multiple paths to handle both dev and bundled runtimes
const envPaths = [
  join(process.cwd(), ".env"),
  join(process.cwd(), "artifacts", "api-server", ".env"),
];

let envPath: string | null = null;
for (const path of envPaths) {
  if (existsSync(path)) {
    envPath = path;
    break;
  }
}

if (envPath) {
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
