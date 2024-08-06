import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private baseUrl = '/api/v1';

  private serviceCart = '/cart';

  private api = environment.microserviceProducts + this.baseUrl;

  constructor(private http: HttpClient) {}

  addToCart(cartItem: any): Observable<any> {
    
    return this.http.post(`${this.api}${this.serviceCart}/add`, cartItem);
  }

  getCart(cardId : any): Observable<any> {
    return this.http.get(`${this.api}${this.serviceCart}/getCartByCartId`, {params: {cartId: cardId}});
  }

}
