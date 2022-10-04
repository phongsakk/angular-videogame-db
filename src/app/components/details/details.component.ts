import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Game } from 'src/models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0
  gameId: string = ''
  game?: Game
  routeSub?: Subscription
  gameSub?: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }
  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe()
    if (this.gameSub) this.gameSub.unsubscribe()
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.gameId = params['id']
      this.getGameDetails(this.gameId)
    })
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432'
    } else if (value > 50) {
      return '#fffa50'
    } else if (value > 30) {
      return '#f7aa38'
    } else {
      return '#ef4655'
    }
  }

  getGameDetails(id: string) {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe(gameResp => {
        this.game = gameResp
        setTimeout(() => {
          if (this.game) this.gameRating = this.game.metacritic
        }, 1000);
      })
  }
}
