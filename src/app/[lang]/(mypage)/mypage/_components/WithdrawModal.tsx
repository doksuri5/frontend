"use client";

import { Modal, Button, Dropdown, Input } from "@/components/common";
import useUserStore from "@/stores/useUserStore";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { passwordCert } from "../_api/privacyApi";

const withdrawReasons = [
  { value: "inconvenient_service", text: "이용이 불편하고 장애가 많아서" },
  { value: "better_service", text: "다른 서비스가 더 좋아서" },
  { value: "low_usage_frequency", text: "사용 빈도가 낮아서" },
  { value: "content_dissatisfaction", text: "콘텐츠 불만" },
  { value: "other", text: "기타" },
];

type TWithdrawModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// TODO: 백엔드와 연결 시 삭제할 것
const email = "abcde@test.com";

export default function WithdrawModal({ isOpen, onClose }: TWithdrawModalProps) {
  const { userStoreData } = useUserStore();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [selectedReason, setSelectedReason] = useState(withdrawReasons[0]);
  const [otherReason, setOtherReason] = useState("");

  // 일반 로그인 회원의 경우 비밀번호 인증을 거쳐야 함
  const handleVerifyCode = async () => {
    if (!userStoreData?.email || !password) return;
    const response = await passwordCert(userStoreData.email, password);
    if (response.ok) {
    } else {
      alert(response.message);
      return;
    }
  };

  const handleWithdraw = async () => {
    if (userStoreData?.login_type === "local") {
      handleVerifyCode();
    }

    try {
      const formData = {
        // email, // 테스트 유저 이메일
        email: userStoreData?.email, // 실제 유저 이메일
        reason: selectedReason.text,
        reason_other: otherReason === "" ? null : otherReason,
      };
      const response = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/withdraw`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      ).json();

      if (response.ok) {
        router.push("/withdraw");
      }
    } catch (err) {
      alert("회원탈퇴 실패: " + err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="회원탈퇴"
      isBackdropClosable={true}
      panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem] items-center justify-center"
    >
      <div className="flex w-full flex-col">
        <div className="mt-[4rem] flex flex-col justify-start gap-[1.6rem]">
          <Dropdown
            label="회원탈퇴 사유"
            placeholder="회원탈퇴 사유를 선택해주세요"
            selected={selectedReason}
            setSelected={setSelectedReason}
            options={withdrawReasons}
          />
          {selectedReason.value === "other" && (
            <div>
              <label className="body_4 font-medium text-navy-900">탈퇴 사유</label>
              <textarea
                className={cn(
                  `${userStoreData?.login_type === "local" ? "h-[10rem]" : "h-[15rem]"} w-full resize-none rounded-[0.8rem] border border-gray-300 p-[1.6rem] text-navy-900 focus:outline-blue-500`,
                )}
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="기타 사유를 입력해주세요"
              />
            </div>
          )}
          {userStoreData?.login_type === "local" && (
            <Input
              labelName="비밀번호 입력"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputGroupClass="w-full h-[5.6rem]"
              inputClass="p-[1.6rem] rounded-[0.8rem]"
              placeholder="비밀번호를 입력해주세요"
              labelClass="body_4 font-medium text-navy-900"
            />
          )}
        </div>
        <Button
          size="lg"
          bgColor={password ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[6.4rem] ${password ? "text-grayscale-0" : "text-gray-300"}`)}
          onClick={handleWithdraw}
          disabled={userStoreData?.login_type !== "local" && !password}
        >
          회원탈퇴
        </Button>
      </div>
    </Modal>
  );
}
