import { inject, Injectable } from '@angular/core';
import { UsersService } from '../../auth/users.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, debounceTime, map, of } from 'rxjs';
import normalizeEmail from '../utils/normalizeEmail';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidators {
  emailUniqueValidator = function (): AsyncValidatorFn {
    const usersService = inject(UsersService);
    return (control: AbstractControl) => {
      let email = control.value;
      if (!email || !control.valid) return of(null);
      email = normalizeEmail(email);
      return usersService.checkEmailUnique(email).pipe(
        map((isUnique) => (isUnique ? null : { emailTaken: true })),
        catchError(() => of({ emailCheckFailed: true }))
      );
    };
  };

  constructor() {}
}
