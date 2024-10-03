import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Specialty } from '../../../specialty/interfaces/specialty';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Doctor } from '../../pages/interfaces/doctor.interface';
import { SpecialtyService } from '../../../specialty/services/specialty.service';
import { DoctorService } from '../../services/doctor.service';
import { SharedService } from '../../../shared/shared.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-doctor-modal',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './doctor-modal.component.html',
  styleUrl: './doctor-modal.component.css'
})
export class DoctorModalComponent implements OnInit {
  
  formDoctor: FormGroup;
  title = signal('Add');
  buttonName = signal('Save');
  specialtyList = signal<Specialty[]>([]);

  constructor(
    private modal: MatDialogRef<DoctorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public doctorData: Doctor,
    private fb: FormBuilder,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private sharedService: SharedService,
  ) {
    this.formDoctor = this.fb.group({
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: [''],
      gender: ['M', Validators.required],
      specialtyId: ['', Validators.required],
      status: ['1', Validators.required]
    });

    if (this.doctorData) {
      this.title.set('Update');
      this.buttonName.set('Update');
    }
    this.specialtyService.activeList().subscribe({
      next: (data) => {
        if (data.isSuccess) {
          console.log('result', data.result)
          this.specialtyList.set(data.result);
        }
      },
      error: (e) => {}
    })
  }

  ngOnInit(): void {
    if (this.doctorData) {
      this.formDoctor.patchValue({
        lastname: this.doctorData.lastname,
        name: this.doctorData.name,
        phone: this.doctorData.phone,
        gender: this.doctorData.gender,
        status: this.doctorData.status.toString(),
        specialtyId: this.doctorData.specialtyId,
        address: this.doctorData.address
      })
    }
  }

  createEditDoctor() {
    const doctor: Doctor = {
      id: this.doctorData ? this.doctorData.id : 0,
      lastname: this.formDoctor.value.lastname,
      name: this.formDoctor.value.name,
      address: this.formDoctor.value.address,
      phone: this.formDoctor.value.phone,
      gender: this.formDoctor.value.gender,
      specialtyId: parseInt(this.formDoctor.value.specialtyId),
      status: parseInt(this.formDoctor.value.status),
      specialtyName: ''
    }

    debugger;

    if (!this.doctorData) {
      this.doctorService.create(doctor).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.sharedService.showAlert('Doctor has been created', 'Success');
            this.modal.close('true');
          } else {
            this.sharedService.showAlert('The system could not create a doctor, please try later', 'Error');
          }
        },
        error: e => this.sharedService.showAlert((e.error.errors || e.error.errorMessage) || 'Internal server error', 'Error')
      })
    } else {
      this.doctorService.update(doctor).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.sharedService.showAlert('Doctor has been updated', 'Success');
            this.modal.close('true');
          } else {
            this.sharedService.showAlert('The system could not update a doctor, please try later', 'Error');
          }
        },
        error: e => this.sharedService.showAlert((e.error.errors || e.error.errorMessage) || 'Internal server error', 'Error'),
      })
    }


  }
}
