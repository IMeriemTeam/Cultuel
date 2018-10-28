import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';
import { Principal } from 'app/core';
import { PrecheMySuffixService } from './preche-my-suffix.service';

@Component({
    selector: 'jhi-preche-my-suffix',
    templateUrl: './preche-my-suffix.component.html'
})
export class PrecheMySuffixComponent implements OnInit, OnDestroy {
    preches: IPrecheMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private precheService: PrecheMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.precheService.query().subscribe(
            (res: HttpResponse<IPrecheMySuffix[]>) => {
                this.preches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPreches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrecheMySuffix) {
        return item.id;
    }

    registerChangeInPreches() {
        this.eventSubscriber = this.eventManager.subscribe('precheListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
