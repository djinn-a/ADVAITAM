import { updateLeadSchema } from "../../schemas";
import { ensureLeadSchema, getLeadById, updateLead, deleteLead } from "../../db";
import { errorResponse, jsonResponse } from "../../utils";

export async function onRequest(context: any) {
  await ensureLeadSchema(context.env);
  const { request, params } = context;
  const id = Number(params?.id);

  if (!Number.isFinite(id) || id <= 0 || Math.floor(id) !== id) {
    return errorResponse("Invalid lead id", 400);
  }

  if (request.method === "GET") {
    const lead = await getLeadById(context.env, id);
    if (!lead) {
      return errorResponse("Lead not found", 404);
    }
    return jsonResponse(lead);
  }

  if (request.method === "PATCH") {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return errorResponse("Request body must be valid JSON", 400);
    }

    const parsed = updateLeadSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(parsed.error.message, 400);
    }

    const lead = await updateLead(context.env, id, parsed.data);
    if (!lead) {
      return errorResponse("Lead not found or update failed", 404);
    }
    return jsonResponse(lead);
  }

  if (request.method === "DELETE") {
    const deleted = await deleteLead(context.env, id);
    if (!deleted) {
      return errorResponse("Lead not found", 404);
    }
    return new Response(null, { status: 204 });
  }

  return errorResponse("Method not allowed", 405);
}
