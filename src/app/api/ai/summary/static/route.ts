import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { ContentSummarySchema } from "@/types/NewsDataType";
import { AI_MODEL } from "@/constants/ai-info";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { content } = await req.json();

  const result = await generateObject({
    model: openai(AI_MODEL),
    schema: ContentSummarySchema,
    system: "Summarize the following content please answer in content's language",
    prompt: `Summarize the following this content only 50 token :` + content,
  });

  return Response.json({
    ...result.object,
  });
}
