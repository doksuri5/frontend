import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { NewsSummarySchema } from "@/types/NewsDataType";
import { auth } from "@/auth";
import { AI_MODEL, LANGUAGE_MAP } from "@/constants/ai-info";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { content } = await req.json();
  const session = await auth();

  const result = await streamObject({
    model: openai(AI_MODEL),
    schema: NewsSummarySchema,
    system: `Summarize the following news article in ${LANGUAGE_MAP[session?.user.language ?? "ko"]} language`,
    prompt: "Summarize the following news article:" + content,
  });

  return result.toTextStreamResponse();
}
