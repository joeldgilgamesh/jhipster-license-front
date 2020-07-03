import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ProductserviceComponent } from 'app/entities/productservice/productservice.component';
import { ProductserviceService } from 'app/entities/productservice/productservice.service';
import { Productservice } from 'app/shared/model/productservice.model';

describe('Component Tests', () => {
  describe('Productservice Management Component', () => {
    let comp: ProductserviceComponent;
    let fixture: ComponentFixture<ProductserviceComponent>;
    let service: ProductserviceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductserviceComponent],
      })
        .overrideTemplate(ProductserviceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductserviceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductserviceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Productservice(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productservices && comp.productservices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
