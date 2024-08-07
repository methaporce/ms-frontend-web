import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private cartDataSource = new BehaviorSubject<any[]>([]);
  currentCartData = this.cartDataSource.asObservable();

  private orderDataSource = new BehaviorSubject<any[]>([]);
  currentOrderData = this.orderDataSource.asObservable();

  constructor() {}

  updateCartData(cartItem: any) {
    const currentValue = this.cartDataSource.value;
    this.cartDataSource.next([...currentValue, cartItem]);
  }

  clearCart() {
    this.cartDataSource.next([]);
  }
}
