/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { PrayerMySuffixDetailComponent } from 'app/entities/prayer-my-suffix/prayer-my-suffix-detail.component';
import { PrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';

describe('Component Tests', () => {
    describe('PrayerMySuffix Management Detail Component', () => {
        let comp: PrayerMySuffixDetailComponent;
        let fixture: ComponentFixture<PrayerMySuffixDetailComponent>;
        const route = ({ data: of({ prayer: new PrayerMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [PrayerMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrayerMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrayerMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prayer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
