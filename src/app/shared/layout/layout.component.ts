import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SharedService } from '../shared.service';
import { MatListItem, MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, RouterOutlet, RouterLink, MatNavList, MatListItem],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  username: string = '';

  constructor(
    private readonly router: Router,
    private readonly sharedService: SharedService
  ) { }

  ngOnInit(): void {
    const user = this.sharedService.getSession();
    if (user) {
      this.username = user.username;
    }
    console.log(this.router.config);
  }

  closeSession(): void {
    this.sharedService.removeSession();
    this.router.navigate(['login']);
  }
}
