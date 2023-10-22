import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardIn } from '@app/models/Interface/cardIn';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseURL = environment.apiURL + 'api/card';

  constructor(private http: HttpClient) {}

  public getCardByListId(listId: number): Observable<CardIn[]> {
    return this.http
      .get<CardIn[]>(`${this.baseURL}/${listId}`)
      .pipe(take(1));
  }

  public getCardById(listId: number, cardId?: number): Observable<CardIn> {
    return this.http
      .get<CardIn>(`${this.baseURL}/${listId}/${cardId}`)
      .pipe(take(1));
  }

  public postCard(listId: number, card: CardIn): Observable<CardIn> {
    return this.http
      .post<CardIn>(`${this.baseURL}/${listId}`, card)
      .pipe(take(1));
  }

  public putCard(cardId: number, card: CardIn): Observable<CardIn> {
    return this.http
      .put<CardIn>(`${this.baseURL}/${cardId}`, card)
      .pipe(take(1));
  }

  public delete(listId: number, cardId: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${listId}/${cardId}`)
      .pipe(take(1));
  }

}
