// theme.service.ts
import { Injectable, effect, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  readonly theme = this._theme.asReadonly(); // consumers read only

  toggleTheme() {
    this._theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  /** For components that just need the string once */
  get current() {
    return this._theme();
  }

  constructor() {
    // Persist every change
    effect(() => localStorage.setItem('theme', this._theme()));
  }
}
