import CommonLayout from "../../_components/CommonLayout";
import RegisterForm from "../../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <CommonLayout title="회원가입">
        <RegisterForm />
      </CommonLayout>
    </>
  );
}
