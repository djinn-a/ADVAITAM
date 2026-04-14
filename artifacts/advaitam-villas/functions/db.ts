const CREATE_LEADS_TABLE = `CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  source TEXT NOT NULL DEFAULT 'brochure',
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

function rowToLead(row: any) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email === undefined ? null : row.email,
    source: row.source,
    status: row.status,
    notes: row.notes === undefined ? null : row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function ensureLeadSchema(env: any) {
  return await env.D1.prepare(CREATE_LEADS_TABLE).run();
}

export async function listLeads(env: any, filters: { status?: string; source?: string }) {
  let sql = "SELECT * FROM leads";
  const binds: Array<string> = [];
  const conditions: string[] = [];

  if (filters.status) {
    conditions.push("status = ?");
    binds.push(filters.status);
  }
  if (filters.source) {
    conditions.push("source = ?");
    binds.push(filters.source);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql += " ORDER BY created_at DESC";

  const result = await env.D1.prepare(sql).bind(...binds).all();
  const rows = result.results ?? [];
  return rows.map(rowToLead);
}

export async function getLeadById(env: any, id: number) {
  const result = await env.D1.prepare("SELECT * FROM leads WHERE id = ?").bind(id).all();
  const lead = (result.results ?? [])[0];
  return lead ? rowToLead(lead) : null;
}

export async function createLead(env: any, data: { name: string; phone: string; email?: string | null; source: string }) {
  const result = await env.D1.prepare(
    "INSERT INTO leads (name, phone, email, source) VALUES (?, ?, ?, ?)"
  )
    .bind(data.name, data.phone, data.email ?? null, data.source)
    .run();

  const id = Number(result?.lastInsertRowid ?? 0);
  if (!id) {
    throw new Error("Failed to insert lead");
  }

  return await getLeadById(env, id);
}

export async function updateLead(env: any, id: number, data: { status?: string; notes?: string | null }) {
  const segments: string[] = [];
  const binds: Array<string | number | null> = [];

  if (data.status !== undefined) {
    segments.push("status = ?");
    binds.push(data.status);
  }
  if (data.notes !== undefined) {
    segments.push("notes = ?");
    binds.push(data.notes);
  }

  if (segments.length === 0) {
    return null;
  }

  binds.push(id);
  const sql = `UPDATE leads SET ${segments.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  const result = await env.D1.prepare(sql).bind(...binds).run();

  if (!result || result.status !== 200) {
    return null;
  }

  return await getLeadById(env, id);
}

export async function deleteLead(env: any, id: number) {
  const result = await env.D1.prepare("DELETE FROM leads WHERE id = ?").bind(id).run();
  return Boolean(result && result.status === 200);
}

export async function getLeadStats(env: any) {
  const totalResult = await env.D1.prepare("SELECT COUNT(*) AS count FROM leads").all();
  const total = Number((totalResult.results?.[0]?.count ?? 0) ?? 0);

  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const fromToday = now.toISOString();

  const newTodayResult = await env.D1.prepare(
    "SELECT COUNT(*) AS count FROM leads WHERE created_at >= ?"
  )
    .bind(fromToday)
    .all();
  const newToday = Number((newTodayResult.results?.[0]?.count ?? 0) ?? 0);

  const statusResult = await env.D1.prepare(
    "SELECT status, COUNT(*) AS count FROM leads GROUP BY status"
  ).all();
  const byStatus = {
    new: 0,
    contacted: 0,
    qualified: 0,
    lost: 0,
  };
  for (const row of statusResult.results ?? []) {
    if (row.status in byStatus) {
      byStatus[row.status as keyof typeof byStatus] = Number(row.count ?? 0);
    }
  }

  const sourceResult = await env.D1.prepare(
    "SELECT source, COUNT(*) AS count FROM leads GROUP BY source"
  ).all();
  const bySource = {
    brochure: 0,
    "site-visit": 0,
    whatsapp: 0,
    "exit-popup": 0,
  };
  for (const row of sourceResult.results ?? []) {
    if (row.source in bySource) {
      bySource[row.source as keyof typeof bySource] = Number(row.count ?? 0);
    }
  }

  return {
    total,
    newToday,
    byStatus,
    bySource,
  };
}
