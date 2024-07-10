import { z } from "zod";

// 로그인
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  authLogin: z.boolean().optional(),
});

// 아이디 찾기
export const findIdSchema = z.object({
  name: z.string().min(1),
  phone: z.string().regex(/^\d{10,12}$/, { message: "유효한 휴대폰 번호를 입력해주세요." }),
});

// 비밀번호 찾기
export const findPasswordSchema = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});

// 생일
const birthDateSchema = z
  .string()
  .regex(/^\d{6}$/, { message: "생년월일은 6자리여야 합니다." })
  .refine(
    (value) => {
      const year = parseInt(value.slice(0, 2), 10);
      const month = parseInt(value.slice(2, 4), 10);
      const day = parseInt(value.slice(4, 6), 10);

      // 2000년 이후 출생자는 2000년을 기준으로, 그 이전 출생자는 1900년을 기준으로 한다.
      const fullYear = year < 50 ? 2000 + year : 1900 + year;

      // 월 검증 (1월부터 12월까지)
      if (month < 1 || month > 12) return false;

      // 일 검증 (해당 월의 일 수에 맞춰서 검사)
      const maxDaysInMonth = new Date(fullYear, month, 0).getDate();
      return day > 0 && day <= maxDaysInMonth;
    },
    { message: "유효하지 않은 날짜입니다." },
  );

//회원가입
const baseRegisterSchema = z.object({
  phone: z.string().regex(/^\d{10,12}$/, { message: "유효한 휴대폰 번호를 입력해주세요." }),
  birth: birthDateSchema,
});

const googleRegisterSchema = baseRegisterSchema.extend({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});

const kakaoRegisterSchema = googleRegisterSchema.extend({
  emailCertification: z.string().regex(/^\d{6}$/, { message: "인증코드 6자리 입력해주세요." }),
});

const passwordSchema = z.object({
  password: z.string().regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>\/?\-]).{8,20}$/, {
    message: "8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합",
  }),
  passwordChk: z.string().regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>\/?\-]).{8,20}$/, {
    message: "8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합",
  }),
});

const regularRegisterSchema = kakaoRegisterSchema
  .merge(passwordSchema)
  .refine((data) => data.password === data.passwordChk, {
    message: "동일한 비밀번호가 아닙니다. 다시 확인 후 입력해주세요.",
    path: ["passwordChk"],
  });

export const registerSchema = (isSocialLogin: "google" | "kakao" | "regular") => {
  switch (isSocialLogin) {
    case "google":
      return baseRegisterSchema;
    case "kakao":
      return kakaoRegisterSchema;
    case "regular":
      return regularRegisterSchema;
    default:
      throw new Error("Invalid social login type");
  }
};

// 프로필
export const profileSchema = z.object({
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .min(1, "관심 종목을 최소 하나 선택해야 합니다."),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TFindEmailSchema = z.infer<typeof findIdSchema>;
export type TFindPasswordSchema = z.infer<typeof findPasswordSchema>;

export type TBaseRegisterSchema = z.infer<typeof baseRegisterSchema>;
export type TGoogleRegisterSchema = z.infer<typeof googleRegisterSchema>;
export type TKakaoRegisterSchema = z.infer<typeof kakaoRegisterSchema>;
export type TRegularRegisterSchema = z.infer<typeof regularRegisterSchema>;
export type TRegisterSchemaType = TBaseRegisterSchema &
  Partial<TGoogleRegisterSchema> &
  Partial<TKakaoRegisterSchema> &
  Partial<TRegularRegisterSchema>;
export type TProfileSchema = z.infer<typeof profileSchema>;
