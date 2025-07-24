import { Component, inject, signal, ViewChild } from '@angular/core';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { LoginService } from '../log-in/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
@Component({
  selector: 'app-otp',
  imports: [NgOtpInputModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  @ViewChild(NgOtpInputComponent) otpInput!: NgOtpInputComponent;

  route = inject(ActivatedRoute);

  userId?: string;
  otpId?: string;

  loginService = inject(UsersService);
  router = inject(Router);

  constructor() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { userId: string; otpId: string };
    this.userId = state.userId;
    this.otpId = state.otpId;
  }

  otpConfig = {
    length: 6,
    allowNumbersOnly: true,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputClass: 'otp-input',
    autoBlur: true,
  };

  onReset() {
    this.otpInput.setValue('');
  }

  onChange(otp: string) {
    if (otp.length === this.otpConfig.length) {
      this.submitOtp(parseInt(otp));
    }
  }

  submitOtp(otp: number) {
    if (this.userId && this.otpId) {
      this.loginService
        .submitOtp({ userId: this.userId, otpId: this.otpId, OTP: otp })
        .subscribe({
          next: () => {
            this.router.navigate(['../../home'], { relativeTo: this.route });
          }, //TODO: set up routes for home and add here and in login page
          error: (err) => alert(err),
        });
    }
  }
}
