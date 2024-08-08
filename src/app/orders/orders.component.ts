import { Component } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { formatDate } from '@angular/common';

export enum CheckoutStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  ERROR = 'ERROR',
  WAITING = 'WAITING',
  UNKNOWN = 'UNKNOWN',
}

export const CheckoutStatusTranslations: { [key in CheckoutStatus]: string } = {
  [CheckoutStatus.IN_PROGRESS]: 'En Proceso',
  [CheckoutStatus.COMPLETED]: 'Completado',
  [CheckoutStatus.CANCELLED]: 'Cancelado',
  [CheckoutStatus.REJECTED]: 'Rechazado',
  [CheckoutStatus.EXPIRED]: 'Expirado',
  [CheckoutStatus.ERROR]: 'Error',
  [CheckoutStatus.WAITING]: 'Esperando',
  [CheckoutStatus.UNKNOWN]: 'Se lo robo la paqueteria mi estimado',
};

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  checkouts: any[] = [];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.checkoutService.getCheckout(1).subscribe((data: any[]) => {
      this.checkouts = data.map((checkout) => {
        const status: CheckoutStatus =
          checkout.checkoutStatus as CheckoutStatus;
        return {
          ...checkout,
          checkoutStatusTranslated: CheckoutStatusTranslations[status],
        };
      });
    });
  }
}
