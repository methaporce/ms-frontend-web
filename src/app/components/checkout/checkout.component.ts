import { Component } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  loading: boolean = false;

  constructor(private checkoutService: CheckoutService) {}

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
