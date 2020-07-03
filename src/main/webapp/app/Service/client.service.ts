import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { User } from 'app/model/user';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public ressourceUrl = SERVER_API_URL + 'api/clients';

  constructor(private http: HttpClient) {}

  getClientList(): Observable<any> {
    return this.http.get(this.ressourceUrl);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(this.ressourceUrl + `/${id}`);
  }
  addUser(client: User): Observable<any> {
    return this.http.post(this.ressourceUrl, client);
  }
  updateUser(client: User): Observable<any> {
    return this.http.patch(this.ressourceUrl, client);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.ressourceUrl + `/${id}`);
  }
}
