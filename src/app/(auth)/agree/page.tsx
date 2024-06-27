import CommonLayout from "../_components/CommonLayout";
import RegisterForm from "../_components/RegisterForm";

export default function page() {
  return (
    <>
      <CommonLayout title="약관동의">
        <RegisterForm />
      </CommonLayout>
    </>
  );
}
