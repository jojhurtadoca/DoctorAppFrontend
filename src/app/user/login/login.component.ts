import { Component } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hiddePassword = true;
  loading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private userService: UserService,
    private sharedService: SharedService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.loading = true;
    const request: Login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.userService.login(request).subscribe({
      next: res => {
        console.log('am here', res);
        this.sharedService.saveSession(res);
        this.router.navigate(['layout']);
      },
      complete: () => this.loading = false,
      error: (error) => {
        this.sharedService.showAlert(error.error || "The system couldn't process this request, please try later", 'Error');
        this.loading = false;
      }
    })
  }
}
