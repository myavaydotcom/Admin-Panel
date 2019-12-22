import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
//import { CountryComponent } from './country/country.component';
//import { CityComponent } from './city/city.component';
import { ErrorComponent } from './error/error.component';
//import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
       path : "",
       component : LoginComponent
    },
    {
       path : "signup",
       component : SignupComponent
    },
    {
      path : "login",
      component : LoginComponent
    },
    {
      path : "homepage",
      component : HomepageComponent,
      canActivate : [AuthGuard]
    },
    {
      path : "**",
      component : ErrorComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
