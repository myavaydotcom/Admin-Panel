import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status: any[] = ['primary', 'danger'];
  email: string = '';
  password: string = '';
  index : number = 0;

  constructor(private _router: Router,private loginservice: LoginService) { }
  ngOnInit() { }

  onSubmit() {
    let getRegisterUser = localStorage.getItem('user_data') !== null ? JSON.parse(localStorage.getItem('user_data')) : [];
    if (getRegisterUser.length > 0) {
      this.index = getRegisterUser.findIndex(value => {
        return value.email === this.email &&
          value.password === this.password;
      });
    } else {
      this.index = -1;
    }
    if (this.index > -1) {
      this.loginservice.login();
      let setCurrentUser = this.index;
      localStorage.setItem('detectLoginUserId', JSON.stringify(setCurrentUser));
      this._router.navigate(['homepage']);
    } else {
      alert('Please Enter right information');
    }
  }

  goSignUp(){
    this._router.navigate(['/signup']);
  }
}
