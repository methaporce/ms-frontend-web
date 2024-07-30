import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:8081/api/v1';

  private apiCart = this.baseUrl + '/cart';

  constructor(private http: HttpClient) {}

  addToCart(cartItem: any): Observable<any> {
    return this.http.post(`${this.apiCart}/add`, cartItem);
  }
}
