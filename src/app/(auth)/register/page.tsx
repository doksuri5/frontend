import CommonLayout from "@/components/auth/CommonLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <CommonLayout title="회원가입">
        <form>
          <RegisterForm />
        </form>
      </CommonLayout>
    </>
  );
}
