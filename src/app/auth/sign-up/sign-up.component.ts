import { Component, inject, signal } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators as Val,
} from '@angular/forms';

import { AsyncValidators } from '../../shared/validators/async.validators';

import {
  passwordRequirements,
  passwordsMatch,
} from '../../shared/validators/sync.validators';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CanComponentDeactivate } from '../../shared/guards/canDeactivate';
import { LeavePageDialogComponent } from '../../shared/leave-page-dialog/leave-page-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { of, tap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements CanComponentDeactivate {
  asyncValidators = inject(AsyncValidators);
  passwordVisible = false;
  repeatPasswordVisible = false;
  formSubmitted = false;
  modalActive = false;
  passwordValid = signal(false);
  dataSaved = signal(false);

  signUpForm = new FormGroup({
    name: new FormControl('', [
      Val.minLength(5),
      Val.maxLength(25),
      Val.required,
    ]),
    email: new FormControl('', {
      validators: [Val.email, Val.required],
      asyncValidators: [this.asyncValidators.emailUniqueValidator()],
      updateOn: 'blur',
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Val.minLength(8),
          Val.maxLength(25),
          Val.required,
          passwordRequirements,
        ]),
        repeatPassword: new FormControl(
          { value: '', disabled: true },
          {
            validators: [Val.required],
            updateOn: 'change',
          }
        ),
      },
      { validators: [passwordsMatch] }
    ),
  });

  public get name() {
    return this.signUpForm.controls.name;
  }
  public get nameEmpty() {
    return (
      (this.name.touched || this.formSubmitted) &&
      this.name.hasError?.('required')
    );
  }
  public get nameShort() {
    return (
      (this.name.touched || this.formSubmitted) &&
      this.name.hasError?.('minlength')
    );
  }
  public get nameLong() {
    return (
      (this.name.touched || this.formSubmitted) &&
      this.name.hasError('maxlength')
    );
  }

  public get email() {
    return this.signUpForm.controls.email;
  }
  public get emailEmpty() {
    return (
      (this.email.touched || this.formSubmitted) &&
      this.email.hasError('required')
    );
  }
  public get emailPending() {
    return this.email.pending;
  }
  public get emailInvalidError() {
    const domain = this.email.value?.split('@')[1];
    const dot: string | null | undefined = domain?.split('.')[1];
    return (
      (this.email.touched || this.formSubmitted) &&
      (this.email.hasError('email') || !domain?.includes('.') || !dot)
    );
  }

  public get emailTaken() {
    return (
      (this.email.touched || this.formSubmitted) &&
      this.email.hasError?.('emailTaken')
    );
  }

  public get emailCheckFailed() {
    return (
      (this.email.touched || this.formSubmitted) &&
      this.email.hasError?.('emailCheckFailed')
    );
  }

  public get passwordGroup() {
    return this.signUpForm.controls.passwords;
  }

  public get password() {
    return this.passwordGroup.controls.password;
  }

  public get passwordEmpty() {
    return (
      (this.password.touched || this.formSubmitted) &&
      this.password.hasError?.('required')
    );
  }

  public get passwordInsecure() {
    return (
      (this.password.touched || this.formSubmitted) &&
      this.password.hasError('notSecure')
    );
  }

  public get passwordTooShort() {
    return (
      (this.password.touched || this.formSubmitted) &&
      this.password.hasError?.('minlength')
    );
  }
  public get passwordTooLong() {
    return (
      (this.password.touched || this.formSubmitted) &&
      this.password.hasError?.('maxlength')
    );
  }

  public get repeatPassword() {
    return this.passwordGroup.controls.repeatPassword;
  }

  public get repeatPasswordEmpty() {
    return (
      (this.repeatPassword.touched || this.formSubmitted) &&
      this.repeatPassword.hasError?.('required')
    );
  }

  public get passwordInvalid() {
    return !this.password.valid;
  }

  public get passwordsMatch() {
    return this.passwordGroup.errors?.['passwordsDoNotMatch'];
  }

  onTogglePasswordHidden() {
    this.passwordVisible = !this.passwordVisible;
  }
  onToggleRepeatPasswordHidden() {
    this.repeatPasswordVisible = !this.repeatPasswordVisible;
  }

  onSubmitForm() {
    console.log('button clicked');

    if (!this.signUpForm.valid || this.emailPending) {
      this.formSubmitted = true;
      return;
    }
    this.modalActive = true;
  }

  constructor() {
    this.password.valueChanges.subscribe(() => {
      if (this.password.valid) {
        this.passwordValid.set(true);
        this.repeatPassword.enable({ emitEvent: false });
      } else {
        this.repeatPassword.disable({ emitEvent: false });
      }
    });
  }

  readonly dialog = inject(MatDialog);
  location = inject(Location);

  canDeactivate() {
    if (this.dataSaved() === true || this.signUpForm.pristine) {
      return of(true);
    }
    if (!this.signUpForm.dirty) {
      return of(true);
    }

    const dialogRef = this.dialog.open(LeavePageDialogComponent, {
      data: {
        title: 'Data Not Saved',
        message: 'are you sure you want to leave',
      },
    });
    return dialogRef.afterClosed().pipe(
      tap((confirmed) => {
        if (!confirmed) {
          this.location.go(window.location.pathname);
        }
      })
    );
  }

  onModalExit(value: any) {
    this.modalActive = value;
  }

  onDataSaved() {
    this.signUpForm.markAsPristine();
    this.dataSaved.set(true);
  }
}
