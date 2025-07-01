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

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  asyncValidators = inject(AsyncValidators);
  passwordVisible = false;
  repeatPasswordVisible = false;
  formSubmitted = false;
  modalActive = false;
  passwordValid = signal(false);

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
          //   [
          //   Val.minLength(8),
          //   Val.maxLength(25),
          //   Val.required,
          //   passwordRequirements,
          // ]
          {
            validators: [Val.required],
            updateOn: 'blur',
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
    return (
      (this.email.touched || this.formSubmitted) &&
      (this.email.hasError('email') || !domain?.includes('.'))
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
  } //TODO: work out why onsubmit is being triggered when press toggle repeat password
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
}
