import { Routes } from '@angular/router';
import { Login } from './Features/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './Core/Guards/auth-guard';
import { guestGuard } from './Core/Guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./Features/auth/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./Features/dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },
];
