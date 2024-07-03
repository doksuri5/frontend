import CommonLayout from "../../_components/CommonLayout";
import ProfileSetUpForm from "../../_components/ProfileSetUpForm";

export default function ProfileSetup() {
  return (
    <>
      <CommonLayout title="프로필 설정">
        <ProfileSetUpForm />
      </CommonLayout>
    </>
  );
}
