"use server";

import { api } from "@/lib/api";
import { z } from "zod";

const AgreeSchema = z.object({
  termsOfService: z.object({
    content: z.string(),
    lastUpdated: z.string(),
    updates: z.array(z.string()).default([]),
  }),
  privacyPolicy: z.object({
    content: z.string(),
    lastUpdated: z.string(),
    updates: z.array(z.string()).default([]),
  }),
  id: z.string(),
});

export type AgreeDataType = z.infer<typeof AgreeSchema>;

export const getAgreeContent = api.get({
  endpoint: "/terms/getTerms",
  responseSchema: AgreeSchema,
})<undefined, AgreeDataType>;
