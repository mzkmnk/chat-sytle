import {Route} from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.component').then((M) => M.SignInComponent),
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];
