import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  loading: boolean = false;
  cartItems: any[] = [];
  totalPrice: number = 0;

  address: string = '';
  phone: string = '';

  cardNumber: string = '';
  cardName: string = '';
  cardCvv: string = '';
  cardExpiration: string = '';
  cardType: string = '';
  
  cartId: number = 0;



  constructor(private checkoutService: CheckoutService,
    private sharedService: SharedService,
    private cartService: CartService

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

  processCheckout(): void {
    this.loading = true;

    setTimeout(() => {
      const checkout = {
        orderId: 1, // Placeholder para el ID del pedido
      };
      this.checkoutService.processCheckout(checkout).subscribe(() => {
        alert('Checkout processed');
      });

      this.loading = false;
    }, 2000);
  }
}
