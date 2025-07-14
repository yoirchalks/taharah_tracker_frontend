// app.component.ts
import { Component, effect, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ThemeService } from './shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay'; // <-- NEW

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private renderer = inject(Renderer2);
  private themeService = inject(ThemeService);
  private overlay = inject(OverlayContainer);

  constructor() {
    this.renderer.addClass(document.body, 'mat-app-background');

    effect(() => {
      const theme = this.themeService.theme(); // signal read

      this.renderer.removeClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.addClass(document.body, `${theme}-theme`);

      const oc = this.overlay.getContainerElement().classList;
      oc.remove('light-theme', 'dark-theme');
      oc.add(`${theme}-theme`);

      document.body.style.colorScheme = theme; // ‘light’ | ‘dark’
    });
  }
}
