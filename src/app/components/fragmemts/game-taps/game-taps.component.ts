import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models';

@Component({
  selector: 'app-game-taps',
  templateUrl: './game-taps.component.html',
  styleUrls: ['./game-taps.component.scss']
})
export class GameTapsComponent implements OnInit {
  @Input() game?: Game

  constructor() {
    // this.game = {
    //   id: '',
    //   background_image: '',
    //   name: '',
    //   released: '',
    //   metacritic: 0,
    //   metacritic_url: '',
    //   website: '',
    //   description: '',
    //   genres: [],
    //   parent_platforms: [],
    //   publishers: [],
    //   ratings: [],
    //   screenshots: [],
    //   trailers: [],
    // }
  }

  ngOnInit(): void {
  }

}
