import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl = 'http://localhost:8080/api/incidents';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getHeaders() });
  }

 getById(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
}

  create(incident: any): Observable<any> {
    return this.http.post(this.baseUrl, incident, { headers: this.getHeaders() });
  }

  update(id: number, incident: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, incident, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
} 