import { Component, inject, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-leave-page-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './leave-page-dialog.component.html',
  styleUrl: './leave-page-dialog.component.scss',
})
export class LeavePageDialogComponent {
  dialogRef = inject(MatDialogRef<LeavePageDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as { title: string; message: string };
}
