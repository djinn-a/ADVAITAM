import { ensureLeadSchema, getLeadStats } from "../../db";
import { jsonResponse } from "../../utils";

export async function onRequest(context: any) {
  await ensureLeadSchema(context.env);
  const stats = await getLeadStats(context.env);
  return jsonResponse(stats);
}
