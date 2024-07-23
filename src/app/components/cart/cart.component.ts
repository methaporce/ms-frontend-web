import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {}

  createOrder(): void {
    const order = {
      cartId: 1,
      paymentMethodId: 1,
    };
    this.orderService.createOrder(order).subscribe(() => {
      alert('Order created');
    });
  }
}
