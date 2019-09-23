import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParentTask} from '../parent-task';
import {Task} from '../task';
import {Project} from '../project';

@Injectable({
  providedIn: 'root'
})
export class AddtaskService {
  private parentUrl = 'http://localhost:8081/parent';
  private taskUrl = 'http://localhost:8081/task';

  constructor(private httpClient: HttpClient) {
  }

  fetchParentTask(): Observable<ParentTask[]> {
    return this.httpClient.get<ParentTask[]>(this.parentUrl);
  }

  addParentTask(parentTask: ParentTask): Observable<ParentTask[]> {
    return this.httpClient.post<ParentTask[]>(this.parentUrl, parentTask);
  }

  addTask(task: Task): Observable<Task[]> {
    return this.httpClient.post<Task []>(this.taskUrl, task);
  }

  getTask(project: Project): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.taskUrl + '/' + project.projectId);
  }

  completeTask(task: Task): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.taskUrl + '/complete/' + task.taskId);
  }
}
