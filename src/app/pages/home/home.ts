import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../../core/services/auth';
import { Products } from '../products/products';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

 
}

