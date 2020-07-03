import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ActivationkeyComponent } from 'app/entities/activationkey/activationkey.component';
import { ActivationkeyService } from 'app/entities/activationkey/activationkey.service';
import { Activationkey } from 'app/shared/model/activationkey.model';

describe('Component Tests', () => {
  describe('Activationkey Management Component', () => {
    let comp: ActivationkeyComponent;
    let fixture: ComponentFixture<ActivationkeyComponent>;
    let service: ActivationkeyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ActivationkeyComponent],
      })
        .overrideTemplate(ActivationkeyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActivationkeyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActivationkeyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Activationkey(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.activationkeys && comp.activationkeys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
