/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { PrecheMySuffixDetailComponent } from 'app/entities/preche-my-suffix/preche-my-suffix-detail.component';
import { PrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';

describe('Component Tests', () => {
    describe('PrecheMySuffix Management Detail Component', () => {
        let comp: PrecheMySuffixDetailComponent;
        let fixture: ComponentFixture<PrecheMySuffixDetailComponent>;
        const route = ({ data: of({ preche: new PrecheMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [PrecheMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrecheMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrecheMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.preche).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
