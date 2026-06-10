import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'barChart',
        loadComponent: () =>
          import('./pages/charts-page/bar-chart/bar-chart').then((m) => m.BarChart),
      },
      {
        path: 'lineChart',
        loadComponent: () =>
          import('./pages/charts-page/line-chart/line-chart').then((m) => m.LineChart),
      },
      {
        path: 'horizontalBarChart',

        loadComponent: () =>
          import('./pages/charts-page/horizontal-bar-chart/horizontal-bar-chart').then(
            (m) => m.HorizontalBarChart,
          ),
      },
      {
        path: 'pieChart',
        loadComponent: () =>
          import('./pages/charts-page/pie-chart/pie-chart').then((m) => m.PieChart),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then((m) => m.Users),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then((m) => m.Products),
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/orders/orders').then((m) => m.Orders),
      },
      {
        path: 'faq',
        loadComponent: () => import('./pages/faq/faq').then((m) => m.Faq),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendar/calendar').then((m) => m.Calendar),
      },
    ],
  },
];
