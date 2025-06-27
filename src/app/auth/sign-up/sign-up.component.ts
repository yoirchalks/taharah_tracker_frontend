import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators as Val,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncValidators } from '../../shared/validators/async.validators';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  asyncValidators = inject(AsyncValidators);
  disabled = true;

  signUpForm = new FormGroup({
    name: new FormControl('', [
      Val.minLength(8),
      Val.maxLength(25),
      Val.required,
    ]),
    email: new FormControl('', {
      validators: [
        Val.email,
        Val.required,
        Val.minLength(10),
        Val.maxLength(25),
      ],
      asyncValidators: [this.asyncValidators.emailUniqueValidator()],
    }),
    passwords: new FormGroup({
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
    }),
  });

  public get password() {
    return this.signUpForm.controls.passwords.controls.password;
  }
  public get email() {
    return this.signUpForm.controls.email;
  }
  public get name() {
    return this.signUpForm.controls.name;
  }
  public get repeatPassword() {
    return this.signUpForm.controls.passwords.controls.repeatPassword;
  }

  onSubmitForm() {
    console.log(this.password.value);

    this.disabled = false;
  }
}
