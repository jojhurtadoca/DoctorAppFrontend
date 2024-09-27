import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../specialty/interfaces/api.response';
import { Doctor } from '../pages/interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseUrl = environment.apiUrl + 'doctor/';

  constructor(
    private readonly http: HttpClient
  ) { }

  list(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  create(request: Doctor): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
  }

  update(request: Doctor): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}
