import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Project} from '../project';

@Injectable({
  providedIn: 'root'
})
export class AddprojectService {
  fetchProjectUrl = 'http://localhost:8080/project';

  constructor(private httpClient: HttpClient) {
  }

  fetchProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.fetchProjectUrl);
  }

  addProject(project: Project): Observable<Project[]> {
    return this.httpClient.post<Project[]>(this.fetchProjectUrl, project);
  }
}
