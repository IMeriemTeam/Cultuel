import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';
import { PrayerMySuffixService } from './prayer-my-suffix.service';

@Component({
    selector: 'jhi-prayer-my-suffix-delete-dialog',
    templateUrl: './prayer-my-suffix-delete-dialog.component.html'
})
export class PrayerMySuffixDeleteDialogComponent {
    prayer: IPrayerMySuffix;

    constructor(private prayerService: PrayerMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prayerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'prayerListModification',
                content: 'Deleted an prayer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prayer-my-suffix-delete-popup',
    template: ''
})
export class PrayerMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prayer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrayerMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.prayer = prayer;
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
