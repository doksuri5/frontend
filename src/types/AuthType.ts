import { boolean, z } from "zod";

// 공통
const nameSchema = z.string().regex(/^[a-zA-Z가-힣\s]+$/, { message: "숫자나 특수기호가 포함될 수 없습니다." });
const emailSchema = z.string().email({ message: "올바른 이메일 형식이 아닙니다." });
const phoneSchema = z.string().regex(/^\d{10,12}$/, { message: "유효한 휴대폰 번호를 입력해주세요." });
const basePasswordSchema = z
  .string()
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>\/?\-]).{8,20}$|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$|^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\[\]{};':",.<>\/?\-]).{8,20}$|^(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>\/?\-]).{8,20}$/,
    {
      message: "8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합",
    },
  );

// 로그인
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
  authLogin: z.boolean().optional(),
});

// 이메일 찾기
export const findIdSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
});

// 비밀번호 찾기
export const findPasswordSchema = z.object({
  name: nameSchema,
  email: emailSchema,
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
  phone: phoneSchema,
  birth: birthDateSchema,
});

const googleRegisterSchema = baseRegisterSchema.extend({
  name: nameSchema,
  email: emailSchema,
});

const kakaoRegisterSchema = googleRegisterSchema.extend({
  emailCertification: z.string().regex(/^\d{6}$/, { message: "인증코드 6자리 입력해주세요." }),
});

const passwordSchema = z.object({
  password: basePasswordSchema,
  passwordChk: basePasswordSchema,
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
  nickname: z
    .string()
    .regex(/^[A-Za-z0-9-_ㄱ-ㅎㅏ-ㅣ가-힣]+$/, { message: "'_', '-'를 제외한 특수 문자는 사용할 수 없습니다." }),
  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .min(1, "관심 종목을 최소 하나 선택해야 합니다."),
  isAgreeCreditInfo: z.boolean(),
  investPropensity: z
    .object({
      1: z.string(),
      2: z.string(),
      3: z.string(),
      4: z.string(),
      5: z.array(z.string()),
    })
    .optional(),
});

// 약관
const updatesSchema = z.object({
  id: z.string(),
  reason: z.string(),
  date: z.string(),
});

const baseAgreeSchema = z.object({
  content: z.string(),
  lastUpdated: z.string(),
  updates: z.array(updatesSchema).default([]),
});

export const AgreeSchema = z.object({
  termsOfService: baseAgreeSchema,
  privacyPolicy: baseAgreeSchema,
  id: z.string(),
});

// 로그인 확인 요청
export const userLoginSchema = z.object({
  email: z.string().email(),
  pw: z.string().min(1),
});

// 일반 로그인 확인 요청
export const existingUserSchema = z.object({
  email: z.string().email(),
  isDelete: z.boolean(),
});

export const existingUserInfoSchema = z.object({
  id: z.string(),
  email: emailSchema,
});

export const socialUserOptionSchema = z.object({
  snsId: z.union([z.string(), z.number()]),
  loginType: z.enum(["local", "kakao", "google", "naver"]),
  isDelete: z.boolean(),
  email: z.string().email().optional(),
});

// 유저 응답 정보
export const userInfoSchema = z.object({
  id: z.string(),
  snsId: z.string(),
  name: z.string(),
  email: z.string().email(),
  birth: z.string(),
  phone: z.string().min(10).max(11),
  gender: z.union([z.literal("M"), z.literal("F"), z.null()]),
  profile: z.string().optional().default(""),
  nickname: z.string(),
  language: z.union([z.literal("ko"), z.literal("en"), z.literal("ch"), z.literal("fr"), z.literal("jp")]),
  loginType: z.enum(["local", "kakao", "google", "naver"]),
  isDelete: z.boolean(),
  updated_at: z.union([z.string(), z.null(), z.undefined()]),
  deleted_at: z.union([z.string(), z.null(), z.undefined()]),
  created_at: z.union([z.string().datetime(), z.undefined()]),
});

export type TLanguages = "ko" | "en" | "ch" | "fr" | "jp";

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

export type AgreeDataType = z.infer<typeof AgreeSchema>;

export type UserInfoDataType = z.infer<typeof userInfoSchema>;
export type UserLoginType = z.infer<typeof userLoginSchema>;

export type ExistingUserType = z.infer<typeof existingUserSchema>;
export type ExistingUserDataType = z.infer<typeof existingUserInfoSchema>;

export type SocialUserOptionsType = z.infer<typeof socialUserOptionSchema>;
