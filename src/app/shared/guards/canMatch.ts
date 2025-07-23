import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanMatch,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanMatch {
  httpService = inject(HttpClient);
  router = inject(Router);

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> {
    return this.httpService
      .get(`${environment.apiUrl}/authCheck`, {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError(() => of(this.router.parseUrl('/auth/home')))
      );
  }

  canDeactivate() {
    return true;
  }
}
