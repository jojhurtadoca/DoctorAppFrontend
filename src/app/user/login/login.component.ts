import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SharedService } from '../../shared/shared.service';
import { Login } from '../interfaces/login.model';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hiddePassword = signal(true);
  loading = signal(false);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private cookieService: CookieService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  triggerPassword(event: Event) {
    event.preventDefault();
    this.hiddePassword.set(!this.hiddePassword());
  }

  login() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      const request: Login = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
  
      this.userService.login(request).subscribe({
        next: res => {
          debugger;
          this.sharedService.saveSession(res);
          this.cookieService.set(
            'Authorization',
            `Bearer ${res.token}`,
            undefined,
            '/',
            undefined,
            true,
            'Strict'
          );
          this.router.navigate(['layout']);
        },
        complete: () => this.loading.set(false),
        error: (error) => {
          this.sharedService.showAlert(error.error || "The system couldn't process this request, please try later", 'Error');
          this.loading.set(false);
        }
      })
    }
  }
}
