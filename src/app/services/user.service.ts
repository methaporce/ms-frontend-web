import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/api/v1';

  private serviceUser = '/user';

  private api = environment.microserviceProducts + this.baseUrl;

  constructor(private http: HttpClient) {}

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.api}${this.serviceUser}/getUserById`, {
      params: { id: id },
    });
  }

  getUserLocations(id: any): Observable<any> {
    return this.http.get(`${this.api}${this.serviceUser}/getUserLocation`, {
      params: { id: id },
    });
  }

  getCardsByUserId(id: any): Observable<any> {
    return this.http.get(`${this.api}${this.serviceUser}/getCardsByUserId`, {
      params: { id: id },
    });
  }
}
