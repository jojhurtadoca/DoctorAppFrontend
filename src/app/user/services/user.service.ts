import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login.model';
import { Observable } from 'rxjs';
import { Session } from '../interfaces/session.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl + 'User';
  constructor(private readonly http: HttpClient) { }

  login(request: Login): Observable<Session> {
    return this.http.post<Session>(
      `${this.baseUrl}/login`, request
    )
  }
}
