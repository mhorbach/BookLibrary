import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Book } from '../../models/book/book.model';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookManagementPanelComponent } from '../book-management-panel/book-management-panel.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';

@Component({
  selector: 'app-book-management-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    BookManagementPanelComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './book-management-dialog.component.html',
  styleUrl: './book-management-dialog.component.scss',
})
export class BookManagementDialogComponent implements OnInit {
  editingState: boolean = false;
  book!: Book;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { book: Book }) {}

  ngOnInit(): void {
    this.book = this.data.book;
  }

  saveBookChanges(book: Book): void {
    this.book = book;
    this.changeEditingState();
  }

  changeEditingState(): void {
    this.editingState = !this.editingState;
  }
}
