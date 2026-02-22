import { BadRequestException, Injectable } from '@nestjs/common';
import {
  IBook,
  ICreateBook,
  Status,
  TUpdateBook,
} from './entities/book.entity';

@Injectable()
export class BookService {
  private book: IBook[] = [];

  createBook(newBook: ICreateBook): IBook {
    const isIsbnDuplicate = this.book.find(
      (book) => book.isbn === newBook.isbn,
    );
    if (isIsbnDuplicate) {
      throw new BadRequestException('This ISBN already exist');
    }
    const initialCreateInfo = {
      id: String(this.book.length + 1),
      created_at: new Date(),
      updated_at: new Date(),
      status: Status.ACTIVE,
    };

    const adjustNewBookInfo = { ...newBook, ...initialCreateInfo };
    this.book.push(adjustNewBookInfo);
    return adjustNewBookInfo;
  }

  getBooks(): IBook[] {
    return this.book;
  }

  getBookId(id: string): IBook | null {
    const book = this.book.find((book) => book.id === id);
    return book ?? null;
  }

  update(id: string, updateBook: TUpdateBook): IBook {
    console.info(updateBook);
    const indexForUpdate = this.book.findIndex((book) => book.id === id);
    const oldBookInfo = this.book[indexForUpdate];

    const updateBookData: IBook[] = [...this.book];

    const updateBookInfo = {
      ...oldBookInfo,
      ...updateBook,
      updated_at: new Date(),
    };

    updateBookData[indexForUpdate] = updateBookInfo;

    return updateBookInfo;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
