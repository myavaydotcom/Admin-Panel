import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == 'true') {
      // if we return true user is allowed to access that route
      return true;
    } else {
      this.router.navigate(['login']);
      // if we return false user is not allowed to access
      return false;
    }
  }
}