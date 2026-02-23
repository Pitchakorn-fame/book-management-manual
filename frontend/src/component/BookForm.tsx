import React, { useState } from "react";
import TextInputField from "./form/TextInputField";

import { Icon } from "@iconify/react";
import { IBook, Status } from "@/constant/book-management";

interface IBookFormProps {
  onCloseModal: () => void;
  onAddNewBook: (book: IBook) => void;
  updateBookInfo?: IBook | null;
  bookData: IBook[];
  onUpdateBook: (book: IBook) => void;
}

const BookForm = (props: IBookFormProps) => {
  const updateBookInfo = props.updateBookInfo;
  const [isbnValue, setIsbnValue] = useState<string>(
    updateBookInfo?.isbn ?? "",
  );
  const [isbnInvalidMessage, setIsbnInvalidMessage] = useState<string>("");

  const [categoryValue, setCategoryValue] = useState<string>(
    updateBookInfo?.category ?? "",
  );
  const [categoryInvalidMessage, setCategoryInvalidMessage] =
    useState<string>("");

  const [titleValue, setTitleValue] = useState<string>(
    updateBookInfo?.title ?? "",
  );
  const [titleInvalidMessage, setTitleInvalidMessage] = useState<string>("");

  const [authorValue, setAuthorValue] = useState<string>(
    updateBookInfo?.author ?? "",
  );
  const [authorInvalidMessage, setAuthorInvalidMessage] = useState<string>("");

  const [qtyValue, setQtyValue] = useState<string>(
    !!updateBookInfo ? String(updateBookInfo?.qty) : "",
  );
  const [qtyInvalidMessage, setQtyInvalidMessage] = useState<string>("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isbnValue.trim().length !== 13) {
      setIsbnInvalidMessage("ISBN must be 13 digits");
    } else {
      setIsbnInvalidMessage("");
    }

    if (!categoryValue.trim()) {
      setCategoryInvalidMessage("Please enter category");
    } else {
      setCategoryInvalidMessage("");
    }

    if (!titleValue.trim()) {
      setTitleInvalidMessage("Please enter book title");
    } else {
      setTitleInvalidMessage("");
    }
    if (!authorValue.trim()) {
      setAuthorInvalidMessage("Please enter autor");
    } else {
      setAuthorInvalidMessage("");
    }

    const bookQty = Number(qtyValue);
    if (isNaN(bookQty) || bookQty <= 0) {
      setQtyInvalidMessage(
        "Book quantity must be integer number and greater than 0",
      );
    } else {
      setQtyInvalidMessage("");
    }

    if (
      isbnValue.length !== 13 ||
      !categoryValue ||
      !titleValue ||
      !authorValue ||
      isNaN(bookQty) ||
      bookQty <= 0
    )
      return;

    const adjustNewBookData: IBook = {
      isbn: isbnValue,
      category: categoryValue,
      title: titleValue,
      author: authorValue,
      qty: bookQty,
      status: Status.ACTIVE,
    };

    const isIsbnDuplicate = props.bookData.find(
      (book) => book.isbn === isbnValue,
    );
    if (isIsbnDuplicate && !updateBookInfo) {
      return setIsbnInvalidMessage("Duplicate ISBN");
    }

    if (!updateBookInfo) {
      props.onAddNewBook(adjustNewBookData);
    } else {
      props.onUpdateBook(adjustNewBookData);
    }
    props.onCloseModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 z-50 bg-white rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 border border-[#FF7F50]"
    >
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          {!!updateBookInfo ? "Update book" : "Add Book"}
        </div>
        <div className="font-bold cursor-pointer" onClick={props.onCloseModal}>
          <Icon icon="mingcute:close-fill" className="text-2xl" />
        </div>
      </div>
      <TextInputField
        id="isbn"
        label="ISBN"
        textValue={isbnValue}
        onChangeFunction={(value) => setIsbnValue(value)}
        placeholder="Enter ISBN e.g. 8503957483002"
        maxLength={13}
        required
        errorMessage={isbnInvalidMessage}
        disable={!!updateBookInfo}
      />
      <TextInputField
        id="category"
        label="Category"
        textValue={categoryValue}
        onChangeFunction={(value) => setCategoryValue(value)}
        placeholder="Enter category e.g. Fiction"
        required
        errorMessage={categoryInvalidMessage}
      />
      <TextInputField
        id="title"
        label="Book title"
        textValue={titleValue}
        onChangeFunction={(value) => setTitleValue(value)}
        placeholder="Enter Book title e.g. The Hunger game"
        required
        errorMessage={titleInvalidMessage}
      />
      <TextInputField
        id="author"
        label="Author"
        textValue={authorValue}
        onChangeFunction={(value) => setAuthorValue(value)}
        placeholder="Enter Author e.g. Suzanne Collins"
        required
        errorMessage={authorInvalidMessage}
      />
      <TextInputField
        id="qty"
        label="Book quantity"
        textValue={qtyValue}
        onChangeFunction={(value) => setQtyValue(value)}
        placeholder="Book quantity must be at least 1"
        required
        errorMessage={qtyInvalidMessage}
      />
      <div className="flex gap-2 justify-end font-bold">
        <button
          onClick={props.onCloseModal}
          className="border border-[#FF7F50] p-2 rounded-2xl w-25 cursor-pointer h-fit"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#FF7F50] text-white p-2 rounded-2xl w-25 cursor-pointer h-fit"
        >
          {!!updateBookInfo ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
