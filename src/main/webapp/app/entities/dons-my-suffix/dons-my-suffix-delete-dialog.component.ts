import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';
import { DonsMySuffixService } from './dons-my-suffix.service';

@Component({
    selector: 'jhi-dons-my-suffix-delete-dialog',
    templateUrl: './dons-my-suffix-delete-dialog.component.html'
})
export class DonsMySuffixDeleteDialogComponent {
    dons: IDonsMySuffix;

    constructor(private donsService: DonsMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.donsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'donsListModification',
                content: 'Deleted an dons'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dons-my-suffix-delete-popup',
    template: ''
})
export class DonsMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dons }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DonsMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.dons = dons;
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
