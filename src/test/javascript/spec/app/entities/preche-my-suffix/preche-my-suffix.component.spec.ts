/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CultuelTestModule } from '../../../test.module';
import { PrecheMySuffixComponent } from 'app/entities/preche-my-suffix/preche-my-suffix.component';
import { PrecheMySuffixService } from 'app/entities/preche-my-suffix/preche-my-suffix.service';
import { PrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';

describe('Component Tests', () => {
    describe('PrecheMySuffix Management Component', () => {
        let comp: PrecheMySuffixComponent;
        let fixture: ComponentFixture<PrecheMySuffixComponent>;
        let service: PrecheMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [PrecheMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PrecheMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrecheMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecheMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrecheMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.preches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
