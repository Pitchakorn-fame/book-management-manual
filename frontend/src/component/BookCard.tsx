import { IBook } from "@/app/(public)/page";
import { Icon } from "@iconify/react";
import React from "react";
interface IBookCardProps {
  bookCardInfo: IBook | null;
  onCloseModal: () => void;
}
const BookCard = (props: IBookCardProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 z-50 bg-white rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 border border-[#FF7F50]">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Book infomation</div>
        <div className="font-bold cursor-pointer" onClick={props.onCloseModal}>
          <Icon icon="mingcute:close-fill" className="text-2xl" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 w-full">
        <div className="flex flex-col gap-2">
          <div className="font-bold">ISBN</div>
          <div className="overflow-hidden">{props.bookCardInfo?.isbn}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">Category</div>
          <div className="overflow-hidden">{props.bookCardInfo?.category}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">Book title</div>
          <div className="overflow-hidden">{props.bookCardInfo?.title}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">Author</div>
          <div className="overflow-hidden">{props.bookCardInfo?.author}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">Book quantity</div>
          <div className="overflow-hidden">{props.bookCardInfo?.qty}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">Book status</div>
          <div className="overflow-hidden">{props.bookCardInfo?.status}</div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
