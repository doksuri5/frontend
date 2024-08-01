import { StaticImageData } from "next/image";
import { z } from "zod";

export interface CardNewsDataType {
  _id?: string;
  date: string;
  title: string;
  stockCode?: string;
  image?: string | StaticImageData;
  description: string;
  publisher: string;
}

export interface NewsItemType {
  _id?: string;
  image: StaticImageData;
  title: string;
  description: string;
  publishedTime: string;
  publisher: string;
  style?: string;
}

export interface NewsDetailType extends NewsItemType {
  view: string;
  aiSummary: string;
}

export const NewsSummarySchema = z.object({
  newsSummary: z.string(),
});

export const ContentSummarySchema = z.object({
  contentSummary: z.string(),
});

export type ContentSummaryType = z.infer<typeof ContentSummarySchema>;
export type NewsSummaryType = z.infer<typeof NewsSummarySchema>;
