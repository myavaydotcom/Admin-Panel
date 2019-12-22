import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  countryList: any[] = [];
  selectedCountry: any = '';
  cityList: any[] = [];
  cityname: string = '';
  pincode: number = 0;
  currentUser: number = JSON.parse(localStorage.getItem('detectLoginUserId'));
  isCountryAvailable: boolean = true;

  constructor() { }
   
  ngOnInit() {
    //for dropdown countryList
    this.countryList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].country;
    this.cityList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].city;
    this.isCountryAvailable = !!this.countryList.length;
  }

  selectCountry(country){
    this.selectedCountry = country;
  }

  add(){
    let allDatabase = JSON.parse(localStorage.getItem('user_data'));
    let currentUserData = allDatabase[this.currentUser];
    let allCity = currentUserData.city;

    let uid = !allCity.id ? allCity.length : 0;
    let obj = { id : uid + 1 , name : this.cityname , pincode : this.pincode , country : this.selectedCountry };
    allCity.push(obj);
    allDatabase[this.currentUser].city = allCity;
    localStorage.setItem('user_data',JSON.stringify(allDatabase));
    
    this.cityList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].city;
    this.countryList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].country;
  }
  
  delete(index){
    let allDatabase = JSON.parse(localStorage.getItem('user_data'));
    let currentUserData = allDatabase[this.currentUser];
    let allCity = currentUserData.city;
    
    allCity.splice(index,1);
    allDatabase[this.currentUser].city = allCity;
    localStorage.setItem('user_data',JSON.stringify(allDatabase));
    
    this.cityList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].city;
    this.countryList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].country;
  }

}
