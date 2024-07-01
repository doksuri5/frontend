import { NextRequest } from "next/server";

// temperature는 모델이 다음에 나올 단어를 선택할 때 얼마나 무작위적으로 선택할지를 조절하여 생성되는 텍스트의 다양성과 일관성을 균형 있게 유지하는 데 중요한 역할을 합니다.
// default : 0.7

// top_p는 모델이 텍스트를 생성할 때 선택할 단어의 범위를 조절하여 더 자연스러운 결과를 얻기 위해 중요한 역할을 합니다.
// default : 0.9

// iteratorToStream 함수: 비동기 반복기를 스트림으로 변환
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

// asyncGeneratorFromResponse 함수: Response 객체의 바디를 비동기 반복기로 변환
async function* asyncGeneratorFromResponse(response: Response) {
  const reader = response.body?.getReader();
  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield value;
  }
}

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as { user_message: string; temperature?: number; top_p?: number };

  const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "sfacspace_1",
      password: "dMjVGr43rUQb",
    }),
  });

  const data = await tokenRes.json();
  const chatToken = data.access_token;

  const res = await fetch(`${process.env.LLAMA_CHAT_API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${chatToken}`,
    },
    body: JSON.stringify({
      user_message: `My question is '${body.user_message}'. You can answer like this: 'The answer is ...' Please answer in this format only one sentence.`,
      temperature: body.temperature ?? 0.2,
      top_p: body.top_p ?? 0.1,
    }),
  });

  const asyncIterator = asyncGeneratorFromResponse(res);
  const stream = iteratorToStream(asyncIterator);

  return new Response(stream);
};
