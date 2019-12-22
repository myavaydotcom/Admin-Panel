import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  username: string = '';
  email: string = '';
  age: number = 0;
  phone: number;
  currentUser: number = JSON.parse(localStorage.getItem('detectLoginUserId'));
  usersList: any[] = [];
  isEditMode: boolean = false;
  editableName: string = '';
  editableEmail: string = '';
  editablePhone: string = '';
  editableAge: string = '';

  constructor() { }

  ngOnInit() {
    this.usersList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].users;
  }
  
  add() {
    let allDatabase = JSON.parse(localStorage.getItem('user_data'));
    let currentUserData = allDatabase[this.currentUser];
    let allUsers = currentUserData.users;

    let uid = !allUsers.id ? allUsers.length : 0;
    let obj = { id: uid + 1, name: this.username, email: this.email, age: this.age, phone: this.phone };
    allUsers.push(obj);
    //now you entered new object inside users array
    allDatabase[this.currentUser].users = allUsers;
    localStorage.setItem('user_data', JSON.stringify(allDatabase));
    this.usersList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].users;
  }

  delete(index) {
         let allDatabase = JSON.parse(localStorage.getItem('user_data'));
         let currentUserData = allDatabase[this.currentUser];
         let allUsers = currentUserData.users;
         allUsers.splice(index,1);
         allDatabase[this.currentUser].users = allUsers;
         localStorage.setItem('user_data', JSON.stringify(allDatabase));
         this.usersList = JSON.parse(localStorage.getItem('user_data'))[this.currentUser].users;
  }

  edit(index){
     this.isEditMode = true;
  }
  
  editName(name){
       this.editableName = name;
  }

  editEmail(email){
       this.editableEmail = email;
  }

  editPhone(phone){
      this.editablePhone = phone;
  }

  editAge(age){
      this.editableAge = age;
  }

  update(index){
    this.isEditMode = false;
  }

}
