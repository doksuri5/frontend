import { z } from "zod";

export const investPropensitySchema = z.object({
  investPropensity: z.object({
    1: z.string(),
    2: z.string(),
    3: z.string(),
    4: z.string(),
    5: z.array(z.string()),
  }),
  isAgreeCreditInfo: z.boolean(),
});

export type TInvestPropensity = z.infer<typeof investPropensitySchema>;
export type TInvestPropensityDetails = z.infer<typeof investPropensitySchema>["investPropensity"];
