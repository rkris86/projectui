import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Project} from '../project';
import {ProjectResponse} from '../project-response';

@Injectable({
  providedIn: 'root'
})
export class AddprojectService {
  fetchProjectUrl = 'http://localhost:8081/project';

  constructor(private httpClient: HttpClient) {
  }

  fetchProjects(): Observable<ProjectResponse[]> {
    return this.httpClient.get<ProjectResponse[]>(this.fetchProjectUrl);
  }

  addProject(project: Project): Observable<ProjectResponse[]> {
    return this.httpClient.post<ProjectResponse[]>(this.fetchProjectUrl, project);
  }

  deleteProject(project: Project): Observable<ProjectResponse []>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: project
    };
    return this.httpClient.delete<ProjectResponse[]>(this.fetchProjectUrl, httpOptions);
  }
}
