import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  private apiUrl = 'http://localhost:5274/api/images';

  constructor(private http: HttpClient) {}

  getImagesByFolder(folder: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${folder}`);
  }
}
