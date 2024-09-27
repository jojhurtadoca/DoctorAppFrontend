import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Specialty } from '../../interfaces/specialty';
import { SpecialtyService } from '../../services/specialty.service';
import { SharedService } from '../../../shared/shared.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { SpecialtyModalComponent } from '../../modals/specialty-modal/specialty-modal.component';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListSpecialtyComponent implements OnInit, AfterViewInit {
 
  displayedColumns: string[] = [
    'Name',
    'Description',
    'Status',
    'Actions'
  ];

  initialData: Specialty[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) pagination!: MatPaginator;

  constructor(
    private readonly specialtyService: SpecialtyService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getSpecialties() {
    this.specialtyService.list().subscribe({
      next: data => data.isSuccess ? this.dataSource = new MatTableDataSource(data.result) : this.sharedService.showAlert('No data found', 'Warning'),
      error: e => this.sharedService.showAlert(e.error.message, 'Error')
    })
  }

  newSpecialty() {
    this.dialog.open(SpecialtyModalComponent, {
      disableClose: true,
      width: '400px'
    }).afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.getSpecialties();
      }
    });
  }

  editSpecialty(specialty: Specialty) {
    this.dialog.open(SpecialtyModalComponent, {
      disableClose: true,
      width: '400px',
      data: specialty
    }).afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.getSpecialties();
      }
    });
  }

  deleteSpecialty(specialty: Specialty) {
    Swal.fire({
      title: "Do you want to remove this specialty?",
      text: specialty.name,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Remove',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.specialtyService.delete(specialty.id).subscribe({
          next: (d) => {
            if (d.isSuccess) {
              this.sharedService.showAlert('Specialty was deleted', 'Success');
              this.getSpecialties();
            } else {
              this.sharedService.showAlert('Specialty could not be deleted, please try later', 'Error');
            }
          },
          error: e => this.sharedService.showAlert(e.error.message, 'Error')
        });
      }
    });
  }

  ngOnInit(): void {
    this.getSpecialties();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.pagination;
  }

  filter(event: Event) {
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVal.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
