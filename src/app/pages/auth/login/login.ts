import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthServices } from '../../../core/services/auth-services';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { single } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, FaIconComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  fb = inject(FormBuilder);
  router = inject(Router);
  authServices = inject(AuthServices);
  errorMessage = signal<string>('');
  userValue = 'emilys';
  passValue = 'emilyspass';
  faEye = faEye;

  loginForm = this.fb.group({
    userName: [this.userValue, [Validators.required, Validators.minLength(3)]],
    password: [this.passValue, [Validators.required, Validators.minLength(6)]],
  });
  get userName() {
    return this.loginForm.get('userName') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    else {
      this.authServices.login(this.userName.value, this.password.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err: Error) => {
          this.errorMessage.set(err.message);
        },
      });
    }
  }

  shawPassword = signal<boolean>(false);
  changePasswordType() {
    this.shawPassword.set(!this.shawPassword());
    const passwordInput = document.querySelector(
      'input[formControlName="password"]',
    ) as HTMLInputElement;
    if (this.shawPassword()) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}
