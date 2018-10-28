/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { DonsMySuffixDetailComponent } from 'app/entities/dons-my-suffix/dons-my-suffix-detail.component';
import { DonsMySuffix } from 'app/shared/model/dons-my-suffix.model';

describe('Component Tests', () => {
    describe('DonsMySuffix Management Detail Component', () => {
        let comp: DonsMySuffixDetailComponent;
        let fixture: ComponentFixture<DonsMySuffixDetailComponent>;
        const route = ({ data: of({ dons: new DonsMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [DonsMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DonsMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonsMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dons).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
