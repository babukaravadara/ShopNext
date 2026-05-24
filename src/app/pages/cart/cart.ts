import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent
  implements OnInit {
  cartItems: any[] = [];
  total = 0;
  constructor(
    private cartService: CartService, private router: Router, private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }
  loadCart() {
    this.cartService
      .getCartItems()
      .subscribe({
        next: (res: any) => {
          this.cartItems = [...res];
          this.calculateTotal();
          this.cdr.detectChanges(); 
        }
      });
  }

  calculateTotal() {
    this.total = 0;
    this.cartItems.forEach(item => {
      this.total +=
        item.price * item.quantity;
    });
  }
  increase(item: any) {
    item.quantity++;
    this.updateQuantity(item);
  }
  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }
  updateQuantity(item: any) {
    this.cartService.updateCart( item.id, item.quantity)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.calculateTotal();
          }
          else {
            alert(res.message);
          }
        }
      });
  }
  removeItem(id: number) {
    this.cartService
      .removeCart(id)
      .subscribe({
        next: () => {
          this.loadCart();
        }

      });
  }
  GoToCheckout() {
    this.router.navigate([
      '/checkout'
    ]);
  }
}
