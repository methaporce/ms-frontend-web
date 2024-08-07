import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderService } from 'src/app/services/order.service';
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

  orderId: number = 0;

  addingNewAddress = false;
  addingNewCard = false;

  savedAddresses = [];
  selectedAddress = 0;

  savedCards = ['Tarjeta 1', 'Tarjeta 2'];
  selectedCard = this.savedCards[0];

  constructor(
    private checkoutService: CheckoutService,
    private sharedService: SharedService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storageOrderData = JSON.parse(
      localStorage.getItem('orderData') || '{}'
    );

    if (storageOrderData != '{}') {
      this.orderId = storageOrderData.orderId;
      this.totalPrice = storageOrderData.orderTotalToPay;
      this.cartItems = storageOrderData.products;
    } else {
      this.sharedService.currentCartData.subscribe((cartData: any) => {
        this.orderId = cartData[0].orderId;
        this.totalPrice = cartData[0].orderTotalToPay;

        this.cartItems = cartData[0].products;
      });
    }
  }

  processCheckout(): void {
    this.loading = true;

    setTimeout(() => {
      const checkout = {
        orderId: this.orderId,
      };

      this.checkoutService.processCheckout(checkout).subscribe(() => {
        this.router.navigate(['/']);
        localStorage.removeItem('orderData');
        this.sharedService.clearCart();
      });

      this.loading = false;
    }, 3000);
  }

  showNewAddressForm() {
    this.addingNewAddress = true;
  }

  hideNewAddressForm() {
    this.addingNewAddress = false;
  }

  showNewCardForm() {
    this.addingNewCard = true;
  }

  hideNewCardForm() {
    this.addingNewCard = false;
  }
}
