import { z } from "zod";

export const RecentSchema = z
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

export const SearchRecentSchema = z.object({
  searchText: z.string(),
  searchDate: z.string(),
});

export type RecentDataType = z.infer<typeof RecentSchema>;
export type SearchRecentDataType = z.infer<typeof SearchRecentSchema>;
