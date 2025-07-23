import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

interface LogInData {
  email: string;
  password?: string;
  requestingOtp: boolean;
}

interface LoginResponse {
  userId: string;
}

interface OTPData {
  userId: string;
  otpId: string;
  OTP: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = 'https://taharah-tracker-backend.onrender.com/api';

  // signal to hold current userId (null when logged out)
  private _userId = signal<string | null>(null);
  readonly userId = this._userId.asReadonly();

  /**
   * Attempt login (or request OTP if requestingOtp=true).
   * On success, sets this._userId.
   */
  logIn(data: LogInData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/logIns`, data).pipe(
      tap((res) => this._userId.set(res.userId)),
      catchError((err) =>
        throwError(
          () =>
            new Error(
              err.error?.message || err.message || 'Log in attempt failed'
            )
        )
      )
    );
  }

  /**
   * Submit an OTP to complete login.
   */
  submitOtp(data: OTPData): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/otp`, data)
      .pipe(
        catchError((err) =>
          throwError(
            () =>
              new Error(
                err.error?.message || err.message || 'OTP submission failed'
              )
          )
        )
      );
  }

  /**
   * Check whether an email is unique.
   */
  checkEmailUnique(email: string): Observable<boolean> {
    return this.http
      .post<{ unique: boolean }>(`${this.baseUrl}/emails`, { email })
      .pipe(
        map((res) => !!res.unique),
        catchError((err) =>
          throwError(
            () =>
              new Error(
                err.error?.message || err.message || 'Email check failed'
              )
          )
        )
      );
  }

  /**
   * Create a brand‑new user (sign up).
   */
  postNewUser(userData: {
    email: string;
    name: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/signUps`, userData)
      .pipe(
        catchError((err) =>
          throwError(
            () =>
              new Error(err.error?.message || err.message || 'Sign up failed')
          )
        )
      );
  }

  /** Log out / clear stored userId */
  clearUserId(): void {
    this._userId.set(null);
  }
}
