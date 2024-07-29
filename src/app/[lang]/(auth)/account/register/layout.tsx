import { commonAuthMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return commonAuthMetadata("register");
}

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
