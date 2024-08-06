import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private cartDataSource = new BehaviorSubject<any[]>([]);
  currentCartData = this.cartDataSource.asObservable();

  constructor() { }

  updateCartData(cartItem: any) {
    const currentValue = this.cartDataSource.value;
    this.cartDataSource.next([...currentValue, cartItem]);
  }

  clearCart() {
    this.cartDataSource.next([]);
  }
}