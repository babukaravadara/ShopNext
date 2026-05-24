import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [];
  private apiUrl = environment.apiUrl + 'api/Cart';

  constructor(
    private http: HttpClient
  ) { }

  addToCart(item: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      item
    );
  }
  getCartItems(): Observable<any> {
    return this.http.get(
      this.apiUrl
    );
  }
  updateCart(id: number, quantity: number
  ) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      {
        quantity: quantity
      }
    );
  }
  removeCart(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`

    );
  }
}
