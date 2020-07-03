import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { DemandecleUpdateComponent } from 'app/entities/demandecle/demandecle-update.component';
import { DemandecleService } from 'app/entities/demandecle/demandecle.service';
import { Demandecle } from 'app/shared/model/demandecle.model';

describe('Component Tests', () => {
  describe('Demandecle Management Update Component', () => {
    let comp: DemandecleUpdateComponent;
    let fixture: ComponentFixture<DemandecleUpdateComponent>;
    let service: DemandecleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DemandecleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DemandecleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DemandecleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DemandecleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Demandecle(123);
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
        const entity = new Demandecle();
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
