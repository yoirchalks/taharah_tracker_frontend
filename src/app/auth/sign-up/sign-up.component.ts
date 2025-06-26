import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators as Val,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    name: new FormControl('', [
      Val.minLength(8),
      Val.maxLength(25),
      Val.required,
    ]),
    email: new FormControl('', [
      Val.email,
      Val.required,
      Val.minLength(10),
      Val.maxLength(25),
    ]),
    password: new FormControl('', [
      Val.minLength(8),
      Val.maxLength(25),
      Val.required,
    ]),
  });
}
