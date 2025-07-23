import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

interface LogInData {
  email: string;
  password?: string;
  requestingOtp: boolean;
}

interface OTPData {
  userId: string;
  otpId: string;
  OTP: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpService = inject(HttpClient);
  baseUrl = 'https://taharah-tracker-backend.onrender.com/api';

  logIn = (data: LogInData) => {
    return this.httpService.post(`${this.baseUrl}/logIns`, data).pipe(
      catchError((err) => {
        return throwError(() => {
          new Error(
            err.error.message || err.message || 'log in attempt failed'
          );
        });
      })
    );
  };

  submitOtp = (data: OTPData) => {
    return this.httpService.post(`${this.baseUrl}/otp`, data).pipe(
      catchError((err) => {
        return throwError(() => {
          new Error(err.error.message || err.message || 'otp attempt failed');
        });
      })
    );
  };
}
