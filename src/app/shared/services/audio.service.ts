import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();

  tracks = [{ id: 1, name: 'water sounds', file: '01-waterSounds' }];

  currentTrack = this.tracks[0];

  constructor() {
    this.loadCurrent();
  }

  private loadCurrent() {
    this.audio.src = `assets/music/${this.currentTrack.file}`;
    this.audio.loop = true;
  }

  play() {
    this.audio.play().catch((err) => console.warn('Autoplay blocked', err));
  }

  pause() {
    this.audio.pause();
  }

  switchTrack(track: (typeof this.tracks)[0]) {
    this.currentTrack = track;
    this.loadCurrent();
    this.play();
  }
}
