import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductservice } from 'app/shared/model/productservice.model';

type EntityResponseType = HttpResponse<IProductservice>;
type EntityArrayResponseType = HttpResponse<IProductservice[]>;

@Injectable({ providedIn: 'root' })
export class ProductserviceService {
  public resourceUrl = SERVER_API_URL + 'api/productservices';

  constructor(protected http: HttpClient) {}

  create(productservice: IProductservice): Observable<EntityResponseType> {
    return this.http.post<IProductservice>(this.resourceUrl, productservice, { observe: 'response' });
  }

  update(productservice: IProductservice): Observable<EntityResponseType> {
    return this.http.put<IProductservice>(this.resourceUrl, productservice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductservice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductservice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
