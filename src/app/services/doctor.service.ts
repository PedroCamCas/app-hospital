import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = environment.apiUrl+"doctors/";

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getDoctor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}details/${id}`);
  }

  createDoctor(data: { name: string; specialty: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  updateDoctor(data: { id: number; name: string; specialty: string; }): Observable<any> {
    return this.http.put(`${this.apiUrl}`, data);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
