import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators as Val,
} from '@angular/forms';
import { AsyncValidators } from '../../shared/validators/async.validators';
import { passwordRequirements } from '../../shared/validators/sync.validators';
import { MatTabGroup } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LoginService } from './login.service';
import { UsersService } from '../../shared/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, MatButtonToggleModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  asyncValidators = inject(AsyncValidators);
  passwordVisible = false;
  formSubmitted = false;
  passwordValid = signal(false);
  router = inject(Router);

  logInService = inject(UsersService);
  route = inject(ActivatedRoute);

  method = signal<'password' | 'otp'>('password');

  signUpForm = new FormGroup({
    email: new FormControl('', {
      validators: [Val.email, Val.required],
      asyncValidators: [this.asyncValidators.emailInUse()],
      updateOn: 'blur',
    }),
    password: new FormControl('', [
      Val.minLength(8),
      Val.maxLength(25),
      Val.required,
      passwordRequirements,
    ]),
  });

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

  public get emailNotFound() {
    return (
      (this.email.touched || this.formSubmitted) &&
      this.email.hasError?.('emailNotInUse')
    );
  }

  public get emailCheckFailed() {
    return (
      (this.email.touched || this.formSubmitted) &&
      this.email.hasError?.('emailCheckFailed')
    );
  }

  public get password() {
    return this.signUpForm.controls.password;
  }

  public get passwordEmpty() {
    return (
      (this.password.touched || this.formSubmitted) &&
      this.password.hasError?.('required')
    );
  }

  public get passwordInvalid() {
    return !this.password.valid;
  }

  onTogglePasswordHidden() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmitForm() {
    if (!this.signUpForm.valid || this.emailPending) {
      this.formSubmitted = true;
      return;
    }

    const email = this.email.value as string;

    if (this.method() === 'password') {
      const password = this.password.value as string;
      this.logInService
        .logIn({ email, password, requestingOtp: false })
        .subscribe({
          next: () =>
            this.router.navigate(['../../home'], { relativeTo: this.route }), //TODO: add navigate here
          error: (err) => alert(err),
        });
    } else {
      this.logInService.logIn({ email, requestingOtp: true }).subscribe({
        next: (data: any) => {
          const { userId, otpId } = data;
          this.router.navigate(['../otp'], {
            relativeTo: this.route,
            state: { otpId, userId },
          });
        },
        error: (err) => alert(err),
      });
    }
  }
}
