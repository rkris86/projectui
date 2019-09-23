import {Component, Input} from '@angular/core';
import {Task} from './task';

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
  viewTask = false;
  editTask: Task;
  openProject() {
    this.addProject = true;
    this.addUser = false;
    this.addTask = false;
    this.viewTask = false;
  }

  openTask() {
    this.addProject = false;
    this.addUser = false;
    this.addTask = true;
    this.viewTask = false;
  }

  openUser() {
    this.addUser = true;
    this.addProject = false;
    this.addTask = false;
    this.viewTask = false;
  }

  viewTaskWindow() {
    this.addUser = false;
    this.addProject = false;
    this.addTask = false;
    this.viewTask = true;
  }

  editTaskClicked(task: Task) {
    console.log(task.task);
    this.editTask = task;
    this.openTask();
  }
}
