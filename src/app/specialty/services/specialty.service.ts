import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api.response';
import { Specialty } from '../interfaces/specialty';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  baseUrl = environment.apiUrl + 'specialty/';

  constructor(
    private readonly http: HttpClient,
  ) { }

  list(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  activeList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}get-actives`);
  }

  create(request: Specialty): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
  }

  update(request: Specialty): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}
