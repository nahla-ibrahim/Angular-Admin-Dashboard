import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../shared/components/table/table';
import { UsersServices } from '../../core/services/users-services';
import { user } from '../../core/interface/users';
import { Users as UsersType } from '../../core/interface/users';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { AlertModal } from '../../shared/components/alert-modal/alert-modal';
import { Form } from './components/form/form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  imports: [Table, FormsModule, ReactiveFormsModule, FaIconComponent, AlertModal, Form],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  userService = inject(UsersServices);
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getAllUser();
  }

  page = 1;
  limit = 10;
  total = 0;
  toastr = inject(ToastrService);
  data = signal<user[]>([]);
  searchInput: string = '';
  isModalOpen = signal<boolean>(false);
  isUpdateModalOpen = signal<boolean>(false);
  delete = signal<boolean>(false);
  deleteAlert = signal<boolean>(false);
  noUpdate = signal<boolean>(false);
  update = signal<boolean>(false);
  thisUser = signal<user | null>(null);
  thisUserId!: number;
  Trash = faTrash;
  pen = faPen;

  headers = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'firstName', label: 'first Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'actions', label: 'Actions' },
  ];

  getAllUser(sort: { col: string; dir: 'asc' | 'desc' } = { col: 'id', dir: 'asc' }) {
    const skip = (this.page - 1) * this.limit;
    this.userService.getAllUser(this.limit, skip, this.searchInput, sort.col, sort.dir).subscribe({
      next: (res: UsersType) => {
        this.data.set(res.users);
        this.total = res.total;
      },
      error: (err: Error) => {
        this.toastr.error('something wrong', 'failed');
      },
    });
  }

  ///////////pagination & search
  prevPage() {
    this.page--;
    this.getAllUser();
  }
  nextPage() {
    this.page++;
    this.getAllUser();
  }

  search() {
    this.page = 1;
    this.getAllUser();
  }

  add() {
    this.isModalOpen.set(true);
  }

  deleteUser(data: user) {
    this.delete.set(true);
    this.thisUserId = data.id!;
  }
  confirmDelete() {
    this.userService.deleteUser(this.thisUserId).subscribe({
      next: () => {
        this.toastr.success('User Deleted Successfully', 'Success');
        this.delete.set(false);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
