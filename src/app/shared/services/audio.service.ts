import { Injectable } from '@angular/core';

interface Track {
  id: number;
  name: string;
  file: string;
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();

  tracks: Track[] = [
    { id: 1, name: 'water sounds', file: '01-waterSounds' },
    { id: 2, name: 'le onde', file: 'leOnde' },
  ];

  currentTrack = this.tracks[0];

  constructor() {
    this.loadCurrent();
  }

  private loadCurrent() {
    this.audio.src = `music/${this.currentTrack.file}.ogg`;
    this.audio.loop = true;
  }

  play() {
    this.audio.play().catch((err) => console.warn(err));
  }

  pause() {
    this.audio.pause();
  }

  nextTrack() {
    let index = this.currentTrack.id++;
    if (index === this.tracks.length) {
      index = 0;
    }
    this.currentTrack = this.tracks[index];
    this.audio.src = `music/${this.currentTrack.file}/ogg`;
    this.audio.loop = true;
    this.play();
  }

  switchTrack(track: Track) {
    this.currentTrack = track;
    this.loadCurrent();
    this.play();
  }

  isPlaying() {
    return !this.audio.paused;
  }
}
