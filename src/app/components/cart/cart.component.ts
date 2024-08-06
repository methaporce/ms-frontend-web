import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { SharedService } from 'src/app/services/shared.service';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;
  cartId: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.currentCartData.subscribe((cartData: any) => {
      this.cartId = cartData[0].cartId;

      this.cartService.getCart(this.cartId).subscribe((data) => {
        this.cartItems = data;
        let totalPrice = this.cartItems.forEach((item) => {
          this.totalPrice += item.productPrice * item.quantity;
        });
      });
    });
  }

  createOrder(): void {
    const order = {
      cartId: this.cartId,
      paymentMethodId: 1,
    };

    this.orderService.createOrder(order).subscribe(() => {
    });
  }
}
