import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8100/api/v1';

  private apiCheckout = this.baseUrl + '/checkout';

  constructor(private http: HttpClient) {}

  processCheckout(checkout: any): Observable<any> {
    return this.http.post(`${this.apiCheckout}/process`, checkout);
  }
}
