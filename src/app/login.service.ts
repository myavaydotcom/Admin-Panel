import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {}

    login() {
        localStorage.setItem('isLoggedIn', 'true');
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
    }
}