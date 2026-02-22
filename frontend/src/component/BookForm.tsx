"use client";
import React, { useState } from "react";
import TextInputField from "./form/TextInputField";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ADD_NEW_BOOK_DEFAULT_VALUES,
  AddNewBookForm,
  addNewBookFormSchema,
} from "@/schemas/add-new-book";
import { zodResolver } from "@hookform/resolvers/zod";

interface IBookFormProps {
  onCloseModal: () => void;
}

const BookForm = (prop: IBookFormProps) => {
  //   const { register, handleSubmit } = useForm({
  //     defaultValues: ADD_NEW_BOOK_DEFAULT_VALUES,
  //     resolver: zodResolver(addNewBookFormSchema),
  //   });
  const [test, setTest] = useState<string>("");
  const onSubmit: SubmitHandler<AddNewBookForm> = (value: AddNewBookForm) => {
    console.log("on submit");
    console.log("on submit ", value);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 z-50 bg-white rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] border border-[#FF7F50]"
    >
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Add Book</div>
        <div className="font-bold cursor-pointer" onClick={prop.onCloseModal}>
          X
        </div>
      </div>
      <TextInputField
        id="isbn"
        label="ISBN"
        textValue={test}
        onChangeFunction={(value) => setTest(value)}
        placeholder="Enter ISBN e.g. 8503957483002"
        required
      />
      <TextInputField
        id="category"
        label="Category"
        textValue={test}
        onChangeFunction={(value) => setTest(value)}
        placeholder="Enter category e.g. Fiction"
        required
      />
      <button type="submit" className="text-3xl bg-amber-700 h-10">
        Save
      </button>
    </form>
  );
};

export default BookForm;
