import { Injectable } from '@angular/core';
import { User } from '@app/models/Identity/User';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private menuExpand = new BehaviorSubject(true);
  currentMenu = this.menuExpand.asObservable();

  private login = new BehaviorSubject(true);
  currentLogin = this.login.asObservable();

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser = this.currentUserSource.asObservable();

  constructor() { }

  changeMenuExpand(isExpand: boolean){
    this.menuExpand.next(isExpand);
  }

  changeIsLogin(isLogin: boolean){
    this.login.next(isLogin);
  }

  public setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    this.login.next(false);
  }

  public removeCurrentUser() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null as any);
    this.currentUserSource.complete();
  }
}
