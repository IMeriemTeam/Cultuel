/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CultuelTestModule } from '../../../test.module';
import { MethodsMySuffixComponent } from 'app/entities/methods-my-suffix/methods-my-suffix.component';
import { MethodsMySuffixService } from 'app/entities/methods-my-suffix/methods-my-suffix.service';
import { MethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';

describe('Component Tests', () => {
    describe('MethodsMySuffix Management Component', () => {
        let comp: MethodsMySuffixComponent;
        let fixture: ComponentFixture<MethodsMySuffixComponent>;
        let service: MethodsMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [MethodsMySuffixComponent],
                providers: []
            })
                .overrideTemplate(MethodsMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MethodsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MethodsMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MethodsMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.methods[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
