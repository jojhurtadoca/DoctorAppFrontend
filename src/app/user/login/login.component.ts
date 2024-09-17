import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SharedService } from '../../shared/shared.service';
import { Login } from '../interfaces/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
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
        this.sharedService.saveSession(res);
        this.router.navigate(['layout']);
      },
      complete: () => this.loading = false,
      error: (error) => this.sharedService.showAlert(error.error, 'Error'),
    })
  }
}
