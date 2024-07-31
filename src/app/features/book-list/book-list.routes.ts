import { Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'book-manage/:id',
    loadComponent: () =>
      import('./pages/book-manage/book-manage.component').then(
        (m) => m.BookManageComponent
      ),
  },
];

export default routes;
