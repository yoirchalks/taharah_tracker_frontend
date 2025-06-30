import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../shared/services/audio.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  audio = inject(AudioService);
  isPlaying: boolean = false;
  ngOnInit(): void {
    this.isPlaying = this.audio.isPlaying();
  }
  onClick() {
    if (!this.isPlaying) {
      this.audio.play();
    }
  }
}
