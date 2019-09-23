import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddprojectService} from '../addproject/addproject.service';
import {Project} from '../project';
import {AddtaskService} from '../addtask/addtask.service';
import {Task} from '../task';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  projectName: string;
  modalRef: BsModalRef;
  projects: Project[];
  tasks: Task[];
  searchText: any;

  @Output() taskToEdit = new EventEmitter<Task>();

  constructor(private bsModalService: BsModalService,
              private projectService: AddprojectService,
              private taskService: AddtaskService) {
  }

  ngOnInit() {
    this.projectName = '';
  }

  projectModal(searchProject: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(searchProject);
    this.projectService.fetchProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  selectedProject(proj: Project) {
    this.projectName = proj.project;
    this.taskService.getTask(proj).subscribe(tasks => this.tasks = tasks);
  }

  editTask(task: Task) {
    this.taskToEdit.emit(task);
  }

  completeTask(task: Task) {
    console.log('complete Task');
    this.taskService.completeTask(task).subscribe(tasks => this.tasks = tasks);
  }

  taskComplete(task: Task) {
    if (task.status === 'completed') {
      return true;
    } else {
      return false;
    }
  }
}
