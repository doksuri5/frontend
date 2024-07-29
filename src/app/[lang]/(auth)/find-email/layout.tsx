import { commonAuthMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return commonAuthMetadata("findEmail");
}

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
