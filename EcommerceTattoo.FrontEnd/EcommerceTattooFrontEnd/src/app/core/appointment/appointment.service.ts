import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppointmentRequest {
  email: string;
  phone: string;
  idea: string;
  date: string;
  turno: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = '/api/appointment';

  constructor(private http: HttpClient) {}

  sendAppointment(data: AppointmentRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
