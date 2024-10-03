import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login.model';
import { Observable } from 'rxjs';
import { Session } from '../interfaces/session.model';
import { ApiResponse } from '../../specialty/interfaces/api.response';
import { Register } from '../interfaces/register';

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

  listUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  register(req: Register): Observable<Session> {
    return this.http.post<Session>(
      `${this.baseUrl}/register`, req
    )
  }

  listRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/roles`);
  }
}
