import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectUserIn } from '@app/models/Interface/projectUserIn';
import { UserIn } from '@app/models/Interface/userIn';
import { PaginatedResult } from '@app/models/Pagination';
import { environment } from '@environments/environment';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService {

  baseURL = environment.apiURL + 'api/ProjectUser';

  constructor(private http: HttpClient) {}

  public GetAllUsersAsync(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<UserIn[]>> {
    const paginatedResult: PaginatedResult<UserIn[]> = new PaginatedResult<UserIn[]>();

    let params = new HttpParams;
    if (page !== undefined && itemsPerPage !== undefined) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '') params = params.append('term', term);

    return this.http
      .get<UserIn[]>(this.baseURL + '/all', {observe: 'response', params})
      .pipe(
        take(1),
        map((response) => {
          if (response.body !== null) {
            paginatedResult.result = response.body;
          }
          if (response.headers.has('Pagination')) {
            const paginationHeader = response.headers.get('Pagination');
            if (paginationHeader) {
              paginatedResult.pagination = JSON.parse(paginationHeader);
            }
          }
          return paginatedResult;
        })
      );
  }

  public GetUsersByEditAsync(projectId?: number, page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<UserIn[]>> {
    const paginatedResult: PaginatedResult<UserIn[]> = new PaginatedResult<UserIn[]>();

    let params = new HttpParams;
    if (page !== undefined && itemsPerPage !== undefined) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '') params = params.append('term', term);

    return this.http
      .get<UserIn[]>(`${this.baseURL}/${projectId}`, {observe: 'response', params})
      .pipe(
        take(1),
        map((response) => {
          if (response.body !== null) {
            paginatedResult.result = response.body;
          }
          if (response.headers.has('Pagination')) {
            const paginationHeader = response.headers.get('Pagination');
            if (paginationHeader) {
              paginatedResult.pagination = JSON.parse(paginationHeader);
            }
          }
          return paginatedResult;
        })
      );
  }

  public saveUsersByProject(projectId: number, userList: ProjectUserIn[]): Observable<ProjectUserIn[]> {
    console.log('test')
    return this.http
      .put<ProjectUserIn[]>(`${this.baseURL}/${projectId}`, userList)
      .pipe(take(1));
  }
}
