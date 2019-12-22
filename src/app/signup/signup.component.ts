import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  profilePic: string = '';
  getValue: any;
  index: number = 0;
  emailValidationError: boolean = false;
  passwordValidationError: boolean = false;
  confirmPasswordError: boolean = false;

  constructor(private _router: Router,private loginservice: LoginService) { }

  validateEmail(inputEmail) {
    var patt = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    let check = inputEmail.match(patt);
    if (!check) {
      this.emailValidationError = true;
    } else {
      this.emailValidationError = false;
      this.email = inputEmail;
    }
  }
  
  profileImage(url){
     this.profilePic = url;
  }

  onSubmit() {
    if (this.username && this.email && this.password === this.confirmPassword) {
      let obj = { id: 1, email: this.email, username: this.username, password: this.confirmPassword, profilePic: this.profilePic, users : [], country : [], city : []};
      this.getValue = localStorage.getItem('user_data') !== null ? JSON.parse(localStorage.getItem('user_data')) : [];
      if (this.getValue.length > 0) {
        this.index = this.getValue.findIndex(value => {
          return value.email === this.email &&
            value.password === this.confirmPassword;
        });
      } else {
        this.index = -1;
      }
      if (!(this.index > -1)) {
        if (!this.getValue.length) {
          let arr = [];
          arr.push(obj);
          localStorage.setItem('user_data', JSON.stringify(arr));
        } else {
          obj.id = this.getValue.length + 1;
          this.getValue.push(obj);
          localStorage.setItem('user_data', JSON.stringify(this.getValue));
        }
        alert('User have been created!');
        this.loginservice.login();
        let setCurrentUser = !!localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')).length-1 : 0;
        localStorage.setItem('detectLoginUserId', JSON.stringify(setCurrentUser));
        this._router.navigate(['/homepage']);
      } else {
        alert('User is already exist!');
      }
    } else {
      alert('Some thing went wrong !');
    }
  }

   goLogIn(){
     this._router.navigate(['/login']);
   }

}
