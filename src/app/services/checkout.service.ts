import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseUrl = '/api/v1';

  private serviceCart = '/checkout';

  private api = environment.microserviceProducts + this.baseUrl;

  constructor(private http: HttpClient) {}

  processCheckout(orderId: any): Observable<any> {
    return this.http.post(`${this.api}${this.serviceCart}/process`, orderId);
  }

  getCheckout(checkoutId: any): Observable<any> {
    return this.http.get(`${this.api}${this.serviceCart}/getOrderCheckout`, {
      params: { id: checkoutId },
    });
  }
}
