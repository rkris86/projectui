import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectui';
  addUser = false;
  addProject = false;
  addTask = false;
  openProject() {
  this.addProject = true;
  this.addUser = false;
    this.addTask = true;
  }

  openTask() {
    this.addProject = false;
    this.addUser = false;
    this.addTask = true;

  }

  openUser() {
    this.addUser = true;
    this.addProject = false;
    this.addTask = false;
  }

  viewTask() {

  }
}
