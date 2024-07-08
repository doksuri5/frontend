"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Input, Button, Modal } from "@/components/common";
import Timer from "./Timer";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { useRegisterStore } from "@/providers/RegisterProvider";

import { cn } from "@/utils/cn";

import { TRegisterSchemaType, registerSchema } from "@/types/AuthType";

import { PROFILE_SETUP_PATH } from "@/routes/path";

export default function RegisterForm() {
  const { setForm } = useRegisterStore((state) => ({
    setForm: state.setForm,
  }));

  const router = useRouter();
  const { data: session } = useSession();

  const [isEmailShow, setIsEmailShow] = useState(true);
  const [isEmailCertificationShow, setIsEmailCertificationShow] = useState(false);
  const [emailCodeChkComplete, setEmailCodeChkComplete] = useState(false);
  const [timeCount, setTimeCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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
  } = useZodSchemaForm<TRegisterSchemaType>(validationSchema);

  // 이메일 인증 버튼 클릭시 실행되는 이벤트
  const emailVerificationHandler = async () => {
    const valid = await triggerRegister("email");
    const emailValue = watchRegister("email");
    setTimeCount(0); // 타이머 초기화
    setIsRunning(false); // 타이머 시작 초기화

    if (valid) {
      try {
        const response = await (
          await fetch(`http://localhost:8080/api/auth/sendEmail`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: emailValue,
            }),
          })
        ).json();
        console.log(response);
        if (response.ok) {
          setIsOpen(true); // 팝업 노출
          setTimeCount(180); // 타이머 시간
          setIsRunning(true); // 타이머 시작
          setIsEmailCertificationShow(true); // 이메일 인증 코드 필드 보여줌
        } else {
          setError("email", { type: "manual", message: response.message });
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
          await fetch(`http://localhost:8080/api/auth/verifyCode`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: emailValue,
              code: emailCertificationValue,
            }),
          })
        ).json();
        console.log(response);
        setEmailCodeChkComplete(response.ok); // 이매일 인증 코드 확인 결과
        if (response.ok) {
          setIsRunning(false); // 타이머 멈춤
          setIsEmailShow(false); // 이메일 인증 버튼 숨김
        } else {
          setError("emailCertification", { type: "manual", message: response.message });
        }
      } catch (e) {
        console.log(`Fetch Error:${e}`);
      }
    }
  };

  const onSubmit = (data: TRegisterSchemaType) => {
    if (isRegisterValid && emailCodeChkComplete) {
      const form = {
        name: data.name ?? "",
        email: data.email ?? "",
        password: data.password ?? "",
        birth: data.birth,
        phone: data.phone,
      };
      setForm({ form });
      router.push(PROFILE_SETUP_PATH);
    }
  };

  const handleTimeUp = () => {
    setIsEmailShow(true);
    setIsRunning(false);
  };

  useEffect(() => {
    if (socialGoogle) {
      setIsEmailCertificationShow(false);
      setEmailCodeChkComplete(true);
      setIsEmailShow(true);
    }
  }, [socialGoogle]);

  return (
    <>
      <form onSubmit={handleRegisterSubmit(onSubmit)} className={cn("flex flex-col gap-[1.6rem]")}>
        {/* 이름 */}
        <Input
          id="name"
          labelName="이름"
          placeholder="이름을 입력해주세요."
          {...registerControl.register("name")}
          defaultValue={socialGoogle ? String(session?.user.name) : ""}
          disabled={socialGoogle}
        />
        <div>
          {/* 이메일 인증 */}
          <Input
            id="email"
            labelName="이메일 주소"
            placeholder="이메일 주소를 입력해주세요."
            variant={registerErrors.email ? "error" : "default"}
            caption={registerErrors.email?.message}
            {...registerControl.register("email")}
            defaultValue={socialGoogle ? String(session?.user.email) : ""}
            disabled={socialGoogle}
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
                {isEmailCertificationShow ? "이메일 재요청" : "이메일 요청"}
              </Button>
            }
          />
          {/* 이메일 인증 코드 */}
          {isEmailCertificationShow && (
            <div className="relative">
              <Input
                id="emailCertification"
                placeholder="이메일 인증 코드 6자리 입력"
                {...registerControl.register("emailCertification")}
                inputGroupClass="mt-[.8rem]"
                variant={
                  registerErrors.emailCertification
                    ? "error"
                    : "default" || emailCodeChkComplete
                      ? "success"
                      : "default"
                }
                caption={
                  emailCodeChkComplete ? "* 이메일 인증이 완료되었습니다." : registerErrors.emailCertification?.message
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
                    코드 인증
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
              labelName="비밀번호 입력"
              placeholder="비밀번호를 입력해주세요."
              caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
              {...registerControl.register("password")}
              variant={registerErrors.password ? "error" : "default"}
            />
            <Input
              type="password"
              id="passwordChk"
              labelName="비밀번호 확인"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              {...registerControl.register("passwordChk")}
              variant={registerErrors.passwordChk ? "error" : "default"}
              caption={registerErrors.passwordChk?.message}
            />
          </>
        )}
        {/* 휴대폰번호 */}
        <Input
          id="phone"
          labelName="휴대폰번호"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          {...registerControl.register("phone")}
          variant={registerErrors.phone ? "error" : "default"}
        />
        {/* 생년월일 */}
        <Input
          id="birth"
          labelName="생년월일"
          placeholder="생년월일 6자리를 입력해주세요.(예시 : 991231)"
          {...registerControl.register("birth")}
          variant={registerErrors.birth ? "error" : "default"}
          caption={registerErrors.birth?.message}
        />
        {/* 페이지 이동 버튼 */}
        <Button
          type="submit"
          size="lg"
          bgColor={isRegisterValid ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[4rem] ${isRegisterValid ? "text-white" : "text-gray-300"}`)}
          disabled={!isRegisterValid && !socialGoogle}
        >
          다음
        </Button>
      </form>
      {/* 이메일 인증 안내 팝업 */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} panelStyle="w-[38.6rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]">
          <dl className="flex_col_center mb-[3.2rem]">
            <dt className="body_2 my-[.8rem] font-bold text-navy-900">인증링크를 전송했습니다.</dt>
            <dd className="text-center">
              작성한 이메일주소로 인증 코드를 전송했습니다.
              <br />
              메일 확인 후 회원가입을 계속 진행해주세요.
            </dd>
          </dl>
          <Button type="button" variant="textButton" size="md" className="text-grayscale-0" onClick={closeModal}>
            확인
          </Button>
        </Modal>
      )}
    </>
  );
}
