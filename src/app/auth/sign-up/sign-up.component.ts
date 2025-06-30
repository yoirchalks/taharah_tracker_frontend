import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators as Val,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncValidators } from '../../shared/validators/async.validators';
import { passwordsMatch } from '../../shared/validators/sync.validators';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  asyncValidators = inject(AsyncValidators);
  disabled = true;
  modalActive = false;

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
        ]),
        repeatPassword: new FormControl('', [
          Val.minLength(8),
          Val.maxLength(25),
          Val.required,
        ]),
      },
      { validators: [passwordsMatch], updateOn: 'blur' }
    ),
  });

  public get name() {
    return this.signUpForm.controls.name;
  }
  public get nameEmpty() {
    return this.name.touched && !this.name.value;
  }
  public get nameShort() {
    return this.name.touched && this.name.hasError?.('minlength');
  }
  public get nameLong() {
    return this.name.touched && this.name.hasError('maxlength');
  }

  public get passwordGroup() {
    return this.signUpForm.controls.passwords;
  }

  public get password() {
    return this.passwordGroup.controls.password;
  }

  public get repeatPassword() {
    return this.passwordGroup.controls.repeatPassword;
  }

  public get email() {
    return this.signUpForm.controls.email;
  }

  public get emailRequiredError() {
    return this.email.touched && this.email.hasError('required');
  }
  public get emailInvalidError() {
    const domain = this.email.value?.split('@')[1];

    return (
      this.email.touched &&
      (this.email.hasError('email') || !domain?.includes('.'))
    );
  }

  public get emailEmpty() {
    return this.email.touched && !this.email.value;
  }

  public get passwordEmpty() {
    return this.password.touched && !this.password.value;
  }

  public get repeatPasswordEmpty() {
    return (
      this.repeatPassword.touched &&
      !this.repeatPassword.value &&
      this.password.valid
    );
  }

  public get passwordsMatch() {
    return this.passwordGroup.errors?.['passwordsDoNotMatch'];
  }

  onSubmitForm() {
    this.modalActive = true;
  }
}
