/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CultuelTestModule } from '../../../test.module';
import { DonsMySuffixDeleteDialogComponent } from 'app/entities/dons-my-suffix/dons-my-suffix-delete-dialog.component';
import { DonsMySuffixService } from 'app/entities/dons-my-suffix/dons-my-suffix.service';

describe('Component Tests', () => {
    describe('DonsMySuffix Management Delete Component', () => {
        let comp: DonsMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DonsMySuffixDeleteDialogComponent>;
        let service: DonsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [DonsMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(DonsMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonsMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonsMySuffixService);
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
