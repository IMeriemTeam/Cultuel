/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CultuelTestModule } from '../../../test.module';
import { ArticlesTrueDeleteDialogComponent } from 'app/entities/articles-true/articles-true-delete-dialog.component';
import { ArticlesTrueService } from 'app/entities/articles-true/articles-true.service';

describe('Component Tests', () => {
    describe('ArticlesTrue Management Delete Component', () => {
        let comp: ArticlesTrueDeleteDialogComponent;
        let fixture: ComponentFixture<ArticlesTrueDeleteDialogComponent>;
        let service: ArticlesTrueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [ArticlesTrueDeleteDialogComponent]
            })
                .overrideTemplate(ArticlesTrueDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArticlesTrueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticlesTrueService);
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
