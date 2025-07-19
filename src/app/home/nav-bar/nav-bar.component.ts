import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIcon, RouterLink, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  router = inject(Router);
  onLogOut() {
    const confirm = window.confirm('Are you sure you want to log out?');
    if (!confirm) return;
    this.router.navigate(['/']);
  }
}
