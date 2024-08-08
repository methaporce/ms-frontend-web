import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderService } from 'src/app/services/order.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  loading: boolean = false;
  cartItems: any[] = [];
  totalPrice: number = 0;

  street: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  cp: string = '';
  phone: string = '';

  cardNumber: string = '';
  cardName: string = '';
  cardCvv: string = '';
  cardExpiration: Date = new Date();

  cardType: any = {
    CREDIT_CARD: 'Credito',
    DEBIT_CARD: 'Debito',
  };

  orderId: number = 0;

  savedAddresses: any[] = [];
  temporaryAddress: any = [];
  selectedAddress = 0;

  savedCards: any[] = [];
  temporaryCard: any = [];
  selectedCard = 0;
  cardTypes: string[] = Object.values(this.cardType);
  selectedCardType: number = 0;

  constructor(
    private checkoutService: CheckoutService,
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService
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

    this.userService
      .getUserLocations(environment.userIdTest)
      .subscribe((data: any) => {
        this.savedAddresses = new Array(data.length - 1);

        for (let index = 0; index < data.length; index++) {
          this.savedAddresses.push({
            address: data[index].address,
            city: data[index].city,
            state: data[index].state,
            country: data[index].country,
            cp: data[index].postalCode,
            phone: data[index].user.phone,
          });
        }
      });

    this.userService
      .getCardsByUserId(environment.userIdTest)
      .subscribe((data: any) => {
        this.savedCards = new Array(data.length - 1);

        for (let index = 0; index < data.length; index++) {
          this.savedCards.push({
            cardNumber: data[index].cardNumber,
            cvv: data[index].cvv,
            expiration: data[index].expiration,
            paymentMethodId: data[index].paymentMethod.id, //TODO: PAYMENT METHOD ID
          });
        }
      });
  }

  processCheckout(): void {
    this.loading = true;

    let checkout = {};

    setTimeout(() => {
      if (this.savedAddresses.length > 0 && this.savedCards.length > 0) {
        checkout = this.modelToSendCheckoutSaved();
      }

      if (this.savedAddresses.length == 0 && this.savedCards.length == 0) {
        checkout = this.modelToSendCheckout();
      }

      this.checkoutService.processCheckout(checkout).subscribe(() => {
        this.router.navigate(['/']);
        localStorage.removeItem('orderData');
        this.sharedService.clearCart();
      });
    }, 3000);

    this.loading = false;
  }

  modelToSendCheckout() {
    return {
      orderId: this.orderId,
      phoneUser: this.phone,
      userLocation: {
        address: this.street,
        city: this.city,
        state: this.state,
        country: this.country,
        postalCode: this.cp,
      },
      cardUser: {
        cardNumber: this.cardNumber,
        cvv: this.cardCvv,
        expiration: this.cardExpiration,
      },
      paymentMethodId: this.selectedCardType,
    };
  }

  modelToSendCheckoutSaved() {
    return {
      orderId: this.orderId,
      phoneUser: this.savedAddresses[this.selectedAddress].phone,
      userLocation: {
        address: this.savedAddresses[this.selectedAddress].address,
        city: this.savedAddresses[this.selectedAddress].city,
        state: this.savedAddresses[this.selectedAddress].state,
        country: this.savedAddresses[this.selectedAddress].country,
        postalCode: this.savedAddresses[this.selectedAddress].cp,
      },
      cardUser: {
        cardNumber: this.savedCards[this.selectedCard].cardNumber,
        cvv: this.savedCards[this.selectedCard].cvv,
        expiration: this.savedCards[this.selectedCard].expiration,
      },
      paymentMethodId: this.savedCards[this.selectedCard].paymentMethodId,
    };
  }

  showNewAddressForm() {
    this.temporaryAddress = this.savedAddresses;
    this.savedAddresses = [];
  }

  hideNewAddressForm() {
    this.savedAddresses = this.temporaryAddress;
    this.temporaryAddress = [];
  }

  showNewCardForm() {
    this.temporaryCard = this.savedCards;
    this.savedCards = [];
  }

  hideNewCardForm() {
    this.savedCards = this.temporaryCard;
    this.temporaryCard = [];
  }

  validDataToRealizeCheckout(): boolean {
    if (
      (this.street &&
        this.city &&
        this.state &&
        this.country &&
        this.cp &&
        this.phone &&
        this.cardNumber &&
        this.cardCvv &&
        this.cardExpiration &&
        this.cardName &&
        this.selectedCardType > 0) ||
      (this.savedAddresses.length > 0 && this.savedCards.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  }

  onCardTypeChange(event: any) {
    this.selectedCardType = event.target.value;
  }
}
