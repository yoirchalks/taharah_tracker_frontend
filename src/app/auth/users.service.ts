import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpService = inject(HttpClient);
  rootUrl = 'http://localhost:3000/api';

  constructor() {}

  checkEmailUnique(email: string): Observable<boolean> {
    return this.httpService
      .post<{ unique: boolean }>(`${this.rootUrl}/emails`, { email })
      .pipe(
        map((res) => res.unique),
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
    this.httpService.post(`${this.rootUrl}/signUps`, userData).pipe(
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
