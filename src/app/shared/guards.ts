import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CanMatch,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanMatch {
  httpService = inject(HttpClient);
  router = inject(Router);
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.httpService
      .get(`${environment.apiUrl}/authCheck`, {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError(() => of(this.router.parseUrl('/auth/home')))
      );
  }
}
