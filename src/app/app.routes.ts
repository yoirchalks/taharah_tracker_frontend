import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import authRoutes from './auth/auth.routes';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: authRoutes,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];

export default routes;
