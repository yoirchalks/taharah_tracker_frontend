import { Component, input } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-confirm-modal',
  imports: [ModalComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  name = input.required();
  email = input.required();
}
