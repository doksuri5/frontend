import Link from "next/link";

import { Button } from "@/components/common";

import CommonLayout from "@/components/auth/CommonLayout";
import FindIdForm from "@/components/auth/FindIdForm";

import Image from "next/image";
import FindPasswordForm from "@/components/auth/FindPasswordForm";

export default function FindPasswordPage() {
  return (
    <>
      <CommonLayout title="비밀번호 찾기">
        <FindPasswordForm />
      </CommonLayout>
    </>
  );
}
