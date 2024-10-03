import { Component, Inject, signal } from '@angular/core';
import { Role } from '../../interfaces/role.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../../shared/shared.service';
import { Register } from '../../interfaces/register';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {
  formUser: FormGroup;
  title = signal('Add');
  buttonName = signal('Save');
  roleList= signal<Role[]>([]);

  constructor(
    private modal: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: Register,
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
  ) {
    this.formUser = this.fb.group({
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      role: ['', Validators.required],
    });

    if (this.userData) {
      this.title.set('Update');
      this.buttonName.set('Update');
    }
    this.userService.listRoles().subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.roleList.set(data.result);
        }
      },
      error: (e) => this.sharedService.showAlert((e.error.errors || e.error.errorMessage), 'Error')
    })
  }

  ngOnInit(): void {
    if (this.userData) {
      this.formUser.patchValue({
        lastname: this.userData.lastname,
        name: this.userData.name,
        username: this.userData.username,
        password: this.userData.password,
        email: this.userData.email,
        role: this.userData.role,
      })
    }
  }

  createUser() {
    const user: Register = {
      username: this.formUser.value.username,
      password: this.formUser.value.password,
      lastname: this.formUser.value.lastname,
      name: this.formUser.value.name,
      email: this.formUser.value.email,
      role: this.formUser.value.role,
    }

    this.userService.register(user).subscribe({
      next: (data) => {
        this.sharedService.showAlert('User has been created', 'Success');
        this.modal.close("true");
      },
      error: e => this.sharedService.showAlert((e.error.errors || e.error.errorMessage), 'Error')
    });
  }
}
