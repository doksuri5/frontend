import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { ContentSummarySchema } from "@/types/NewsDataType";
import { auth } from "@/auth";
import { AI_MODEL, LANGUAGE_MAP } from "@/constants/ai-info";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { content } = await req.json();
  const session = await auth();

  const result = await generateObject({
    model: openai(AI_MODEL),
    schema: ContentSummarySchema,
    system: "Summarize the following content",
    prompt:
      `Summarize the following this content only 50 token in (please answer in ${LANGUAGE_MAP[session?.user.language ?? "ko"]}):` +
      content,
  });

  return Response.json({
    ...result.object,
  });
}
