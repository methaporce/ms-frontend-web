import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
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
  orderId: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storageCartData = JSON.parse(
      localStorage.getItem('cartData') || '{}'
    );

    if (storageCartData != '{}') {
      this.cartId = storageCartData.cartId;
      this.fillCart();
    } else {
      this.sharedService.currentCartData.subscribe((cartData: any) => {
        this.cartId = cartData[0].cartId;
        this.fillCart();
      });
    }
  }

  fillCart(): void {
    if (this.cartId != 0 && this.cartId != undefined) {
      this.cartService.getCart(this.cartId).subscribe((data: any) => {
        this.cartItems = data;
        this.cartItems.forEach((item) => {
          this.totalPrice += item.productPrice * item.quantity;
        });
      });
    }
  }

  createOrder(): void {
    const order = {
      cartId: this.cartId,
    };

    this.orderService
      .createOrder(order)
      .pipe(
        switchMap((data) => {
          this.orderId = data.orderId;
          this.totalPrice = data.totalToPay;
          this.cartId = data.cartId;

          this.sharedService.clearCart();

          return this.orderService.getOrder(this.orderId);
        })
      )
      .subscribe((data) => {
        this.sharedService.updateCartData(data);
        // set data in local storage
        localStorage.setItem('orderData', JSON.stringify(data));
        localStorage.removeItem('cartData');
        this.router.navigate(['/checkout']);
      });
  }
}
