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
    this.pause();
    let index = this.tracks.findIndex((t) => t.id === this.currentTrack.id);
    index = (index + 1) % this.tracks.length;
    this.currentTrack = this.tracks[index];
    this.loadCurrent();
    this.play();
  }

  previousTrack() {
    this.pause();
    let index = this.tracks.findIndex((t) => t.id === this.currentTrack.id);
    index = (index - 1 + this.tracks.length) % this.tracks.length;
    this.currentTrack = this.tracks[index];
    this.loadCurrent();
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
