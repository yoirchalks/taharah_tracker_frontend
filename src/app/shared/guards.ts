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

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanMatch {
  httpService = inject(HttpClient);
  router = inject(Router);
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    this.httpService
      .get('https://taharah-tracker-backend.onrender.com/api/authChack', {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError(() => of(this.router.parseUrl('')))
      );
    return false;
  }
}
