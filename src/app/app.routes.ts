import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/Guards/auth-guard';
import { guestGuard } from './core/Guards/guest-guard';

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
    ],
  },
];
