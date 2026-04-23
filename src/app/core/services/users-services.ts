import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { user, Users } from '../interface/users';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  http = inject(HttpClient);
  apiUrl = 'https://dummyjson.com/users';

  getAllUser(
    limit: number,
    skip: number,
    search: string,
    sort: string,
    dir: 'asc' | 'desc',
  ): Observable<Users> {
    let url = `${this.apiUrl}?limit=${limit}&skip=${skip}&select=firstName,age,email,phone,role&sortBy=${sort}&order=${dir}`;

    if (search) {
      url = `${this.apiUrl}/search?q=${search}&limit=${limit}&skip=${skip}`;
    }

    return this.http.get<Users>(url).pipe(map((res) => res));
  }
  getUserById(userId: number): Observable<user> {
    let url = `${this.apiUrl}/${userId}`;
    return this.http.get<user>(url).pipe(map((res) => res));
  }

  deleteUser(userId: number) {
    let url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }

  updateUser(userId: number, data: Partial<user>) {
    let url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, data);
  }
}
