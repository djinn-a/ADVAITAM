import { jsonResponse } from "../utils";

export async function onRequest() {
  return jsonResponse({ status: "ok" });
}
