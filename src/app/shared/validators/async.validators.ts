import { inject, Injectable } from '@angular/core';
import { UsersService } from '../../auth/users.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import normalizeEmail from '../utils/normalizeEmail';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidators {
  userService = inject(UsersService);

  emailUniqueValidator = (): AsyncValidatorFn => {
    return (control: AbstractControl) => {
      let email = control.value;
      email = normalizeEmail(email);
      return this.userService.checkEmailUnique(email).pipe(
        map((isUnique) => (isUnique ? null : { emailTaken: true })),
        catchError(() => of({ emailCheckFailed: true }))
      );
    };
  };

  emailInUse = (): AsyncValidatorFn => {
    return (control: AbstractControl) => {
      let email = control.value;
      email = normalizeEmail(email);
      return this.userService.checkEmailUnique(email).pipe(
        map((isUnique) => (isUnique ? { emailNotInUse: true } : null)),
        catchError(() => of({ emailCheckFailed: true }))
      );
    };
  };
}
