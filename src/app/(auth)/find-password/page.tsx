import CommonLayout from "../_components/CommonLayout";
import FindPasswordForm from "../_components/FindPasswordForm";

export default function FindPasswordPage() {
  return (
    <>
      <CommonLayout title="비밀번호 찾기">
        <FindPasswordForm />
      </CommonLayout>
    </>
  );
}
