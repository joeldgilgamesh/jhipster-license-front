import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { DemandecleComponent } from 'app/entities/demandecle/demandecle.component';
import { DemandecleService } from 'app/entities/demandecle/demandecle.service';
import { Demandecle } from 'app/shared/model/demandecle.model';

describe('Component Tests', () => {
  describe('Demandecle Management Component', () => {
    let comp: DemandecleComponent;
    let fixture: ComponentFixture<DemandecleComponent>;
    let service: DemandecleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DemandecleComponent],
      })
        .overrideTemplate(DemandecleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DemandecleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DemandecleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Demandecle(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.demandecles && comp.demandecles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
