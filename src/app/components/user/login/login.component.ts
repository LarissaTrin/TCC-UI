import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/Service/account.service';
import { UserLogin } from '@app/models/Identity/UserLogin';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public model: UserLogin = new UserLogin;

  constructor(
    private data: DataService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.data.changeIsLogin(true);
  }

  login() {
    this.accountService.login(this.model).subscribe(
      () => {
        this.router.navigateByUrl('home');
      },
      (error: any) => {
        if(error.status === 401) this.toastr.error('User or Password is invalid');
        else console.log(error);
      }
    );
  }
}
