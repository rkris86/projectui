import {Component, OnInit, TemplateRef} from '@angular/core';
import {Project} from '../project';
import {User} from '../user';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddprojectService} from './addproject.service';
import {AdduserService} from '../adduser/adduser.service';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  private projects: Project[];
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  constructor(private modalService: BsModalService, private addService: AddprojectService, private userService: AdduserService) {
  } // {2}
  model: Project;
  datechecked: boolean;
  edit: false;
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
  }

  addProject() {
    this.addService.addProject(this.model).subscribe(projects => {
      this.model = new Project();
      this.projects = projects;
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
    console.log('Ok clicked');
    this.model.user = user;
    this.managerName = user.firstName + ' ' + user.lastName ;
  }
}
