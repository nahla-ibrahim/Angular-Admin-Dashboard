import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth-services';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthServices);

  if (auth.isAuth()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
