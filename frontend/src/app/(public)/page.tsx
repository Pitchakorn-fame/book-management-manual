"use client";

import BookList from "@/component/BookList";
// import BookCard from "@/component/BookCard";
import { useRouter } from "next/navigation";
import Sidebar from "@/component/Sidebar";
import SearchBar from "@/component/SearchBar";
import { useMemo, useState } from "react";
import BookCard from "@/component/BookCard";
import BookForm from "@/component/BookForm";

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

const Page = () => {
  const router = useRouter();
  const [bookData, setBookData] = useState<IBook[]>(mockupBookData);
  const [updateBookInfo, setUpdateBookInfo] = useState<IBook | null>(null);
  const onChangePage = () => {
    router.push("/testpage");
  };

  console.info("mockupBookData", mockupBookData);

  const [searchText, setSearchText] = useState<string>("");
  const [isOpenBookActionModal, setIsOpenBookActionModal] =
    useState<boolean>(false);

  const filterBookData = useMemo(() => {
    const searchTextLowerCase = searchText.toLowerCase();

    return bookData.filter(
      (book) =>
        book.isbn.includes(searchTextLowerCase) ||
        book.category.includes(searchTextLowerCase) ||
        book.author.includes(searchTextLowerCase) ||
        book.title.includes(searchTextLowerCase),
    );
  }, [searchText, bookData]);
  console.log("filterBookData", filterBookData);

  const handleAddNewBook = (book: IBook) => {
    setBookData((prevBooks) => [book, ...prevBooks]);
  };

  const updateBookData = (book: IBook) => {
    console.log("isbn", book);
    setUpdateBookInfo(book);
    setIsOpenBookActionModal(true);
  };

  const handleUpdateBook = (updateBook: IBook) => {
    const indexForUpdate = bookData.findIndex(
      (book) => book.isbn === updateBook.isbn,
    );
    const updateBookData = [...bookData];

    updateBookData[indexForUpdate] = updateBook;
    setBookData(updateBookData);
  };

  const handleCloseBookActionModal = () => {
    setUpdateBookInfo(null);
    setIsOpenBookActionModal(false);
  };

  return (
    <>
      <div
        className={`grid grid-cols-[auto_1fr] h-screen relative ${isOpenBookActionModal ? "opacity-65 pointer-events-none" : ""}`}
      >
        <Sidebar />
        <div className="flex flex-col gap-8 p-6 overflow-hidden">
          <div className="text-3xl font-bold">Book Management System</div>
          <div className="bg-amber-600 cursor-pointer" onClick={onChangePage}>
            Page
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-6 w-full h-fit">
            <SearchBar
              searchValue={searchText}
              onChangeFunction={(value) => {
                setSearchText(value);
              }}
            />
            <button
              className="flex justify-center items-center p-4 h-12 rounded-2xl border border-[#FF7F50] cursor-pointer hover:bg-[#FF7F50] hover:text-[#FFF] font-bold w-50"
              onClick={() => setIsOpenBookActionModal(true)}
            >
              Add book
            </button>
          </div>
          <BookList
            booksList={filterBookData}
            onUpdateBookInfo={updateBookData}
          />
          {/* <BookCard /> */}
        </div>
      </div>
      {isOpenBookActionModal && (
        <BookForm
          onCloseModal={handleCloseBookActionModal}
          onAddNewBook={handleAddNewBook}
          updateBookInfo={updateBookInfo}
          bookData={bookData}
          onUpdateBook={handleUpdateBook}
        />
      )}
    </>
  );
};

export default Page;
