import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import type { IBook, ICreateBook, TUpdateBook } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @HttpCode(201)
  createBook(@Body() newBook: ICreateBook): IBook {
    //update validation later
    if (!newBook) throw new BadRequestException('missing request body');

    const { isbn, category, title, author, qty } = newBook;

    if (!isbn || !category || !title || !author || (!qty && qty !== 0)) {
      throw new BadRequestException('missing require field');
    }

    // qty have to > 0
    if (qty <= 0)
      throw new BadRequestException('book qty must be greater than 0');

    if (Number(isbn) && isbn.length !== 13)
      throw new BadRequestException('isbn must be 13 digits');

    const book = this.bookService.createBook(newBook);
    return book;
  }

  @Get()
  getBooks(): IBook[] {
    return this.bookService.getBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: number) {
    const bookId = Number(id);
    if (isNaN(bookId)) {
      throw new BadRequestException('id must be a number');
    }
    const book = this.bookService.getBookId(String(bookId));
    if (!book) {
      throw new NotFoundException('No book found');
    }
    return book;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBook: TUpdateBook) {
    const bookId = Number(id);
    if (isNaN(bookId)) {
      throw new BadRequestException('id must be a number');
    }
    if (!updateBook) throw new BadRequestException('missing request body');

    const { category, title, author, qty } = updateBook;

    if (!category || !title || !author || (!qty && qty !== 0)) {
      throw new BadRequestException('missing require field');
    }

    // qty have to > 0
    if (qty <= 0)
      throw new BadRequestException('book qty must be greater than 0');

    return this.bookService.update(String(id), updateBook);
  }

  @Delete(':id')
  remove(@Param('id') id: string): IBook {
    const bookId = Number(id);
    if (isNaN(bookId)) {
      throw new BadRequestException('id must be a number');
    }
    const book = this.bookService.remove(String(id));
    return book;
  }
}
