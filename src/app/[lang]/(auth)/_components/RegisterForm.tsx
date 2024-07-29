/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Input, Button, Modal } from "@/components/common";
import Timer from "./Timer";
import CommonLoadingBtn from "./CommonLoadingBtn";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";
import useToast from "@/hooks/use-toast";

import { useRegisterStore } from "@/providers/RegisterProvider";

import { cn } from "@/utils/cn";

import { TRegisterSchemaType, registerSchema } from "@/types/AuthType";

import { PROFILE_SETUP_PATH } from "@/routes/path";

export default function RegisterForm() {
  const { setForm } = useRegisterStore((state) => ({
    setForm: state.setForm,
  }));
  const t = useTranslations("auth");
  const router = useRouter();
  const { data: session } = useSession();

  const [isEmailShow, setIsEmailShow] = useState(true);
  const [isEmailCertificationShow, setIsEmailCertificationShow] = useState(false);
  const [emailCodeChkComplete, setEmailCodeChkComplete] = useState(false);
  const [timeCount, setTimeCount] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [passwordError, setPasswordError] = useState("");
  const { showLoadingToast, updateToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const socialGoogle = session?.user.role === "google";
  const socialKakao = session?.user.role === "kakao";
  const isSocialLogin = socialGoogle ? "google" : socialKakao ? "kakao" : "regular";
  const validationSchema = registerSchema(isSocialLogin);

  const {
    control: registerControl,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isValid: isRegisterValid },
    trigger: triggerRegister,
    watch: watchRegister,
    setError,
    setValue,
    clearErrors,
  } = useZodSchemaForm<TRegisterSchemaType>(validationSchema);

  const password = watchRegister("password");
  const passwordChk = watchRegister("passwordChk");

  // 이메일 인증 버튼 클릭시 실행되는 이벤트
  const emailVerificationHandler = async () => {
    const valid = await triggerRegister("email");
    const emailValue = watchRegister("email");

    setTimeCount(0); // 타이머 초기화
    setIsRunning(false); // 타이머 시작 초기화
    setTimeExpired(false); // 타이머 만료 상태 초기화
    setValue("emailCertification", "");
    clearErrors("emailCertification");
    setIsEmailShow(false);

    if (valid) {
      try {
        const toast = showLoadingToast(t("register.sendingEmail", { defaultMessage: "이메일을 전송중입니다." }));
        const response = await (
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/sendEmail`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: emailValue,
            }),
            cache: "no-store",
          })
        ).json();
        setIsEmailShow(true);
        if (response.ok) {
          updateToast(toast, t("register.emailSent", { defaultMessage: "이메일 전송이 완료되었습니다." }), "success");
          setIsOpen(true); // 팝업 노출
          setTimeCount(180); // 타이머 시간
          setIsRunning(true); // 타이머 시작
          setIsEmailCertificationShow(true); // 이메일 인증 코드 필드 보여줌
        } else {
          updateToast(
            toast,
            t("register.emailSendFailed", { defaultMessage: "이메일 전송이 실패되었습니다." }),
            "error",
          );
          setError("email", {
            type: "manual",
            message: "alreadyRegisteredEmail",
          });
        }
      } catch (e) {
        console.log(`Fetch Error:${e}`);
      }
    }
  };

  // 코드 인증 버튼 클릭시 실행되는 이벤트
  const emailCodeCheckHandler = async () => {
    const valid = await triggerRegister("emailCertification");
    const emailCertificationValue = watchRegister("emailCertification");
    const emailValue = watchRegister("email");

    if (valid) {
      try {
        const response = await (
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verifyCode`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: emailValue,
              code: emailCertificationValue,
            }),
            cache: "no-store",
          })
        ).json();
        setEmailCodeChkComplete(response.ok); // 이메일 인증 코드 확인 결과
        if (response.ok) {
          setIsRunning(false); // 타이머 멈춤
          setIsEmailShow(false); // 이메일 인증 버튼 숨김
        } else {
          setError("emailCertification", { type: "manual", message: "invalidOrExpiredCode" });
        }
      } catch (e) {
        console.log(`Fetch Error:${e}`);
      }
    }
  };

  // 다음 버튼 클릭시 실행되는 이벤트
  const onRegisterFormSubmit = (data: TRegisterSchemaType) => {
    if (isRegisterValid && emailCodeChkComplete) {
      startTransition(() => {
        const form = {
          name: data.name ?? "",
          email: data.email ?? "",
          password: data.password ?? "",
          birth: data.birth,
          phone: data.phone,
        };
        setForm({ form });
        router.push(PROFILE_SETUP_PATH);
      });
    }
  };

  const handleTimeUp = () => {
    setIsEmailShow(true);
    setIsRunning(false);
    setTimeExpired(true); // 타이머 만료 상태 설정
  };

  useEffect(() => {
    if (socialGoogle) {
      setIsEmailCertificationShow(false);
      setEmailCodeChkComplete(true);
      setIsEmailShow(true);
    }
  }, [socialGoogle]);

  useEffect(() => {
    if (password && passwordChk && password !== passwordChk) {
      setPasswordError(
        t("commonValidation.passwordMismatch", {
          defaultMessage: "동일한 비밀번호가 아닙니다. 다시 확인 후 입력해주세요.",
        }),
      );
    } else {
      setPasswordError("");
    }
  }, [password, passwordChk]);

  return (
    <>
      <form onSubmit={handleRegisterSubmit(onRegisterFormSubmit)} className={cn("flex flex-col gap-[1.6rem]")}>
        {/* 이름 */}
        <Input
          id="name"
          labelName={t("label.name", { defaultMessage: "이름" })}
          placeholder={t("placeholder.name", { defaultMessage: "이름을 입력해주세요." })}
          {...registerControl.register("name")}
          variant={registerErrors.name ? "error" : "default"}
          caption={
            registerErrors.name?.message &&
            t(`commonValidation.${registerErrors.name?.message}`, { defaultMessage: registerErrors.name?.message })
          }
          defaultValue={socialGoogle ? String(session?.user.name) : ""}
          disabled={socialGoogle || isPending}
        />
        <div>
          {/* 이메일 인증 */}
          <Input
            {...registerControl.register("email")}
            id="email"
            labelName={t("label.email", { defaultMessage: "이메일 주소" })}
            placeholder={t("placeholder.email", { defaultMessage: "이메일 주소를 입력해주세요." })}
            variant={registerErrors.email ? "error" : "default"}
            caption={
              registerErrors.email?.message &&
              t(`commonValidation.${registerErrors.email?.message}`, { defaultMessage: registerErrors.email?.message })
            }
            readOnly={emailCodeChkComplete}
            defaultValue={socialGoogle ? String(session?.user.email) : ""}
            disabled={socialGoogle || isPending}
            suffix={
              <Button
                type="button"
                variant="textButton"
                size="sm"
                bgColor={!registerErrors.email && watchRegister("email") ? "bg-navy-900" : "bg-grayscale-200"}
                className={cn(
                  `w-[12rem] ${!registerErrors.email && watchRegister("email") ? "text-white" : "text-gray-300"}`,
                  isEmailShow ? "" : "hidden",
                  socialGoogle ? "hidden" : "",
                )}
                disabled={!watchRegister("email")}
                onClick={emailVerificationHandler}
              >
                {isEmailCertificationShow
                  ? t("register.resendEmail", { defaultMessage: "이메일 재요청" })
                  : t("register.requestEmail", { defaultMessage: "이메일 요청" })}
              </Button>
            }
          />
          {/* 이메일 인증 코드 */}
          {isEmailCertificationShow && (
            <div className="relative">
              <Input
                id="emailCertification"
                placeholder={t("placeholder.emailVerificationCode", { defaultMessage: "이메일 인증 코드 6자리 입력" })}
                disabled={isPending}
                {...registerControl.register("emailCertification")}
                inputGroupClass="mt-[.8rem]"
                readOnly={emailCodeChkComplete}
                variant={
                  timeExpired
                    ? "error"
                    : registerErrors.emailCertification
                      ? "error"
                      : emailCodeChkComplete
                        ? "success"
                        : "default"
                }
                caption={
                  timeExpired
                    ? t("register.verificationExpired", {
                        defaultMessage: "인증 시간이 만료되었습니다. 이메일 요청을 다시 시도해주세요.",
                      })
                    : emailCodeChkComplete
                      ? `* ${t("register.emailVerified", { defaultMessage: "이메일 인증이 완료되었습니다." })}`
                      : registerErrors.emailCertification
                        ? registerErrors.emailCertification?.message &&
                          t(`commonValidation.${registerErrors.emailCertification?.message}`, {
                            defaultMessage: registerErrors.emailCertification?.message,
                          })
                        : ""
                }
                suffix={
                  <Button
                    type="button"
                    variant="textButton"
                    size="sm"
                    bgColor={
                      !registerErrors.emailCertification && watchRegister("emailCertification")
                        ? "bg-navy-900"
                        : "bg-grayscale-200"
                    }
                    className={cn(
                      `w-[8rem] ${!registerErrors.emailCertification && watchRegister("emailCertification") ? "text-white" : "text-gray-300"}`,
                      emailCodeChkComplete ? "hidden" : "",
                    )}
                    disabled={!watchRegister("emailCertification")}
                    onClick={emailCodeCheckHandler}
                  >
                    {t("register.verifyCode", { defaultMessage: "코드 인증" })}
                  </Button>
                }
              />
              {isRunning && <Timer initialTime={timeCount} onTimeUp={handleTimeUp} isRunning={isRunning} />}
            </div>
          )}
        </div>
        {/* 비밀번호 & 비밀번호 확인 */}
        {isSocialLogin === "regular" && (
          <>
            <Input
              type="password"
              id="password"
              labelName={t("label.password", { defaultMessage: "비밀번호 입력" })}
              placeholder={t("placeholder.password", { defaultMessage: "비밀번호를 입력해주세요." })}
              {...registerControl.register("password")}
              disabled={isPending}
              caption={`* ${t("commonValidation.passwordRequirements", { defaultMessage: "8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합" })}`}
              variant={registerErrors.password ? "error" : "default"}
            />
            <Input
              type="password"
              labelName={t("label.confirmPassword", { defaultMessage: "비밀번호 확인" })}
              id="passwordChk"
              placeholder={t("placeholder.confirmPassword", { defaultMessage: "비밀번호를 다시 한번 입력해주세요." })}
              {...registerControl.register("passwordChk")}
              variant={registerErrors.passwordChk || passwordError ? "error" : "default"}
              caption={
                (registerErrors.passwordChk?.message &&
                  t(`commonValidation.${registerErrors.passwordChk?.message}`, {
                    defaultMessage: registerErrors.passwordChk?.message,
                  })) ||
                passwordError
              }
            />
          </>
        )}
        {/* 휴대폰번호 */}
        <Input
          id="phone"
          labelName={t("label.phone", { defaultMessage: "휴대폰번호" })}
          placeholder={t("placeholder.phone", { defaultMessage: "-를 제외한 휴대폰번호를 입력해주세요." })}
          disabled={isPending}
          {...registerControl.register("phone")}
          variant={registerErrors.phone ? "error" : "default"}
          caption={
            registerErrors.phone?.message &&
            t(`commonValidation.${registerErrors.phone?.message}`, { defaultMessage: registerErrors.phone?.message })
          }
        />
        {/* 생년월일 */}
        <Input
          id="birth"
          labelName={t("label.birthDate", { defaultMessage: "생년월일" })}
          placeholder={t("placeholder.birthDate", { defaultMessage: "생년월일 6자리를 입력해주세요.(예시 : 991231)" })}
          {...registerControl.register("birth")}
          disabled={isPending}
          variant={registerErrors.birth ? "error" : "default"}
          caption={
            registerErrors.birth?.message &&
            t(`commonValidation.${registerErrors.birth?.message}`, { defaultMessage: registerErrors.birth?.message })
          }
        />
        {/* 페이지 이동 버튼 */}
        <Button
          type="submit"
          size="lg"
          bgColor={isRegisterValid && emailCodeChkComplete ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(
            `relative mt-[4rem] ${isRegisterValid && emailCodeChkComplete ? "text-white" : "text-gray-300"}`,
          )}
          disabled={(!isRegisterValid && !socialGoogle && !emailCodeChkComplete) || isPending}
        >
          {isPending ? <CommonLoadingBtn /> : t("commonBtn.next", { defaultMessage: "다음" })}
        </Button>
      </form>
      {/* 이메일 인증 안내 팝업 */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} panelStyle="w-[38.6rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]">
          <dl className="flex_col_center mb-[3.2rem]">
            <dt className="body_2 my-[.8rem] font-bold text-navy-900">
              {t("register.codeSent", { defaultMessage: "인증 코드를 전송했습니다." })}
            </dt>
            <dd className="text-center">
              {t("register.codeSentToEmail", { defaultMessage: "작성한 이메일주소로 인증 코드를 전송했습니다." })}
              <br />
              {t("register.checkEmailToContinue", { defaultMessage: "메일 확인 후 회원가입을 계속 진행해주세요." })}
            </dd>
          </dl>
          <Button type="button" variant="textButton" size="md" className="text-grayscale-0" onClick={closeModal}>
            {t("commonBtn.confirm", { defaultMessage: "확인" })}
          </Button>
        </Modal>
      )}
    </>
  );
}
