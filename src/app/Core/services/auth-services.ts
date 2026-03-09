import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/auth/login';

  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(this.apiUrl, body).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.accessToken);
      }),
      catchError((err) => {
        return throwError(() => new Error('Invalid username or password'));
      }),
    );
  }

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
