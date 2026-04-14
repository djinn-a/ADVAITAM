import { createLeadSchema, listLeadQuerySchema } from "../schemas";
import { ensureLeadSchema, listLeads, createLead } from "../db";
import { errorResponse, jsonResponse } from "../utils";

export async function onRequest(context: any) {
  await ensureLeadSchema(context.env);
  const { request } = context;

  if (request.method === "GET") {
    const url = new URL(request.url);
    const query: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      query[key] = value;
    });
    const queryResult = listLeadQuerySchema.safeParse(query);

    if (!queryResult.success) {
      return errorResponse(queryResult.error.message, 400);
    }

    const leads = await listLeads(context.env, queryResult.data);
    return jsonResponse(leads);
  }

  if (request.method === "POST") {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return errorResponse("Request body must be valid JSON", 400);
    }

    const parsed = createLeadSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(parsed.error.message, 400);
    }

    const lead = await createLead(context.env, parsed.data as any);
    return jsonResponse(lead, 201);
  }

  return errorResponse("Method not allowed", 405);
}
