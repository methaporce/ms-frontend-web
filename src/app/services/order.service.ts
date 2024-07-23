import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8100/api/v1';

  private apiOrder = this.baseUrl + '/order';

  constructor(private http: HttpClient) {}

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiOrder}/create`, order);
  }
}
