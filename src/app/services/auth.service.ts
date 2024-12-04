import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+"users/";

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, data);
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, data);
  }

  userUpdate(data: { name: string, email: string, password: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}`, data);
  }

  getUser(email: string): Observable<any>{
    return this.http.get(`${this.apiUrl}${email}`);
  }


} 