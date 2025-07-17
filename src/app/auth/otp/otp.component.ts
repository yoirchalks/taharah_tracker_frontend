import { Component, inject, signal, ViewChild } from '@angular/core';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { LoginService } from '../log-in/login.service';
@Component({
  selector: 'app-otp',
  imports: [NgOtpInputModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  @ViewChild(NgOtpInputComponent) otpInput!: NgOtpInputComponent;

  loginService = inject(LoginService);

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
    this.loginService.submitOtp({ OTP: otp }).subscribe({
      next: () => {},
      error: (err) => alert(err),
    });
  }
}
