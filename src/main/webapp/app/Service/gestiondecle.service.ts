import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modelmanegekey } from 'app/model/modelmanegekey';

@Injectable({
  providedIn: 'root',
})
export class GestiondecleService {
  public resourceUrl = SERVER_API_URL + 'api/activationkeys';
  constructor(private http: HttpClient) {}

  getDatagestion(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  getDataById(activationkey: number): Observable<any> {
    return this.http.get(this.resourceUrl + `/${activationkey}`);
  }

  addDatagestion(modelmanegekey: any): Observable<any> {
    return this.http.post(this.resourceUrl, modelmanegekey);
  }

  updateDatagestion(modelmanegekey: Modelmanegekey): Observable<any> {
    return this.http.patch(this.resourceUrl, modelmanegekey);
  }

  deleteKey(activationkey: any): Observable<any> {
    return this.http.delete(this.resourceUrl + `/${activationkey}`);
  }

  verificationkey(activationkey: any): Observable<any> {
    return this.http.post(this.resourceUrl, activationkey);
  }
}
