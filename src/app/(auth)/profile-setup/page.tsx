import CommonLayout from "@/components/auth/CommonLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function ProfileSetup() {
  return (
    <>
      <CommonLayout title="프로필 설정">
        <RegisterForm />
      </CommonLayout>
    </>
  );
}
