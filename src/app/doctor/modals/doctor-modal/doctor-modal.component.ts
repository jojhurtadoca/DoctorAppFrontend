import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Specialty } from '../../../specialty/interfaces/specialty';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Doctor } from '../../pages/interfaces/doctor.interface';
import { SpecialtyService } from '../../../specialty/services/specialty.service';
import { DoctorService } from '../../services/doctor.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-doctor-modal',
  standalone: true,
  imports: [],
  templateUrl: './doctor-modal.component.html',
  styleUrl: './doctor-modal.component.css'
})
export class DoctorModalComponent implements OnInit {
  
  formDoctor: FormGroup;
  title: string = 'Add';
  buttonName: string = 'Save';
  specialtyList: Specialty[] = [];

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
      specialty: ['', Validators.required],
      status: ['1', Validators.required]
    });

    if (this.doctorData) {
      this.title = 'Update';
      this.buttonName = 'Update';
    }
    this.specialtyService.activeList().subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.specialtyList = data.result;
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
        error: e => this.sharedService.showAlert(e.error.message, 'Error')
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
        error: e => this.sharedService.showAlert(e.error.message, 'Error'),
      })
    }


  }
}
