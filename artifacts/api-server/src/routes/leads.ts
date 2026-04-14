import { Router, type IRouter } from "express";
import { and, eq, gte, sql } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import {
  ListLeadsQueryParams,
  CreateLeadBody,
  GetLeadParams,
  UpdateLeadParams,
  UpdateLeadBody,
  DeleteLeadParams,
  ListLeadsResponse,
  GetLeadResponse,
  UpdateLeadResponse,
  GetLeadStatsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/leads/stats", async (req, res): Promise<void> => {
  const allLeads = await db.select().from(leadsTable);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayLeads = await db
    .select()
    .from(leadsTable)
    .where(gte(leadsTable.createdAt, today));

  const byStatus = { new: 0, contacted: 0, qualified: 0, lost: 0 };
  const bySource: Record<string, number> = {
    brochure: 0,
    "site-visit": 0,
    whatsapp: 0,
    "exit-popup": 0,
  };

  for (const lead of allLeads) {
    const s = lead.status as keyof typeof byStatus;
    if (s in byStatus) byStatus[s]++;
    if (lead.source in bySource) bySource[lead.source]++;
  }

  const stats = {
    total: allLeads.length,
    newToday: todayLeads.length,
    byStatus,
    bySource: bySource as {
      brochure: number;
      "site-visit": number;
      whatsapp: number;
      "exit-popup": number;
    },
  };

  res.json(GetLeadStatsResponse.parse(stats));
});

router.get("/leads", async (req, res): Promise<void> => {
  const query = ListLeadsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const conditions = [];
  if (query.data.status) {
    conditions.push(eq(leadsTable.status, query.data.status));
  }
  if (query.data.source) {
    conditions.push(eq(leadsTable.source, query.data.source));
  }

  const leads =
    conditions.length > 0
      ? await db
          .select()
          .from(leadsTable)
          .where(and(...conditions))
          .orderBy(sql`${leadsTable.createdAt} desc`)
      : await db
          .select()
          .from(leadsTable)
          .orderBy(sql`${leadsTable.createdAt} desc`);

  res.json(ListLeadsResponse.parse(leads));
});

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();

  req.log.info({ leadId: lead.id, source: lead.source }, "New lead created");
  res.status(201).json(GetLeadResponse.parse(lead));
});

router.get("/leads/:id", async (req, res): Promise<void> => {
  const params = GetLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [lead] = await db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.id, params.data.id));

  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json(GetLeadResponse.parse(lead));
});

router.patch("/leads/:id", async (req, res): Promise<void> => {
  const params = UpdateLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateLeadBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [lead] = await db
    .update(leadsTable)
    .set(body.data)
    .where(eq(leadsTable.id, params.data.id))
    .returning();

  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json(UpdateLeadResponse.parse(lead));
});

router.delete("/leads/:id", async (req, res): Promise<void> => {
  const params = DeleteLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [lead] = await db
    .delete(leadsTable)
    .where(eq(leadsTable.id, params.data.id))
    .returning();

  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
