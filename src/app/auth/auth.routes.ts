import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'logIn',
        loadComponent: () =>
          import('./log-in/log-in.component').then((m) => m.LogInComponent),
      },
      {
        path: 'signUp',
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
      {
        path: 'otp',
        loadComponent: () =>
          import('./otp/otp.component').then((m) => m.OtpComponent),
      },
    ],
  },
];

export default routes;
