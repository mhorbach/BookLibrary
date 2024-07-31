import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book/book.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    DatePipe,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  @Input() bookInfo!: Book;
  @Output() deleteBookEvent = new EventEmitter<number>();
  @Output() openDetailsEvent = new EventEmitter<Book>();

  constructor(private router: Router) {}

  editBook(): void {
    this.router.navigate(['/book-manage', this.bookInfo.id]);
  }

  deleteBook(): void {
    this.deleteBookEvent.emit(this.bookInfo.id);
  }

  opentDetials(): void {
    this.openDetailsEvent.emit(this.bookInfo);
  }
}
