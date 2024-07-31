import { Component, OnInit } from '@angular/core';
import { BookManagementPanelComponent } from '../../components/book-management-panel/book-management-panel.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { BookStorageService } from '../../services/book-storage.service';
import { Book } from '../../models/book/book.model';

@Component({
  selector: 'app-book-manage',
  standalone: true,
  imports: [BookManagementPanelComponent, MatCardModule],
  templateUrl: './book-manage.component.html',
  styleUrl: './book-manage.component.scss',
})
export class BookManageComponent implements OnInit {
  book?: Book;
  constructor(
    private route: ActivatedRoute,
    private bookStorage: BookStorageService
  ) {}

  ngOnInit(): void {
    this.book = this.bookStorage.getBookById(
      Number(this.route.snapshot.paramMap.get('id'))
    );
  }
}
