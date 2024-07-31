import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookStorageService } from '../../services/book-storage.service';
import { Book } from '../../models/book/book.model';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface BookForm {
  title: FormControl<string>;
  author: FormControl<string>;
  imageUrl: FormControl<string | null>;
  imageName: FormControl<string | null>;
  description: FormControl<string>;
  publicationDate: FormControl<string>;
}

@Component({
  selector: 'app-book-management-panel',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './book-management-panel.component.html',
  styleUrl: './book-management-panel.component.scss',
})
export class BookManagementPanelComponent implements OnInit {
  bookEditorForm: FormGroup<BookForm> = new FormGroup<BookForm>({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    author: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    imageUrl: new FormControl(null),
    imageName: new FormControl(null),
    description: new FormControl('', {
      nonNullable: true,
    }),
    publicationDate: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  @Input() book?: Book;
  @Input() isDialog: boolean = false;
  @Output() saveEvent = new EventEmitter<Book>();
  @Output() cancelEvent = new EventEmitter<void>();

  fileError: string | null = null;
  imageUrl: string | null = null;

  constructor(
    private bookStorage: BookStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.book) {
      this.bookEditorForm.patchValue(this.book);
    }
  }

  submitBook(formDirective: FormGroupDirective): void {
    if (this.book) {
      this.bookStorage.editBook(
        this.bookEditorForm.getRawValue(),
        this.book.id
      );
    } else {
      this.bookStorage.createBook(
        this.bookEditorForm.value as Omit<Book, 'id'>
      );
    }

    if (this.isDialog) {
      this.saveEvent.emit({
        ...this.bookEditorForm.getRawValue(),
        id: this.book!.id,
      });
    } else {
      formDirective.resetForm();
      this.router.navigate(['/']);
    }
  }

  onCancel(): void {
    this.isDialog ? this.cancelEvent.emit() : this.router.navigate(['/']);
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
        this.fileError = 'Only PNG and JPG files are allowed.';
        this.bookEditorForm.patchValue({ imageUrl: null });
        return;
      } else {
        this.fileError = null;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target!.result as string;
        this.bookEditorForm.patchValue({
          imageUrl: this.imageUrl,
          imageName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imageUrl = null;
    this.bookEditorForm.patchValue({ imageUrl: null, imageName: null });
  }
}
