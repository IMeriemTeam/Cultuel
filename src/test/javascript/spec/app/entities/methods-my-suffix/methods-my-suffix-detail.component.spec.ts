/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { MethodsMySuffixDetailComponent } from 'app/entities/methods-my-suffix/methods-my-suffix-detail.component';
import { MethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';

describe('Component Tests', () => {
    describe('MethodsMySuffix Management Detail Component', () => {
        let comp: MethodsMySuffixDetailComponent;
        let fixture: ComponentFixture<MethodsMySuffixDetailComponent>;
        const route = ({ data: of({ methods: new MethodsMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [MethodsMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MethodsMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MethodsMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.methods).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
