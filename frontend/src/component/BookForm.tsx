"use client";
import React, { useState } from "react";
import TextInputField from "./form/TextInputField";

interface IBookFormProps {
  onCloseModal: () => void;
}

const BookForm = (prop: IBookFormProps) => {
  const [test, setTest] = useState<string>("");
  return (
    <div className="flex flex-col gap-4 p-6 z-50 bg-white rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] border border-[#FF7F50]">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Add Book</div>
        <div className="font-bold cursor-pointer" onClick={prop.onCloseModal}>
          X
        </div>
      </div>
      <TextInputField
        label="ISBN"
        textValue={test}
        onChangeFunction={(value) => setTest(value)}
        placeholder="Enter ISBN e.g. 8503957483002"
        required
      />
      <TextInputField
        label="Category"
        textValue={test}
        onChangeFunction={(value) => setTest(value)}
        placeholder="Enter category e.g. Fiction"
        required
      />
    </div>
  );
};

export default BookForm;
