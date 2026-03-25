import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { user, Users } from '../interface/users';
import { UrlHandlingStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  http = inject(HttpClient);
  apiUrl = 'https://dummyjson.com/users';

  getAllUser(limit: number, skip: number, search: string): Observable<Users> {
    let url = `${this.apiUrl}?limit=${limit}&skip=${skip}&select=firstName,age,email,phone,role`;

    if (search) {
      url = `${this.apiUrl}/search?q=${search}&limit=${limit}&skip=${skip}`;
    }

    return this.http.get<Users>(url).pipe(map((res) => res));
  }

  deleteUser(userId: number) {
    let url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }
}
