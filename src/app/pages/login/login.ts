import { Component, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 
  LoginForm: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder, 
    private _Auth: Auth, 
    private router: Router, 
    private notification: NotificationService
  ) {
    this.LoginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
    });
  }

  login() {
    if (this.LoginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this._Auth.login(this.LoginForm.value).subscribe({
        next: (res: any) => {
          this._Auth.isLoggedIn.set(true);
          this.isLoading = false;
          debugger
          this._Auth.setUser(res.role);
          this.router.navigate([
            '/products'
          ]);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          if (err.status === 401) {
            this.notification.error('Invalid Email or Password');
          }
          else {
            this.notification.error('Invalid Email or Password');;
          }
        }
      });
  }
}
