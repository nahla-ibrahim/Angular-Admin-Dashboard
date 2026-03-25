import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../shared/components/table/table';
import { UsersServices } from '../../core-2/services/users-services';
import { user } from '../../core-2/interface/users';
import { Users as UsersType } from '../../core-2/interface/users';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Modal } from '../../shared/components/modal/modal';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [Table, FormsModule, Modal, ReactiveFormsModule, NgClass],
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
  data = signal<user[]>([]);
  loading = signal<boolean>(true);
  error: string | null = null;
  searchInput: string = '';
  isModalOpen = signal<boolean>(false);
  roles = ['admin', 'user', 'administrator'];

  getAllUser() {
    this.loading.set(true);
    this.error = null;
    const skip = (this.page - 1) * this.limit;
    this.userService.getAllUser(this.limit, skip, this.searchInput).subscribe({
      next: (res: UsersType) => {
        this.data.set(res.users);
        this.loading.set(false);
        this.total = res.total;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loading.set(false);
      },
    });
  }

  deleteUser(data: any) {
    const confirmDelete = confirm('Are you sure?');
    if (!confirmDelete) return;

    this.userService.deleteUser(data.id).subscribe({
      next: () => {
        this.getAllUser();
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

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
  ///////////form ///////////////
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      (Validators.required, Validators.min(14), Validators.max(60), Validators.pattern(/^[0-9]+$/)),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.pattern(/^01[0,1,2,5][0-9]{8}$/),
    ]),
    role: new FormControl('', [Validators.required]),
  });
  get firstName() {
    return this.userForm.get('firstName') as FormControl;
  }
  get age() {
    return this.userForm.get('age') as FormControl;
  }
  get email() {
    return this.userForm.get('email') as FormControl;
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber') as FormControl;
  }
  get role() {
    return this.userForm.get('role') as FormControl;
  }

  add() {
    this.isModalOpen.set(true);
  }
  submit() {
    this.isModalOpen.set(false);
    alert('User Added Succesfully');
    this.userForm.setValue({
      firstName: '',
      age: '',
      email: '',
      phoneNumber: '',
      role: '',
    });
  }
}
