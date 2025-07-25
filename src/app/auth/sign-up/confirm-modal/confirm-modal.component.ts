import { Component, inject, input, OnDestroy, output } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';
import { ClickOutDirective } from '../../../shared/click-out.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  imports: [ModalComponent, ClickOutDirective],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  userService = inject(UsersService);
  router = inject(Router);

  name = input.required<string>();
  email = input.required<string>();
  password = input.required<string>();

  exitModal = output<boolean>();
  dataSaved = output<void>();

  onConfirm() {
    this.userService
      .postNewUser({
        name: this.name(),
        email: this.email(),
        password: this.password(),
      })
      .subscribe({
        next: () => {
          this.dataSaved.emit();
          this.router.navigate(['auth/logIn']);
        },
        error: (err) => alert(err),
      });
  }

  onExit() {
    this.exitModal.emit(true);
  }
}
