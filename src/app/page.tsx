"use client";

import { Input } from "@/components/common/Input";

export default function Home() {
  return (
    <>
      <h1 className="bg-background-100">Home Component</h1>
      <Input type="password" label="아이디" />
    </>
  );
}
