"use client";

import { Modal, Button, Dropdown, Input } from "@/components/common";
import Link from "next/link";
import { useState } from "react";

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

export default function WithdrawModal({ isOpen, onClose }: TWithdrawModalProps) {
  const [selectedReason, setSelectedReason] = useState(withdrawReasons[0]);
  const [otherReason, setOtherReason] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="회원탈퇴"
      isBackdropClosable={true}
      panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem] items-center justify-center"
    >
      <div className="flex w-full flex-col gap-[5.6rem]">
        <div className="mb-[5.6rem] mt-[4rem] flex flex-col justify-start gap-[1.6rem]">
          <Dropdown
            label="회원탈퇴 사유"
            placeholder="회원탈퇴 사유를 선택해주세요"
            selected={selectedReason}
            setSelected={setSelectedReason}
            options={withdrawReasons}
          />
          {selectedReason.value === "other" && (
            <div>
              <label className="body_4 font-medium text-gray-900">탈퇴 사유</label>
              <textarea
                className="h-[10rem] w-full resize-none rounded-[0.8rem] border border-gray-300 p-[1.6rem] text-navy-900 focus:outline-blue-500"
                value={""}
                placeholder="기타 사유를 입력해주세요"
              />
            </div>
          )}
          <div>
            <Input
              labelName="비밀번호 입력"
              type="password"
              inputGroupClass="w-full h-[5.6rem]"
              inputClass="text-navy-900 h-[5.6rem] p-[1.6rem] rounded-[0.8rem]"
              placeholder="비밀번호를 입력해주세요"
              labelClass="body_4 font-medium text-gray-900"
            />
          </div>
        </div>
        <Link href="/withdraw">
          <Button size="lg" className="text-grayscale-0">
            회원탈퇴
          </Button>
        </Link>
      </div>
    </Modal>
  );
}
