import { Injectable } from '@angular/core';
import { Book } from '../models/book/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  private books: Book[] = [
    {
      id: 0.494339092884738,
      publicationDate: '1957-10-10T22:00:00.000Z',
      title: 'Atlas Shrugged',
      author: 'Jasos Bib',
      imageName: 'imagefile.png',
      imageUrl:
      description: `is a 1957 novel by Ayn Rand. It is her longest novel, the fourth and final one published during her lifetime, and the one she considered her magnum opus in the realm of fiction writing.[1] She described the theme of Atlas Shrugged as "the role of man's mind in existence" and it includes elements of science fiction, mystery and romance. The book explores a number of philosophical themes from which Rand would subsequently develop Objectivism, including reason, property rights, individualism, libertarianism and capitalism, and depicts what Rand saw as the failures of governmental coercion. Of Rand's works of fiction, it contains her most extensive statement of her philosophical system.`,
    },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  createBook(book: Omit<Book, 'id'>): void {
    const { publicationDate, ...rest } = book;
    this.books.push({
      id: Math.random(),
      publicationDate: new Date(publicationDate).toISOString(),
      ...rest,
    });
  }

  editBook(newBook: Omit<Book, 'id'>, id: number): void {
    this.books[this.books.findIndex((book) => book.id === id)] = {
      ...newBook,
      id,
    };
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((book) => book.id !== id);
  }
}