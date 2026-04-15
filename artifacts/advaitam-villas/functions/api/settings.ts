import { siteSettingsSchema } from "../schemas";
import { ensureSettingsSchema, getAllSettings, updateMultipleSettings } from "../db";
import { errorResponse, jsonResponse } from "../utils";

export async function onRequest(context: any) {
  await ensureSettingsSchema(context.env);
  const { request } = context;

  if (request.method === "GET") {
    const settings = await getAllSettings(context.env);
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
