import { Component } from '@angular/core';
import { DataService } from './Service/service.service';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from './Service/account.service';
import { User } from './models/Identity/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Plataform';

  public initials=""
  private userName = "Larissa Trindade de Araujo";

  public isExpand: boolean = true;
  public isLogin: boolean = true;

  constructor(
    public data: DataService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
    this.data.currentLogin.subscribe(login => this.isLogin = login);
    this.setCurrentUser();

    if (this.isLogin) {
      // this.router.navigate(["user/login"]);
    }

    this.getInitialsName(this.userName);

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);
  }

  getInitialsName(name: string) {
    var nameArray = name.split(' ');
    this.initials = nameArray[0].substring(0, 1).toUpperCase();

    if (nameArray.length > 1) {
      this.initials += nameArray[nameArray.length - 1].substring(0, 1).toUpperCase();
    }
  }

  changeSize() {
    this.data.changeMenuExpand(!this.isExpand);
  }

  setCurrentUser() {
    let user: User;

    if(localStorage.getItem('user')){
      user = JSON.parse(localStorage.getItem('user') ?? '{}')
    } else {
      user = JSON.parse('{}');
      this.data.removeCurrentUser();
    }

    if(user) this.data.setCurrentUser(user);
  }
}
