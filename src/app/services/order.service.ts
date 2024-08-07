import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = '/api/v1';

  private serviceCart = '/order';

  private api = environment.microserviceProducts + this.baseUrl;

  constructor(private http: HttpClient) {}

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.api}${this.serviceCart}/create`, order);
  }

  getOrder(orderId: any): Observable<any> {
    return this.http.get(`${this.api}${this.serviceCart}/get`, {
      params: { orderId: orderId },
    });
  }
}
