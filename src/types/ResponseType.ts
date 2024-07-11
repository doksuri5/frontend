import { z } from "zod";

export const ApiResponse = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    data: dataSchema.array(),
    ok: z.boolean(),
  });
};
