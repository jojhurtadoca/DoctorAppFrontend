import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Specialty } from '../../interfaces/specialty';
import { SpecialtyService } from '../../services/specialty.service';
import { SharedService } from '../../../shared/shared.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-specialty-modal',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './specialty-modal.component.html',
  styleUrl: './specialty-modal.component.css'
})
export class SpecialtyModalComponent implements OnInit {

  specialtyForm: FormGroup;
  title = signal("Add");
  buttonName = signal("Save");

  constructor(
    private readonly modal: MatDialogRef<SpecialtyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public specialtyData: Specialty,
    private fb: FormBuilder,
    private specialtyService: SpecialtyService,
    private sharedService: SharedService,
  ) {
    this.specialtyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
    });

    if (this.specialtyData) {
      this.title.set("Edit");
      this.buttonName.set("Update");
    }
  }
  
  ngOnInit(): void {
    if (this.specialtyData) {
      this.specialtyForm.patchValue({
        name: this.specialtyData.name,
        description: this.specialtyData.description,
        status: this.specialtyData.status
      });
    }
  }

  createEditSpecialty() {
    const specialty : Specialty = {
      id: this.specialtyData ? this.specialtyData.id : 0,
      name: this.specialtyForm.value.name,
      description: this.specialtyForm.value.description,
      status: parseInt(this.specialtyForm.value.status),
    };

    if(!this.specialtyData) {
      // Create new specialtype
      this.specialtyService.create(specialty).subscribe({
        next: data => {
          if (data.isSuccess) {
            this.sharedService.showAlert('Specialty created', 'Success');
            this.modal.close("true");
          } else {
            this.sharedService.showAlert('Specialty was not created', 'Error');
          }
        },
        error: e => this.sharedService.showAlert((e.error.errors || e.error.errorMessage) || 'Internal server error', 'Error')
      })
    } else {
      this.specialtyService.update(specialty).subscribe({
        next: data => {
          if (data.isSuccess) {
            this.sharedService.showAlert('Specialty updated', 'Success');
            this.modal.close("true");
          } else {
            this.sharedService.showAlert('Specialty was not updated', 'Error');
          }
        },
        error: e => this.sharedService.showAlert((e.error.errors || e.error.errorMessage) || 'Internal server error', 'Error')
      })
    }
  }

}
