import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpService = inject(HttpClient);

  constructor() {}

  checkEmailUnique(email: string): Observable<boolean> {
    return this.httpService
      .post<{ unique: boolean }>('http://localhost:3000/api/emails', { email })
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
}
