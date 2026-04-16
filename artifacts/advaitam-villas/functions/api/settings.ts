import { siteSettingsSchema } from "../schemas";
import {
  ensureSettingsSchema,
  getAllSettings,
  updateMultipleSettings,
} from "../db";
import { errorResponse, jsonResponse } from "../utils";

export async function onRequest(context: any) {
  const { request } = context;
  console.log("[API /settings] Request received:", request.method);
  await ensureSettingsSchema(context.env);

  if (request.method === "GET") {
    console.log("[API /settings] Fetching settings...");
    const settings = await getAllSettings(context.env);
    console.log(
      "[API /settings] Returning settings with",
      Object.keys(settings).length,
      "keys",
    );
    return jsonResponse(settings);
  }

  if (request.method === "POST") {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return errorResponse("Request body must be valid JSON", 400);
    }

    const parsed = siteSettingsSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(parsed.error.message, 400);
    }

    await updateMultipleSettings(context.env, parsed.data);
    const updatedSettings = await getAllSettings(context.env);
    return jsonResponse(updatedSettings);
  }

  return errorResponse("Method not allowed", 405);
}
