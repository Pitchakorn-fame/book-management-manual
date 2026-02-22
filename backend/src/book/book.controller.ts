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
import { UpdateBookDto } from './dto/update-book.dto';
import type { IBook, ICreateBook } from './entities/book.entity';

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

    console.log(isbn);
    if (Number(isbn) && isbn.length !== 13)
      throw new BadRequestException('isbn must be 13 digits');

    // check isbn duplicate later

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
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    const bookId = Number(id);
    if (isNaN(bookId)) {
      throw new BadRequestException('id must be a number');
    }

    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
