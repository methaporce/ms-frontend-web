import { Component } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { formatDate } from '@angular/common';

export enum CheckoutStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const CheckoutStatusTranslations: { [key in CheckoutStatus]: string } = {
  [CheckoutStatus.IN_PROGRESS]: 'En Progreso',
  [CheckoutStatus.COMPLETED]: 'Completado',
  [CheckoutStatus.CANCELLED]: 'Cancelado',
};

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  checkoutItems: any[] = [];
  totals: any[] = [];
  totalToPay: number = 0;
  checkoutStatus: string = '';
  // formate
  date = new Date();

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService.getCheckout(7).subscribe((data) => {
      this.checkoutItems = data.products;
      this.totals = new Array(this.checkoutItems.length - 1);

      for (let index = 0; index < this.checkoutItems.length - 1; index++) {
        this.totals[index] = data.totalToPay;
      }
      this.totalToPay = data.totalToPay;
      this.date = new Date(data.date);

      console.log(this.date);

      switch (data.checkoutStatus) {
        case 'IN_PROGRESS':
          this.checkoutStatus = CheckoutStatusTranslations.IN_PROGRESS;
          break;
        case 'COMPLETED':
          this.checkoutStatus = CheckoutStatusTranslations.COMPLETED;
          break;
        case 'CANCELLED':
          this.checkoutStatus = CheckoutStatusTranslations.CANCELLED;
          break;
      }
    });
  }
}
