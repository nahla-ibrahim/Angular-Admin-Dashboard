import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../shared/components/table/table';
import { UsersServices } from '../../core/services/users-services';
import { user } from '../../core/interface/users';
import { Users as UsersType } from '../../core/interface/users';
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
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { AlertModal } from '../../shared/components/alert-modal/alert-modal';

@Component({
  selector: 'app-users',
  imports: [Table, FormsModule, Modal, ReactiveFormsModule, NgClass, FaIconComponent, AlertModal],
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
  isUpdateModalOpen = signal<boolean>(false);
  roles = ['admin', 'user', 'moderator'];
  Trash = faTrash;
  pen = faPen;
  thisUserId!: number;
  delete = signal<boolean>(false);
  deleteAlert = signal<boolean>(false);
  noUpdate = signal<boolean>(false);
  update = signal<boolean>(false);

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

  ///////////form ///////////////
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(14),
      Validators.max(60),
      Validators.pattern(/^[0-9]+$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9+\-\s]+$/),
      // Validators.minLength(11),
      // Validators.pattern(/^01[0,1,2,5][0-9]{8}$/),
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
    this.resetForm();
    this.isModalOpen.set(true);
  }

  submit() {
    if (!this.userForm.valid) {
      alert('Please fill all the required fields correctly');
      return;
    }
    this.isModalOpen.set(false);

    alert('User Added Succesfully');

    this.resetForm();
  }

  edit(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (res: user) => {
        this.thisUserId = res.id;
        this.userForm.setValue({
          firstName: res.firstName,
          age: res.age,
          email: res.email,
          phoneNumber: res.phone,
          role: res.role,
        });
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
    this.isUpdateModalOpen.set(true);
    this.userService
      .updateUser(id, {
        firstName: this.firstName.value,
        age: this.age.value,
        email: this.email.value,
        phone: this.phoneNumber.value,
        role: this.role.value,
      })
      .subscribe({
        next: () => {},

        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  submitForUpdate() {
    if (!this.userForm.valid) return;
    if (
      this.firstName.pristine &&
      this.age.pristine &&
      this.email.pristine &&
      this.phoneNumber.pristine &&
      this.role.pristine
    ) {
      this.noUpdate.set(true);
    } else {
      this.isUpdateModalOpen.set(false);
      this.update.set(true);
      this.resetForm();
    }
  }
  resetForm() {
    this.userForm.setValue({
      firstName: '',
      age: '',
      email: '',
      phoneNumber: '',
      role: '',
    });
    this.firstName.markAsPristine();
    this.age.markAsPristine();
    this.email.markAsPristine();
    this.phoneNumber.markAsPristine();
    this.role.markAsPristine();

    this.firstName.markAsUntouched();
    this.age.markAsUntouched();
    this.email.markAsUntouched();
    this.phoneNumber.markAsUntouched();
    this.role.markAsUntouched();
  }

  deleteUser(data: any) {
    this.delete.set(true);
    this.thisUserId = data.id;
  }
  confirmDelete(userId: number) {
    this.delete.set(false);
    this.deleteAlert.set(true);
    this.userService.deleteUser(this.thisUserId).subscribe({
      next: () => {
        console.log(userId);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
