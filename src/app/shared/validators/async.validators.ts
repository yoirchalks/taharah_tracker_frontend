import { inject, Injectable } from '@angular/core';
import { UsersService } from '../../auth/users.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, debounceTime, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidators {
  emailUniqueValidator = function (): AsyncValidatorFn {
    const usersService = inject(UsersService);
    return (control: AbstractControl) => {
      const email = control.value;
      if (!email) return of(null);
      return usersService.checkEmailUnique(email).pipe(
        map((isUnique) => (isUnique ? null : { emailTaken: true })),
        catchError(() => of({ emailCheckFailed: true }))
      );
    };
  };

  constructor() {}
}
