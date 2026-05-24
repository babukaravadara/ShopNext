import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders {
  constructor(private orderService: OrderService) { }
  orders: any[] = [];

  private cdr = inject(ChangeDetectorRef); 
  ngOnInit() {
    this.getorder();
  }
  orders$!: Observable<any[]>; 
  getorder() {
    this.orders$ = this.orderService.getOrders();
  }
}
