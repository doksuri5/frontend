"use server";

import { revalidateTag } from "next/cache";

export async function revalidatePropensity() {
  revalidateTag("investPropensity");
}
