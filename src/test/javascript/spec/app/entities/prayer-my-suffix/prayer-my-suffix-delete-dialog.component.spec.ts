/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CultuelTestModule } from '../../../test.module';
import { PrayerMySuffixDeleteDialogComponent } from 'app/entities/prayer-my-suffix/prayer-my-suffix-delete-dialog.component';
import { PrayerMySuffixService } from 'app/entities/prayer-my-suffix/prayer-my-suffix.service';

describe('Component Tests', () => {
    describe('PrayerMySuffix Management Delete Component', () => {
        let comp: PrayerMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PrayerMySuffixDeleteDialogComponent>;
        let service: PrayerMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [PrayerMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PrayerMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrayerMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrayerMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
