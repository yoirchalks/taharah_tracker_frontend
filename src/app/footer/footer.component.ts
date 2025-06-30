import { Component, inject } from '@angular/core';
import { AudioService } from '../shared/services/audio.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  audio = inject(AudioService);
  track = this.audio.currentTrack.file;
  src = `music/${this.track}.mp3`;

  get isPlaying() {
    return this.audio.isPlaying();
  }

  toggleAudio() {
    this.isPlaying ? this.audio.pause() : this.audio.play();
    console.log(this.src);
  }
}
