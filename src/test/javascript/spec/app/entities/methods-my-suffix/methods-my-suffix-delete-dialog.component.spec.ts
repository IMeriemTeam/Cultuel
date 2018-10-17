/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CultuelTestModule } from '../../../test.module';
import { MethodsMySuffixDeleteDialogComponent } from 'app/entities/methods-my-suffix/methods-my-suffix-delete-dialog.component';
import { MethodsMySuffixService } from 'app/entities/methods-my-suffix/methods-my-suffix.service';

describe('Component Tests', () => {
    describe('MethodsMySuffix Management Delete Component', () => {
        let comp: MethodsMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MethodsMySuffixDeleteDialogComponent>;
        let service: MethodsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [MethodsMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(MethodsMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MethodsMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MethodsMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
