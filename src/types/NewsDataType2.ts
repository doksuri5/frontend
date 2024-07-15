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
    thumbnail_url: z.string().url(),
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
    published_time: z.string(),
    link: z.string().url(),
    content: z.object({
      ko: z.string(),
      en: z.string(),
      ch: z.string(),
      jp: z.string(),
      // fr: z.string(),
    }),
    content_img: z.string().url(),
    relative_stock: z.array(z.string()).optional(),
    score: z.number().default(0),
    view: z.number().default(0),
    ai_summary: z
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
    thumbnail_url: true,
    title: true,
    description: true,
    published_time: true,
    link: true,
    content: true,
    content_img: true,
  });

export const SearchStockNewsSchema = z.object({
  index: z.string(),
  thumbnail_url: z.string().url(),
  published_time: z.string(),
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
