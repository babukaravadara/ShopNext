import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl +'api/Orders';

  constructor(private http: HttpClient) { }
  PlaceOrder(order:any): Observable<any> {
    return this.http.post(this.apiUrl +"\\Checkout",order);
  }
  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
