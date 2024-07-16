import { z } from "zod";

export const NewsSchema = z
  .object({
    index: z.string(),
    publisher: z.object({
      ko: z.string(),
      en: z.string(),
      ch: z.string(),
      jp: z.string(),
      // fr: z.string(),
    }),
    thumbnailUrl: z.string().url(),
    title: z.object({
      ko: z.string(),
      en: z.string(),
      ch: z.string(),
      jp: z.string(),
      // fr: z.string(),
    }),
    description: z.object({
      ko: z.string(),
      en: z.string(),
      ch: z.string(),
      jp: z.string(),
      // fr: z.string(),
    }),
    publishedTime: z.string(),
    link: z.string().url(),
    content: z.object({
      ko: z.string(),
      en: z.string(),
      ch: z.string(),
      jp: z.string(),
      // fr: z.string(),
    }),
    contentImg: z.string().url(),
    relativeStock: z.array(z.string()).optional(),
    score: z.number().default(0),
    view: z.number().default(0),
    aiSummary: z
      .object({
        ko: z.string().optional(),
        en: z.string().optional(),
        ch: z.string().optional(),
        jp: z.string().optional(),
        // fr: z.string().optional(),
      })
      .partial(),
  })
  .required({
    index: true,
    publisher: true,
    thumbnailUrl: true,
    title: true,
    description: true,
    publishedTime: true,
    link: true,
    content: true,
    contentImg: true,
  });

export const SearchStockNewsSchema = z.object({
  index: z.string(),
  thumbnailUrl: z.string().url(),
  publishedTime: z.string(),
  publisher: z.object({
    ko: z.string(),
    en: z.string(),
    ch: z.string(),
    jp: z.string(),
    // fr: z.string(),
  }),
  title: z.object({
    ko: z.string(),
    en: z.string(),
    ch: z.string(),
    jp: z.string(),
    // fr: z.string(),
  }),
});

export type NewsDataType = z.infer<typeof NewsSchema>;
export type SearchStockNewsDataType = z.infer<typeof SearchStockNewsSchema>;
