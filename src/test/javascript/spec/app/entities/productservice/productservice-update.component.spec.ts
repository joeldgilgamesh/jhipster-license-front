import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ProductserviceUpdateComponent } from 'app/entities/productservice/productservice-update.component';
import { ProductserviceService } from 'app/entities/productservice/productservice.service';
import { Productservice } from 'app/shared/model/productservice.model';

describe('Component Tests', () => {
  describe('Productservice Management Update Component', () => {
    let comp: ProductserviceUpdateComponent;
    let fixture: ComponentFixture<ProductserviceUpdateComponent>;
    let service: ProductserviceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductserviceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProductserviceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductserviceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductserviceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Productservice(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Productservice();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
