import { commonAuthMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return commonAuthMetadata("registerComplete");
}
export default function RegisterCompleteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
