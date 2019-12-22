import { Component, OnInit } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countryname: string = '';
  currentUser: number = JSON.parse(localStorage.getItem('detectLoginUserId'));
  countryList: any[] = [];

  constructor() { }
  ngOnInit() {
    this.countryList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].country;
   }
   
   setCountry(name){
     this.countryname = name;
   }

   addToCountry(){
    let allDatabase = JSON.parse(localStorage.getItem('user_data'));
    let currentUserData = allDatabase[this.currentUser];
    let allCountry = currentUserData.country;
    
    let uid = !allCountry.id ? allCountry.length : 0;
    let obj = {id: uid + 1 ,country: this.countryname};
    allCountry.push(obj);
    allDatabase[this.currentUser].country = allCountry;
    localStorage.setItem('user_data',JSON.stringify(allDatabase));
    this.countryList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].country;
  }

  delete(index){
    let allDatabase = JSON.parse(localStorage.getItem('user_data'));
    let currentUserData = allDatabase[this.currentUser];
    let allCountry = currentUserData.country;

    allCountry.splice(index,1);
    allDatabase[this.currentUser].country = allCountry;
    localStorage.setItem('user_data',JSON.stringify(allDatabase));
    this.countryList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].country;
  }
}
