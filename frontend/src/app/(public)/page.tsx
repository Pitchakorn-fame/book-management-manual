"use client";

import BookList from "@/component/BookList";
// import BookCard from "@/component/BookCard";
import { useRouter } from "next/navigation";
import Sidebar from "@/component/Sidebar";

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export interface IBook {
  isbn: string;
  category: string;
  title: string;
  author: string;
  qty: number;
  status: Status;
}

const Page = () => {
  const router = useRouter();
  const onChangePage = () => {
    router.push("/testpage");
  };

  const mockupBookData: IBook[] = Array.from({ length: 5 }, (_, i) => {
    return {
      isbn: `${i + 1}`.repeat(13),
      category: `category ${i + 1}`,
      title: `title ${i + 1}`,
      author: `author ${i + 1}`,
      qty: i + 1,
      status: Status.ACTIVE,
    };
  });
  console.info("mockupBookData", mockupBookData);
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <Sidebar />
      <div className="flex flex-col gap-8 p-6 overflow-hidden">
        <div className="text-3xl font-bold">Book Management System</div>
        <div className="bg-amber-600 cursor-pointer" onClick={onChangePage}>
          Page
        </div>
        <BookList booksList={mockupBookData} />
        {/* <BookCard /> */}
      </div>
    </div>
  );
};

export default Page;
