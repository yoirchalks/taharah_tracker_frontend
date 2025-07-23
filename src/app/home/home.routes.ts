import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'prefix' },
      { path: 'calendar', component: CalendarComponent },
      {
        path: 'aboutUs',
        loadComponent: () =>
          import('./about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./history/history.component').then((m) => m.HistoryComponent),
      },
    ],
  },
];

export default routes;
