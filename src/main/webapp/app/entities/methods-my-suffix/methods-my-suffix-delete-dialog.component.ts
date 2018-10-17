import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';
import { MethodsMySuffixService } from './methods-my-suffix.service';

@Component({
    selector: 'jhi-methods-my-suffix-delete-dialog',
    templateUrl: './methods-my-suffix-delete-dialog.component.html'
})
export class MethodsMySuffixDeleteDialogComponent {
    methods: IMethodsMySuffix;

    constructor(
        private methodsService: MethodsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.methodsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'methodsListModification',
                content: 'Deleted an methods'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-methods-my-suffix-delete-popup',
    template: ''
})
export class MethodsMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ methods }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MethodsMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.methods = methods;
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
