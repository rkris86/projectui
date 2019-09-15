import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdduserService {
  addUserUrl = 'http://localhost:8080/user';

  constructor(private httpClient: HttpClient) {
  }

  addUser(user: User): Observable<User[]> {
    return this.httpClient.post<User[]>(this.addUserUrl, user);
  }
  fetchUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.addUserUrl);
  }
  deletUser(user: User): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: user
    };
    return this.httpClient.delete<User[]>(this.addUserUrl, httpOptions);
  }
}
