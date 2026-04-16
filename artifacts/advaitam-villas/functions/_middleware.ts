import { errorResponse } from "./utils";

const AUTH_REALM = "Advaitam Admin";
const PROTECTED_PATHS = ["/admin", "/api/leads/stats"];

async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function isProtectedPath(url: string): boolean {
  const path = new URL(url).pathname;
  return PROTECTED_PATHS.some(
    (protectedPath) =>
      path === protectedPath || path.startsWith(protectedPath + "/"),
  );
}

function isWriteOperation(request: Request): boolean {
  const method = request.method;
  return (
    method === "POST" ||
    method === "PUT" ||
    method === "DELETE" ||
    method === "PATCH"
  );
}

function isLeadWriteOperation(path: string, request: Request): boolean {
  const isLeadPath = path.startsWith("/api/leads");
  const isReadOperation = request.method === "GET";
  return isLeadPath && !isReadOperation;
}

function isSettingsWriteOperation(path: string, request: Request): boolean {
  const isSettingsPath =
    path === "/api/settings" || path.startsWith("/api/settings/");
  const isReadOperation = request.method === "GET";
  return isSettingsPath && !isReadOperation;
}

export async function onRequest(context: any) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  const needsAuth =
    isProtectedPath(request.url) ||
    isLeadWriteOperation(path, request) ||
    isSettingsWriteOperation(path, request);

  if (!needsAuth) {
    return await next();
  }

  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="${AUTH_REALM}"`,
      },
    });
  }

  const encoded = authHeader.slice(6);
  const decoded = atob(encoded);
  const [username, password] = decoded.split(":");

  if (!password) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="${AUTH_REALM}"`,
      },
    });
  }

  const passwordHash = await sha256(password);
  const expectedHash = env.ADMIN_PASSWORD_HASH;

  if (!expectedHash) {
    console.error("ADMIN_PASSWORD_HASH environment variable not set");
    return errorResponse("Server configuration error", 500);
  }

  if (passwordHash !== expectedHash) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="${AUTH_REALM}"`,
      },
    });
  }

  return await next();
}
