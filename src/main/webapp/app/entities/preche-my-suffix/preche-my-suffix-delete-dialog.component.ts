import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';
import { PrecheMySuffixService } from './preche-my-suffix.service';

@Component({
    selector: 'jhi-preche-my-suffix-delete-dialog',
    templateUrl: './preche-my-suffix-delete-dialog.component.html'
})
export class PrecheMySuffixDeleteDialogComponent {
    preche: IPrecheMySuffix;

    constructor(
        protected precheService: PrecheMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.precheService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'precheListModification',
                content: 'Deleted an preche'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-preche-my-suffix-delete-popup',
    template: ''
})
export class PrecheMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preche }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrecheMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.preche = preche;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/preche-my-suffix', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/preche-my-suffix', { outlets: { popup: null } }]);
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
