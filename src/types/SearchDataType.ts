import { z } from "zod";

export const SearchSchema = z
  .object({
    userSnsId: z.string(),
    isDelete: z.boolean().default(false),
    searchText: z.string(),
    searchDate: z.string(),
  })
  .required({
    userSnsId: true,
    searchText: true,
  });

export const SearchTextSchema = z.object({
  searchText: z.string(),
  searchDate: z.string(),
});

export type SearchDataType = z.infer<typeof SearchSchema>;
export type SearchTextDataType = z.infer<typeof SearchTextSchema>;
