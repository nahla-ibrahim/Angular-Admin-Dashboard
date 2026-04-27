import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Products } from '../../pages/products/products';
import { ProductsType, ProductType } from '../interface/products-types';

@Injectable({
  providedIn: 'root',
})
export class ProductsServices {
  http = inject(HttpClient);
  apiUrl = 'https://dummyjson.com/products';

  getAllProducts(
    limit: number,
    skip: number,
    search: string,
    sort: string,
    dir: 'asc' | 'desc',
  ): Observable<ProductsType> {
    let url = `${this.apiUrl}?limit=${limit}&skip=${skip}&select=id,title,price,category,rating,stock,brand&sortBy=${sort}&order=${dir}`;

    if (search) {
      url = `${this.apiUrl}/search?q=${search}&limit=${limit}&skip=${skip}`;
    }

    return this.http.get<ProductsType>(url).pipe(map((res) => res));
  }
  getProductById(productId: number): Observable<ProductType> {
    let url = `${this.apiUrl}/${productId}`;
    return this.http.get<ProductType>(url).pipe(map((res) => res));
  }

  getcategories() {
    let url = `${this.apiUrl}/category-list`;
    return this.http.get<string[]>(url).pipe(map((res) => res));
  }

  addNewProduct(newproduct: any) {
    let url = `${this.apiUrl}/add`;
    return this.http.post<ProductType>(url, newproduct);
  }

  deleteProduct(productId: number) {
    let url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url);
  }

  updateProduct(productId: number, data: Partial<ProductType>) {
    let url = `${this.apiUrl}/${productId}`;
    return this.http.put(url, data);
  }
}
