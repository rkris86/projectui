import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Task} from '../task';
import {ParentTask} from '../parent-task';
import {AddtaskService} from './addtask.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddprojectService} from '../addproject/addproject.service';
import {AdduserService} from '../adduser/adduser.service';
import {Project} from '../project';
import {User} from '../user';
import {NgForm} from '@angular/forms';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  private model: Task;
  parentChecked: boolean;
  userName: string;
  edit: boolean;
  private parentTask: ParentTask;
  modalRef: BsModalRef;
  searchText: any;
  private projects: Project[];
  private users: User[];
  private parentTasks: ParentTask[];
  private tasks: Task[];
  private projectName: string;
  private parentName: string;
  private today: Date;
  private tomorrow: Date;

  private projectSelected: boolean;
  private userSelected: boolean;
  @Input() taskToEdit: Task;

  constructor(private taskService: AddtaskService,
              private bsModalService: BsModalService,
              private projectService: AddprojectService,
              private userService: AdduserService) {
  }

  ngOnInit() {
    this.edit = false;
    this.model = new Task();
    this.model.priority = 0;
    this.userName = '';
    this.projectName = '';
    this.parentName = '';
    this.parentChecked = false;
    this.setDates();
    if (this.taskToEdit !== undefined) {
      this.edit = true;
      this.model = this.taskToEdit;
      this.projectName = this.model.project.project;

      this.userName = this.model.user !== null ? this.model.user.firstName : '';
      this.parentName = this.model.parentTask !== null ? this.model.parentTask.parentTask : '';
    }
    this.projectSelected = false;
    this.userSelected = false;

  }

  setDates() {
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.model.startDate = new DatePipe('en-US').transform(this.today, 'yyyy-MM-dd');
    this.model.endDate = new DatePipe('en-US').transform(this.tomorrow, 'yyyy-MM-dd');
  }

  addTask(addTaskForm: NgForm) {
    console.log('Add Task clicked');
    console.log(addTaskForm.form.valid);
    if (addTaskForm.form.valid) {
      if (this.parentChecked) {
        this.parentTask = new ParentTask();
        this.parentTask.parentTask = this.model.task;
        this.taskService.addParentTask(this.parentTask).subscribe(parents => {
          this.model = new Task();
        });
      } else {
        this.taskService.addTask(this.model).subscribe(tasks => {
          this.tasks = tasks;
        });
      }
    }

  }

  openProjectModal(searchProject: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(searchProject);
    this.projectService.fetchProjects().subscribe(projects => {
      this.projects = projects;
    });

  }

  openParentModal(searchParent: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(searchParent);
    this.taskService.fetchParentTask().subscribe(parentTasks => {
      this.parentTasks = parentTasks;
    });
  }

  openUserModal(userSearch: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(userSearch);
    this.userService.fetchUsers().subscribe(users => (this.users = users));
  }

  reset() {

  }

  selectedProject(project: Project) {
    this.model.project = project;
    this.projectName = project.project;
    this.projectSelected = true;
  }

  selectedUser(user: User) {
    this.model.user = user;
    this.userName = user.firstName;
    this.userSelected = true;
  }

  selectedParent(parentTask: ParentTask) {
    this.model.parentTask = parentTask;
    this.parentName = parentTask.parentTask;
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
