import { Routes } from '@angular/router';
import { authGuard } from './core/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.Home)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products')
        .then(m => m.Products),
    canActivate: [
      authGuard
    ]
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders')
        .then(m => m.Orders),
    canActivate: [
      authGuard
    ]
  },
  {
    path: 'admin/manageproducts',
    loadComponent: () =>
      import('./pages/admin/manageproduct/add-product')
        .then(m => m.AddProduct),
         canActivate: [
      authGuard
    ],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart')
        .then(m => m.CartComponent),
    canActivate: [
      authGuard
    ]
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register')
        .then(m => m.Register)
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout')
        .then(m => m.Checkout),
    canActivate: [
      authGuard
    ]
  },
  {
    path: 'admin/manageuser',
    loadComponent: () =>
      import('./pages/admin/manageuser/user')
        .then(m => m.UserList),
    canActivate: [
      authGuard
    ],
  data: {
    roles: ['admin']
  }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
