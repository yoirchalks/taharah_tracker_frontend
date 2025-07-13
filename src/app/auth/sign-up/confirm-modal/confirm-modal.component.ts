import { Component, inject, input } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-modal',
  imports: [ModalComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  userService = inject(UsersService);
  router = inject(Router);
  name = input.required<string>();
  email = input.required<string>();
  password = input.required<string>();

  onConfirm() {
    this.userService
      .postNewUser({
        name: this.name(),
        email: this.email(),
        password: this.password(),
      })
      .subscribe({
        next: () => this.router.navigate(['auth/logIn']),
        error: (err) => alert(err),
      });
  }
}
