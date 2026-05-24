import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order';
import { CartService } from '../../core/services/cart'
import { NotificationService } from '../../shared/notification.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl:'./checkout.html'
})
export class Checkout
  implements OnInit {
  checkoutForm!: FormGroup;
  total: number = 0;
  orders: any[] = [];
  constructor(private fb: FormBuilder, private orderservice: OrderService, private cartservice: CartService, private router: Router, private cd: ChangeDetectorRef
  ,private notification: NotificationService) { }
  submitted = false;
  ngOnInit() {
    this.checkoutForm =
      this.fb.group({
        address: [
          '',
          Validators.required
        ],
        phone: ['', [
          Validators.required,             
          Validators.pattern("^[0-9]+$")
        ]]
      });
    this.loadCart();
  }
  loadCart() {
    this.cartservice.getCartItems().subscribe((res: Array<{ price: number; quantity: number }>) => {
      this.total = res.reduce((sum: number, item: { price: number; quantity: number }) =>
        sum + (item.price * item.quantity),
        0
      );
      this.cd.detectChanges();
    });
  }
  placeOrder() {
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      return;
    }
    this.orderservice.PlaceOrder(this.checkoutForm.value)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.notification.error(res.message);
            this.router.navigate([
              '/orders'
            ]);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
