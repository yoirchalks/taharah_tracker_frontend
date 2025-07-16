import { Component, inject } from '@angular/core';
import { AudioService } from '../shared/services/audio.service';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-footer',
  imports: [ThemeToggleComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  audio = inject(AudioService);

  get isPlaying() {
    return this.audio.isPlaying();
  }

  toggleAudio() {
    this.isPlaying ? this.audio.pause() : this.audio.play();
  }

  prevAudio() {
    console.log('called');

    this.audio.previousTrack();
  }

  nextTrack() {
    this.audio.nextTrack();
  }
}
