import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import authRoutes from './auth/auth.routes';
import homeRoutes from './home/home.routes';
import { HomeComponent } from './home/home.component';
import { authGuard } from './shared/guards/canMatch';

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
    children: homeRoutes,
    canMatch: [authGuard],
  },
];

export default routes;
