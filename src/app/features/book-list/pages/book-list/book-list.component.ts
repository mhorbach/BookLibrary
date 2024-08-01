import { Component, DestroyRef, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BookStorageService } from '../../services/book-storage.service';
import { Book } from '../../models/book/book.model';
import { BookComponent } from '../../components/book/book.component';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookManagementDialogComponent } from '../../components/book-management-dialog/book-management-dialog.component';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    BookComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  animations: [
    trigger('animatedBook', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, width: '0px' })),
      ]),
    ]),
  ],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchFormControl = new FormControl('');
  destroyRef = inject(DestroyRef);

  constructor(
    private bookStorage: BookStorageService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.filteredBooks = this.books;
    this.searchFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.searchBook(value));
  }

  deleteBook(id: number): void {
    this.bookStorage.deleteBook(id);
    this.getBooks();
    this.filteredBooks = this.filteredBooks.filter(book => book.id !== id);
  }

  getBooks(): void {
    this.books = this.bookStorage.getBooks();
  }

  openDetails(book: Book): void {
    this.dialog
      .open(BookManagementDialogComponent, {
        data: { book },
        height: 'fit-content',
        maxHeight: '90vh',
      })
      .afterClosed()
      .subscribe((result) => {
        result ? this.deleteBook(book.id) : null;
      });
  }

  createBook(): void {
    this.router.navigate(['/book-manage', 0]);
  }

  searchBook(search: string | null): void {
    if (!search) {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  cleanSearch(): void {
    this.searchFormControl.patchValue('');
  }
}
