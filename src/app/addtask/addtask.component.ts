import { Component, OnInit } from '@angular/core';
import {Task} from '../task';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  private model: Task;

  constructor() { }

  ngOnInit() {
    this.model = new Task();
  }

  addTask() {

  }

  openProjectModal() {

  }
}
