import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';
import { Doctor } from '../interfaces/doctor.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DoctorService } from '../../services/doctor.service';
import { SharedService } from '../../../shared/shared.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DoctorModalComponent } from '../../modals/doctor-modal/doctor-modal.component';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatPaginatorModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'lastname',
    'name',
    'phone',
    'gender',
    'specialtyName',
    'status',
    'actions'
  ];

  initialData = signal<Doctor[]>([]);
  dataSource = new MatTableDataSource(this.initialData());

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private doctorService: DoctorService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getDoctors() {
    this.doctorService.list().subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.paginator;
        } else {
          this.sharedService.showAlert('The system coud not retrieve the list, please try later', 'Error')
        }
      },
      error: e => this.sharedService.showAlert((e.error.errors || e.error.errorMessage) || 'Internal server error', 'Error')
    })
  }

  newDoctor() {
    this.dialog.open(DoctorModalComponent, {
      disableClose: true, 
      width: '600px'
    }).afterClosed().subscribe((data) => {
      if (data === 'true') {
        this.getDoctors();
      }
    });
  }

  updateDoctor(doctor: Doctor) {
    this.dialog.open(DoctorModalComponent, {
      disableClose: true, 
      width: '600px',
      data: doctor,
    }).afterClosed().subscribe((data) => {
      if (data === 'true') {
        this.getDoctors();
      }
    });
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: "Do you want to remove this Doctor?",
      text: doctor.name + ' ' + doctor.lastname,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Remove',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.delete(doctor.id).subscribe({
          next: (d) => {
            if (d.isSuccess) {
              this.sharedService.showAlert('Doctor was deleted', 'Success');
              this.getDoctors();
            } else {
              this.sharedService.showAlert('Doctor could not be deleted, please try later', 'Error');
            }
          },
          error: e => this.sharedService.showAlert((e.error.errors || e.error.errorMessage) || 'Internal server error', 'Error')
        });
      }
    });
  }

  applyFilterToList(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getDoctors();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
