import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = environment.apiUrl+"patients/";

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  createPatient(data: { id: number; name: string; age: number, diagnosis: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  updatePatient(data: { id: number; name: string; age: number, diagnosis: string; }): Observable<any> {
    return this.http.put(`${this.apiUrl}`, data);
  }

  assingDoctor(data: { id: number; name: string; specialty: number; }, id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}assingDoctor/${id}`, data)
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

}
