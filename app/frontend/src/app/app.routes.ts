import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path:'auth',
    loadChildren:() => import('@chat-style/auth').then((M) => M.authRoutes),
  }
];
