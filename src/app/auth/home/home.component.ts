import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../shared/services/audio.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  texts = [
    {
      title: 'Welcome to a space of calm and security.',
      text: `'3544011fd57b329b34b73c6cb08dc4a8f...' Do you know what this says?  We don't either. This is what your personal details look like after you enter them into our system. With industry level encryption, your personal data is guaranteed safe with us`,
    },
    {
      title: 'Track with confidence and clarity.',
      text: '',
    },
    {
      title: 'Stay connected no matter where.',
      text: '',
    },
  ];
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
