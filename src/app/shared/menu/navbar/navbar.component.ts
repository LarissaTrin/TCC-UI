import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/Service/account.service';
import { User } from '@app/models/Identity/User';
import { take } from 'rxjs';
import { DataService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() projectName: string | undefined;

  public initials=""
  public isExpand: boolean = true;
  public isLogin: boolean = true;

  constructor(
    public data: DataService,
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
    this.data.currentLogin.subscribe(login => this.isLogin = login);
    this.getInitials();
  }

  getInitials() {
    let user: User;

    if(localStorage.getItem('user')){
      user = JSON.parse(localStorage.getItem('user') ?? '{}')
      this.initials = (user.firstName.substring(0, 1) + user.lastName.substring(0, 1)).toLocaleUpperCase();
    } else {
      user = JSON.parse('{}');
    }
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('user/login')
    this.data.changeIsLogin(true);
  }

}
