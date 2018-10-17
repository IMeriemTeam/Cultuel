/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { PrayerMySuffixUpdateComponent } from 'app/entities/prayer-my-suffix/prayer-my-suffix-update.component';
import { PrayerMySuffixService } from 'app/entities/prayer-my-suffix/prayer-my-suffix.service';
import { PrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';

describe('Component Tests', () => {
    describe('PrayerMySuffix Management Update Component', () => {
        let comp: PrayerMySuffixUpdateComponent;
        let fixture: ComponentFixture<PrayerMySuffixUpdateComponent>;
        let service: PrayerMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [PrayerMySuffixUpdateComponent]
            })
                .overrideTemplate(PrayerMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrayerMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrayerMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrayerMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prayer = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrayerMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prayer = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
