import CommonLayout from "../_components/CommonLayout";
import RegisterForm from "../_components/RegisterForm";

export default function ProfileSetup() {
  return (
    <>
      <CommonLayout title="프로필 설정">
        <RegisterForm />
      </CommonLayout>
    </>
  );
}
