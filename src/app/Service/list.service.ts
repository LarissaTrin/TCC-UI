import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListIn } from '@app/models/Interface/listIn';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  baseURL = environment.apiURL + 'api/list';

  constructor(private http: HttpClient) {}

  public getListByProjectId(projectId: number): Observable<ListIn[]> {
    return this.http
      .get<ListIn[]>(`${this.baseURL}/${projectId}`)
      .pipe(take(1));
  }

  public saveList(projectId: number, lists: ListIn[]): Observable<ListIn[]> {
    return this.http
      .put<ListIn[]>(`${this.baseURL}/${projectId}`, lists)
      .pipe(take(1));
  }

  public delete(projectId: number, listId: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${projectId}/${listId}`)
      .pipe(take(1));
  }
}
