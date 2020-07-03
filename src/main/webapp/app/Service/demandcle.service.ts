import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemandcleService {
  public resourceUrl = SERVER_API_URL + 'api/demandecles';

  constructor(private httpClient: HttpClient) {}

  sendAskKey(modedemandecle: any): Observable<any> {
    return this.httpClient.post(this.resourceUrl, modedemandecle);
  }
}
