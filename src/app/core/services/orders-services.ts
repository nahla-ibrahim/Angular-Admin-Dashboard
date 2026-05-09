import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrdersType, OrderType } from '../interface/orders-types';

@Injectable({
  providedIn: 'root',
})
export class OrdersServices {
  http = inject(HttpClient);
  apiUrl = 'https://dummyjson.com/carts';

  getAllOrders(limit: number, skip: number): Observable<OrdersType> {
    let url = `${this.apiUrl}?limit=${limit}&skip=${skip}&select=id,title,price,category,rating,stock,brand`;

    return this.http.get<OrdersType>(url).pipe(map((res) => res));
  }
  getOrderById(orderId: number): Observable<OrderType> {
    let url = `${this.apiUrl}/${orderId}`;
    return this.http.get<OrderType>(url).pipe(map((res) => res));
  }

  deleteOrder(orderId: number) {
    let url = `${this.apiUrl}/${orderId}`;
    return this.http.delete(url);
  }
}
