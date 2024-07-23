import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { NewsSummarySchema } from "@/types/NewsDataType";
import { auth } from "@/auth";
import { LANGUAGE_MAP } from "@/constants/ai-info";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { content } = await req.json();
  const session = await auth();

  const result = await streamObject({
    model: openai("gpt-4-turbo"),
    schema: NewsSummarySchema,
    prompt: "Summarize the following news article:" + content + `${LANGUAGE_MAP[session?.user.language ?? "ko"]}`,
  });

  return result.toTextStreamResponse();
}
