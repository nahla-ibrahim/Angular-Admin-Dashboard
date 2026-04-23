import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../../../shared/components/modal/modal';
import { CommonModule } from '@angular/common';
import { user } from '../../../../core/interface/users';
import { UsersServices } from '../../../../core/services/users-services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  imports: [Modal, ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  ngOnInit(): void {
    if (this.theUser()) {
      this.userForm.setValue({
        firstName: this.theUser()!.firstName,
        age: this.theUser()!.age,
        email: this.theUser()!.email,
        phoneNumber: this.theUser()!.phone,
        role: this.theUser()!.role,
      });
    }
  }
  title = input<string>();
  close = output<void>();
  theUser = input<user | null>(null);
  roles = ['admin', 'user', 'moderator'];
  usersService = inject(UsersServices);
  toastr = inject(ToastrService);

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

  submit() {
    if (!this.userForm.valid) {
      alert('Please fill all the required fields correctly');
      return;
    }
    this.close.emit();
    if (this.theUser()) {
      this.edit();
    } else {
      this.toastr.success('User Added Successfully', 'Success');
    }
  }

  edit() {
    this.usersService
      .updateUser(this.theUser()!.id, {
        firstName: this.firstName.value,
        age: this.age.value,
        email: this.email.value,
        phone: this.phoneNumber.value,
        role: this.role.value,
      })
      .subscribe({
        next: () => {
          this.toastr.success('User Updated Successfully', 'Success');
        },
        error: (err: Error) => {
          console.log(err);
          alert('Failed to update user. Please try again.');
        },
      });
  }
}
