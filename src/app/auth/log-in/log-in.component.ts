import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-log-in',
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  signInMethod = signal<'password' | 'otp'>('password');

  form = new FormGroup({
    email: new FormControl({}),
    password: new FormControl({}),
  });

  get password() {
    return this.form.controls.password;
  }

  get email() {
    return this.form.controls.email;
  }

  onSubmit() {}
}
