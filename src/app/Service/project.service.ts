import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectListIn } from '../models/Interface/projectListIn';
import { Observable, take } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable()
export class ProjectService {
  baseURL = environment.apiURL + 'api/project';

  constructor(private http: HttpClient) {}

  public getProjects(): Observable<ProjectListIn[]> {
    return this.http
      .get<ProjectListIn[]>(this.baseURL)
      .pipe(take(1));
  }

  public getProjectById(id: number): Observable<ProjectListIn> {
    return this.http
      .get<ProjectListIn>(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  public post(project: ProjectListIn): Observable<ProjectListIn> {
    return this.http
      .post<ProjectListIn>(this.baseURL, project)
      .pipe(take(1));
  }

  public put(project: ProjectListIn): Observable<ProjectListIn> {
    return this.http
      .put<ProjectListIn>(`${this.baseURL}/${project.id}`, project)
      .pipe(take(1));
  }

  public delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }
}
