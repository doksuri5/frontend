import { RegisterStoreProvider } from "@/providers/RegisterProvider";
import { commonAuthMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return commonAuthMetadata("termsAgreement");
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RegisterStoreProvider>{children}</RegisterStoreProvider>
    </>
  );
}
