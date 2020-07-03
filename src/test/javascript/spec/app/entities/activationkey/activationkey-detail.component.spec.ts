import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ActivationkeyDetailComponent } from 'app/entities/activationkey/activationkey-detail.component';
import { Activationkey } from 'app/shared/model/activationkey.model';

describe('Component Tests', () => {
  describe('Activationkey Management Detail Component', () => {
    let comp: ActivationkeyDetailComponent;
    let fixture: ComponentFixture<ActivationkeyDetailComponent>;
    const route = ({ data: of({ activationkey: new Activationkey(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ActivationkeyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ActivationkeyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ActivationkeyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load activationkey on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.activationkey).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
