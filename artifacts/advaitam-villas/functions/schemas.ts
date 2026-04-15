import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().nullable(),
  source: z.enum(["brochure", "site-visit", "whatsapp", "exit-popup"]),
});

export const updateLeadSchema = z
  .object({
    status: z.enum(["new", "contacted", "qualified", "lost"]).optional(),
    notes: z.string().optional().nullable(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export const listLeadQuerySchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "lost"]).optional(),
  source: z
    .enum(["brochure", "site-visit", "whatsapp", "exit-popup"])
    .optional(),
});

export const siteSettingsSchema = z
  .object({
    whatsapp_phone: z
      .string()
      .regex(/^\d+$/, "Phone must be numbers only")
      .optional(),
    contact_email: z.string().email().optional(),
    current_availability: z
      .string()
      .regex(/^\d+$/, "Must be a number")
      .optional(),
    discount_pricing: z.string().optional(),
    discount_exit_intent: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one setting must be provided.",
  });
