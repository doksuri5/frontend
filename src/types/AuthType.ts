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

// 본인인증
export const verifyUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  emailCertification: z.string().min(6).max(6).regex(/^\d+$/, { message: "인증코드가 일치하지 않습니다." }),
});

// 회원가입
export const registerSchema = z
  .object({
    id: z
      .string()
      .min(6, { message: "아이디는 최소 6자 이상이어야 합니다." })
      .max(12, { message: "아이디는 최대 12자 이내여야 합니다." })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "아이디는 영문, 숫자, _, 만 사용할 수 있습니다." }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>\/?\-]).{8,20}$/, {
      message: "8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합",
    }),
    passwordChk: z.string().regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>\/?\-]).{8,20}$/, {
      message: "8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합",
    }),
    phone: z.string().min(10).max(12).regex(/^\d+$/),
    birth: z
      .string()
      .length(6, { message: "생년월일은 6자리여야 합니다." })
      .regex(/^\d{6}$/, { message: "유효한 생년월일을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordChk, {
    message: "동일한 비밀번호가 아닙니다. 다시 확인 후 입력해주세요.",
    path: ["passwordChk"],
  });

// 프로필
export const profileSchema = z.object({
  nickname: z.string().min(1),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TFindEmailSchema = z.infer<typeof findIdSchema>;
export type TFindPasswordSchema = z.infer<typeof findPasswordSchema>;
export type TVerifyUserSchema = z.infer<typeof verifyUserSchema>;
export type TRegisterSchemaType = z.infer<typeof registerSchema>;
export type TProfileSchema = z.infer<typeof profileSchema>;
