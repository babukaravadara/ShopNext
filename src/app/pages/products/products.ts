import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../../core/services/auth';
import { NotificationService } from '../../shared/notification.service';
@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

  products: any[] = [];

  constructor(
    private productService: ProductService, private cartService: CartService, private router: Router
    , public authService: Auth, private notification: NotificationService) { }

  products$!: Observable<any[]>; // Define as an Observable
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.products$ = this.productService.getProducts();
  }
  addToCart(product: any) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    const cartItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.image
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: (res) => {
        if (res.success) {
          this.notification.error(res.message);
        }
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
   BuyProduct(product: any) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    const cartItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.image
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: (res) => {
        if (res.success) {
           this.router.navigate([
            '/checkout'
          ]);
        }
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

