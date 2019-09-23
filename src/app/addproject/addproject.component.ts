import {Component, OnInit, TemplateRef} from '@angular/core';
import {Project} from '../project';
import {User} from '../user';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddprojectService} from './addproject.service';
import {AdduserService} from '../adduser/adduser.service';
import {ProjectResponse} from '../project-response';
import {DatePipe} from '@angular/common';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  private projects: ProjectResponse[];
  private managerSelected: boolean;
  private today: any;
  private tomorrow: Date;
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  constructor(private modalService: BsModalService, private addService: AddprojectService, private userService: AdduserService) {
  }
  model: Project;
  datechecked: boolean;
  edit: boolean;
  modalRef: BsModalRef;
  users: User[];
  searchText: any;
  managerName: any;
  ngOnInit() {
    this.edit = false;
    this.model = new Project();
    this.model.priority = 0;
    this.datechecked = false;
    this.fetchProjects();
    this.managerName = '';
    this.managerSelected = false;

  }

  addProject(addProjectForm: NgForm) {
    console.log('In add Project');
    this.addService.addProject(this.model).subscribe(projects => {
      this.model = new Project();
      this.projects = projects;
      addProjectForm.reset();
    });
  }

  reset() {
    this.model = new Project();
  }

  public searchManagers(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.userService.fetchUsers().subscribe(users => (this.users = users ));
  }

  private fetchProjects() {
    this.addService.fetchProjects().subscribe(projects => (this.projects = projects));
  }

  selectedManager(user: User) {
    // console.log('Ok clicked');
    this.model.user = user.userId;
    this.managerName = user.firstName + ' ' + user.lastName ;
    this.managerSelected = true;
  }

  updateProject(project: ProjectResponse) {
    this.edit = true;
    this.model.project = project.project;
    this.model.projectId = project.projectId;
    this.model.priority = project.projectId;
    this.model.user = project.user;
    this.managerName = project.managerName;
    this.model.startDate = project.startDate;
    this.model.endDate = project.endDate;

  }

  suspendProject(project: ProjectResponse) {
    this.addService.deleteProject(project).subscribe(projects => {
      this.projects = projects;
    });
  }

  startSelected() {
    //console.log('on selected');
    if (!this.datechecked) {
      this.datechecked = true;
      this.today = new Date();
      this.tomorrow = new Date();
      this.tomorrow.setDate(this.today.getDate() + 1);
      this.model.startDate = new DatePipe('en-US').transform(this.today, 'yyyy-MM-dd');
      this.model.endDate = new DatePipe('en-US').transform(this.tomorrow, 'yyyy-MM-dd');
    } else {
      this.datechecked = false;
      this.model.startDate = null;
      this.model.endDate = null;
    }
  }
}
