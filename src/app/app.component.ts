import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Taharah Tracker';
  isDark = false;

  renderer = inject(Renderer2);

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'mat-app-background');
    this.renderer.addClass(document.body, 'light-theme');
  }

  toggleTheme() {
    this.isDark = !this.isDark;

    const newClass = this.isDark ? 'dark-theme' : 'light-theme';
    const oldClass = !this.isDark ? 'dark-theme' : 'light-theme';

    this.renderer.removeClass(document.body, oldClass);
    this.renderer.addClass(document.body, newClass);
  }
}
