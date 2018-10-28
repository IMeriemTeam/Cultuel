import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';
import { DegreesMySuffixService } from './degrees-my-suffix.service';

@Component({
    selector: 'jhi-degrees-my-suffix-delete-dialog',
    templateUrl: './degrees-my-suffix-delete-dialog.component.html'
})
export class DegreesMySuffixDeleteDialogComponent {
    degrees: IDegreesMySuffix;

    constructor(
        private degreesService: DegreesMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.degreesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'degreesListModification',
                content: 'Deleted an degrees'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-degrees-my-suffix-delete-popup',
    template: ''
})
export class DegreesMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ degrees }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DegreesMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.degrees = degrees;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
