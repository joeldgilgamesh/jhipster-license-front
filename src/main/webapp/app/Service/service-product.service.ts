import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from 'app/model/product-service';

@Injectable({ providedIn: 'root' })
export class ServiceProductService {
  public resourceUrl = SERVER_API_URL + 'api/productservices';

  constructor(private http: HttpClient) {}

  getServiceproduit(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }
  getByIdServiceproduit(id: number): Observable<any> {
    return this.http.get(this.resourceUrl + `/${id}`);
  }
  addServiceproduit(productservice: ProductService): Observable<any> {
    return this.http.post(this.resourceUrl, productservice);
  }
  updateServiceproduit(productservice: ProductService): Observable<any> {
    return this.http.patch(this.resourceUrl, productservice);
  }

  deleteServiceproduit(id: number | undefined): Observable<any> {
    return this.http.delete(this.resourceUrl + `/${id}`);
  }
}
