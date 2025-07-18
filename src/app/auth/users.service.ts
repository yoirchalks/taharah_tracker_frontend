import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpService = inject(HttpClient);
  rootUrl = 'https://taharah-tracker-backend.onrender.com/api';

  constructor() {}

  checkEmailUnique(email: string): Observable<boolean> {
    return this.httpService
      .post<{ unique: boolean }>(`${this.rootUrl}/emails`, { email })
      .pipe(
        tap(() => console.log('service called')),
        map((res) => {
          return !!res?.unique; // Defensive
        }),
        catchError((err) => {
          return throwError(
            () =>
              new Error(
                err?.error?.message || err.message || 'Email check failed'
              )
          );
        })
      );
  }

  postNewUser(userData: { email: string; name: string; password: string }) {
    return this.httpService.post(`${this.rootUrl}/signUps`, userData).pipe(
      tap(() => console.log('post user service called')),
      catchError((err) => {
        return throwError(
          () =>
            new Error(
              err?.error?.message || err.message || 'Failed to sign up user'
            )
        );
      })
    );
  }
}
