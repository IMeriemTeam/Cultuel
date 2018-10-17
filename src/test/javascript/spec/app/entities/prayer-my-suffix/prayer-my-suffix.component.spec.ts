/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CultuelTestModule } from '../../../test.module';
import { PrayerMySuffixComponent } from 'app/entities/prayer-my-suffix/prayer-my-suffix.component';
import { PrayerMySuffixService } from 'app/entities/prayer-my-suffix/prayer-my-suffix.service';
import { PrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';

describe('Component Tests', () => {
    describe('PrayerMySuffix Management Component', () => {
        let comp: PrayerMySuffixComponent;
        let fixture: ComponentFixture<PrayerMySuffixComponent>;
        let service: PrayerMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [PrayerMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PrayerMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrayerMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrayerMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrayerMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.prayers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
