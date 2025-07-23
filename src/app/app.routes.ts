import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import authRoutes from './auth/auth.routes';
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
    canMatch: [authGuard],
    loadChildren: () => import('./home/home.routes').then((m) => m.default),
  },
];

export default routes;
