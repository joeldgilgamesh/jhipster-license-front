import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { DemandecleDetailComponent } from 'app/entities/demandecle/demandecle-detail.component';
import { Demandecle } from 'app/shared/model/demandecle.model';

describe('Component Tests', () => {
  describe('Demandecle Management Detail Component', () => {
    let comp: DemandecleDetailComponent;
    let fixture: ComponentFixture<DemandecleDetailComponent>;
    const route = ({ data: of({ demandecle: new Demandecle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DemandecleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DemandecleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DemandecleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load demandecle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.demandecle).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
