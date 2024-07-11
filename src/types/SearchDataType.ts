import { z } from "zod";

export const RecentSearchSchema = z
  .object({
    user_snsId: z.string(),
    user_email: z.string().email("Invalid email format"),
    is_delete: z.boolean().default(false),
    stock_name: z.string().min(1, "stock_name is required"),
    search_date: z.date(),
  })
  .required({
    user_snsId: true,
    stock_name: true,
    search_date: true,
  });

export type SearchDetailType = z.infer<typeof RecentSearchSchema>;
