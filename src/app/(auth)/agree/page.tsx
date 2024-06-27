import CommonLayout from "@/components/auth/CommonLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function page() {
  return (
    <>
      <CommonLayout title="약관동의">
        <RegisterForm />
      </CommonLayout>
    </>
  );
}
