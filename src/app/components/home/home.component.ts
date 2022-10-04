import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

import type { APIResponse, Game } from 'src/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = 'name'
  public games: Array<Game> = []
  private routeSub?: Subscription
  private gameSub?: Subscription

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnDestroy(): void {
    if (this.gameSub) this.gameSub.unsubscribe()
    if (this.routeSub) this.routeSub.unsubscribe()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search'])
      } else {
        this.searchGames('metacrit')
      }
    })
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results
        console.log(gameList)
      })
  }

  openGameDetails(id: string): void {
    this.router.navigate([`details`, id])
  }
}
