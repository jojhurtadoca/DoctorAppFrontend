import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../../shared/shared.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatPaginatorModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string [] = [
    'username',
    'lastname',
    'name',
    'email',
    'role'
  ];

  initialData = signal<User[]>([]);
  dataSource = new MatTableDataSource(this.initialData());

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getUsers() {
    this.userService.listUsers().subscribe({
      next: data => {
        if (data.isSuccess) {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.paginator;
        } else {
          this.sharedService.showAlert('There was an error, please try it later', 'Error')
        }
      },
      error: e => this.sharedService.showAlert((e.error.errors || e.error.errorMessage) || 'Internal server error', 'Error')
    })
  }

  filter(event: Event) {
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVal.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newUser() {
    this.dialog.open(UserModalComponent, {
      disableClose: true,
      width: '600px'
    }).afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.getUsers();
      }
    });
  }


  ngOnInit(): void {
    this.getUsers();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
