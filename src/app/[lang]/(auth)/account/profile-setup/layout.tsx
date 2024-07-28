import { commonAuthMetadata } from "@/utils/metadata";
import { Metadata } from "next";

export async function generateMetadata() {
  return commonAuthMetadata("profileSetup");
}

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
