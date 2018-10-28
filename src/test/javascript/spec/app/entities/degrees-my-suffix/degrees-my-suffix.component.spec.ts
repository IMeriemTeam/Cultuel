/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CultuelTestModule } from '../../../test.module';
import { DegreesMySuffixComponent } from 'app/entities/degrees-my-suffix/degrees-my-suffix.component';
import { DegreesMySuffixService } from 'app/entities/degrees-my-suffix/degrees-my-suffix.service';
import { DegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';

describe('Component Tests', () => {
    describe('DegreesMySuffix Management Component', () => {
        let comp: DegreesMySuffixComponent;
        let fixture: ComponentFixture<DegreesMySuffixComponent>;
        let service: DegreesMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [DegreesMySuffixComponent],
                providers: []
            })
                .overrideTemplate(DegreesMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DegreesMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DegreesMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DegreesMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.degrees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
