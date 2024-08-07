import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: any[] = [];
  quantities: { [key: string]: number } = {};
  cartData: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;

      this.products.forEach((product) => {
        this.quantities[product.id] = 1;
      });
    });
  }

  addToCart(productId: number): void {
    const cartItem = {
      userId: 2,
      productId: productId,
      quantity: this.quantities[productId] || 1,
    };

    this.cartService.addToCart(cartItem).subscribe((data) => {
      this.cartData = data;
      this.router.navigate(['/cart']);
      this.quantities[productId] = 0;

      this.sharedService.updateCartData(this.cartData);

      // set data in local storage
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    });
  }
}
