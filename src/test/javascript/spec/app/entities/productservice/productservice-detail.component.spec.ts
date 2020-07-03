import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ProductserviceDetailComponent } from 'app/entities/productservice/productservice-detail.component';
import { Productservice } from 'app/shared/model/productservice.model';

describe('Component Tests', () => {
  describe('Productservice Management Detail Component', () => {
    let comp: ProductserviceDetailComponent;
    let fixture: ComponentFixture<ProductserviceDetailComponent>;
    const route = ({ data: of({ productservice: new Productservice(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductserviceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductserviceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductserviceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productservice on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productservice).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
