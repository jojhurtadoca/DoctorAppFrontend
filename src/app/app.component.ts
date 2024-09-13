import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  users: any;
  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5273/api/user').subscribe({
      next: response => this.users = response,
      error: e => console.log(e),
      complete: () => console.log('finished')
    })
  }
}
