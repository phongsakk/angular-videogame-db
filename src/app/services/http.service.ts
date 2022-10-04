import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, forkJoin, map } from "rxjs"
import { APIResponse, Game } from "src/models"
import { environment as env } from "src/environments/environment"


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering)

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    })
  }


  getGameDetails(id: string): Observable<Game & any> {
    const gameInfoRequest = this.http.get<Game>(`${env.BASE_URL}/games/${id}`)
    const gameTrailersRequest = this.http.get<any>(`${env.BASE_URL}/games/${id}/movies`)
    const gameScreenshotsRequest = this.http.get<any>(`${env.BASE_URL}/games/${id}/screenshots`)

    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenshotsRequest,
    }).pipe(
      map(resp => ({
        ...resp['gameInfoRequest'],
        trailers: resp['gameTrailersRequest']?.results,
        screenshots: resp['gameScreenshotsRequest']?.results,
      }))
    )
  }
}
