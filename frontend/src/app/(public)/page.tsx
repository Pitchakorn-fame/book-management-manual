"use client";

import Acomponent from "@/component/Acomponent";
import Bcomponent from "@/component/Bcomponent";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const onChangePage = () => {
    router.push("/testpage");
  };
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="bg-amber-600 cursor-pointer" onClick={onChangePage}>
        Page
      </div>
      <Acomponent />
      <Bcomponent />
    </div>
  );
};

export default Page;
