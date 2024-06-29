import { z } from "zod";

// 로그인
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// 아이디 찾기
export const findIdSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10).max(12).regex(/^\d+$/),
});

// 비밀번호 찾기
export const findPasswordSchema = z.object({
  name: z.string().min(1),
  id: z.string().min(1),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TFindEmailSchema = z.infer<typeof findIdSchema>;
export type TFindPasswordSchema = z.infer<typeof findPasswordSchema>;
