/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CultuelTestModule } from '../../../test.module';
import { DonsMySuffixComponent } from 'app/entities/dons-my-suffix/dons-my-suffix.component';
import { DonsMySuffixService } from 'app/entities/dons-my-suffix/dons-my-suffix.service';
import { DonsMySuffix } from 'app/shared/model/dons-my-suffix.model';

describe('Component Tests', () => {
    describe('DonsMySuffix Management Component', () => {
        let comp: DonsMySuffixComponent;
        let fixture: ComponentFixture<DonsMySuffixComponent>;
        let service: DonsMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [DonsMySuffixComponent],
                providers: []
            })
                .overrideTemplate(DonsMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonsMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DonsMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
