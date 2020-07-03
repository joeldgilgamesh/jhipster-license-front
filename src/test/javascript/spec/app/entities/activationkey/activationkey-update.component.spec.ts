import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ActivationkeyUpdateComponent } from 'app/entities/activationkey/activationkey-update.component';
import { ActivationkeyService } from 'app/entities/activationkey/activationkey.service';
import { Activationkey } from 'app/shared/model/activationkey.model';

describe('Component Tests', () => {
  describe('Activationkey Management Update Component', () => {
    let comp: ActivationkeyUpdateComponent;
    let fixture: ComponentFixture<ActivationkeyUpdateComponent>;
    let service: ActivationkeyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ActivationkeyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ActivationkeyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActivationkeyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActivationkeyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Activationkey(123);
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
        const entity = new Activationkey();
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
