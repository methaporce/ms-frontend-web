import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(productId: number): void {
    const cartItem = {
      userId: 1, // Placeholder for user ID
      productId: productId,
      quantity: 1,
    };

    this.cartService.addToCart(cartItem).subscribe(() => {
      console.log('Product added to cart successfully!');
    });
  }
}
