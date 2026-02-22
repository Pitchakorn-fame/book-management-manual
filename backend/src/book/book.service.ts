import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBook, ICreateBook, Status } from './entities/book.entity';

@Injectable()
export class BookService {
  private book: IBook[] = [];

  createBook(newBook: ICreateBook): IBook {
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

  update(id: number, updateBookDto: UpdateBookDto) {
    console.info(updateBookDto);
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
