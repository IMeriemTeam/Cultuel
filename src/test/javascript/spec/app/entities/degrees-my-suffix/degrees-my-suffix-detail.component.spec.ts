/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { DegreesMySuffixDetailComponent } from 'app/entities/degrees-my-suffix/degrees-my-suffix-detail.component';
import { DegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';

describe('Component Tests', () => {
    describe('DegreesMySuffix Management Detail Component', () => {
        let comp: DegreesMySuffixDetailComponent;
        let fixture: ComponentFixture<DegreesMySuffixDetailComponent>;
        const route = ({ data: of({ degrees: new DegreesMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [DegreesMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DegreesMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DegreesMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.degrees).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
