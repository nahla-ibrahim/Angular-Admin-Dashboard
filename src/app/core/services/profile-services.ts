import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileServices {
  private http = inject(HttpClient);

  apiUrl = 'https://dummyjson.com/auth/me';

  getCurrentUser() {
    const token = localStorage.getItem('token');

    return this.http.get(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
