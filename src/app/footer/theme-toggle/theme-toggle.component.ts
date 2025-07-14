import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatSlideToggleModule],
  template: `
    <mat-slide-toggle
      [checked]="theme() === 'dark'"
      (change)="themeService.toggleTheme()"
    >
      {{ theme() }}
    </mat-slide-toggle>
  `,
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
  theme = this.themeService.theme;
}
