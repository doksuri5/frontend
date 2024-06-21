import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import Image from "next/image";
import eyeShow_icon from "@/app/svg/eyeShow_icon.svg";
import refresh_icon from "@/app/svg/refresh_icon.svg";

export default function Home() {
  return (
    <>
      <h1 className="bg-background-100">Home Component</h1>
      <Input />
      <Button>
        <Image src={eyeShow_icon} alt="ddd" />
      </Button>
    </>
  );
}
