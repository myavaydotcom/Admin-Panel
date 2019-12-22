import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  sidebar: boolean = true;
  openUser: boolean = false;
  openCountry: boolean = false;
  openCity: boolean = false;
  currentUser: number = JSON.parse(localStorage.getItem('detectLoginUserId'));
  profileImage: string = '';
  username: string = '';

  constructor(private _router : Router) { }

  ngOnInit() {
    //if(!this.currentUser){
     //  this._router.navigate(['login']);
    //   alert('oops You Accidently came here');
   // }

    this.profileImage = !!JSON.parse(localStorage.getItem('user_data'))[this.currentUser].profilePic ? JSON.parse(localStorage.getItem('user_data'))[this.currentUser].profilePic : '';
    this.username = !!JSON.parse(localStorage.getItem('user_data'))[this.currentUser].username ? JSON.parse(localStorage.getItem('user_data'))[this.currentUser].username : 'Jhone Doe';
  }

  sideBar() {
    this.sidebar = !this.sidebar;
  }

  user(){
    this.openUser = true;
    this.openCountry = false;
    this.openCity = false;
  }

  country(){
    this.openCountry = true;
    this.openUser = false;
    this.openCity = false;
  }

  city(){
    this.openCity = true;
    this.openUser = false;
    this.openCountry = false;
  }

  logOut() {
    let isLogOut = confirm('are you sure logout?');
        if(isLogOut){
             localStorage.removeItem('isLoggedIn');   
             localStorage.removeItem('detectLoginUserId');
             this._router.navigate(['login']);
        }
     }
}
