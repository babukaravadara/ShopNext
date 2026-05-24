import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  hidePassword = true;
  hideConfirmPassword = true
  isLoading = false;
  constructor(private fb: FormBuilder, private _user: UserService, private notification: NotificationService) {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
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
      confirmPassword: [
        '',
        Validators.required
      ]
    });
  }
  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const password =
      this.registerForm.value.password;
    const confirmPassword =
      this.registerForm.value.confirmPassword;
    if (password !== confirmPassword) {
      this.notification.error("Passwords do not match");
      return;
    }
    this.isLoading = true;
    this._user.addUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.notification.success(res.message);
        this.isLoading = false;

      },
      error: (err) => {
        this.notification.error("Something went wrong");
        this.isLoading = false;
      },
      complete: () => {
        console.log("API completed");
        this.isLoading = false;
      }

    });
    
    this.submitted = false;
  }

}
