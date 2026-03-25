import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth-services';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthServices);
  const router = inject(Router);
  if (auth.isAuth()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
