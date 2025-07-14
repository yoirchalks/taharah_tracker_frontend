import { Component, output, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatSlideToggleModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  isDark = false;
  themeChange = output<'dark' | 'light'>();

  onToggle() {
    this.isDark = !this.isDark;
    this.themeChange.emit(this.isDark ? 'dark' : 'light');
  }
}
