import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/Identity/User';
import { environment } from '@environments/environment';
import { Observable,ReplaySubject, map, take } from 'rxjs';
import { DataService } from './service.service';
import { UserUpdate } from '@app/models/Identity/UserUpdate';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = environment.apiURL + 'api/account/';
  currentUserSource!: User;

  constructor(
    private http: HttpClient,
    private data: DataService,
  ) { }

  public login(model: any): Observable<void> {
    return this.http.post<User>(this.baseURL + 'login', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if(user) {
          this.data.setCurrentUser(user);
        }
      })
    );
  }

  public logout() {
    this.data.removeCurrentUser();
  }

  public register(model: any): Observable<void> {
    return this.http.post<User>(this.baseURL + 'register', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if(user) {
          this.data.setCurrentUser(user);
        }
      })
    );
  }

  public getUser(): Observable<UserUpdate> {
    return this.http.get<UserUpdate>(this.baseURL + 'getUser').pipe(take(1));
  }

  public updateUser(model: any): Observable<void> {
    return this.http.put<UserUpdate>(this.baseURL + 'updateUser', model).pipe(
      take(1),
      map((user: UserUpdate) => {
        this.data.setCurrentUser(user);
      })
    );
  }

}
