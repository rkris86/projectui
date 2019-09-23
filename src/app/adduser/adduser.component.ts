import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {AdduserService} from './adduser.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  private model: User;
  private users: User[];
  edit = false;
  searchText: any;

  constructor(private userService: AdduserService) {
  }

  ngOnInit() {
    this.edit = false;
    this.model = new User();
    this.fetchUsers();
  }

  onSubmit(adduserForm: NgForm) {
    this.userService.addUser(this.model).subscribe(users => {
      this.model = new User();
      this.users = users;
      adduserForm.reset();
    } );
  }

  reset() {
    this.model = new User();
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  fetchUsers() {
    this.userService.fetchUsers().subscribe(users => (this.users = users));
  }

  editUser(user: User) {
    this.model = user;
    this.edit = true;
    console.log(user);
  }

  deleteUser(user: User) {
    this.userService.deletUser(user).subscribe(users => {
      this.users = users;
    });
  }

  sortFirstName() {
    this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  sortLastName() {
    this.users.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  sortEmployeeId() {
    this.users.sort((a, b) => b.employeeId - a.employeeId );
  }
}
