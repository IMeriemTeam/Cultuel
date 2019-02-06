import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';
import { AccountService } from 'app/core';
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
        protected precheService: PrecheMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.precheService
            .query()
            .pipe(
                filter((res: HttpResponse<IPrecheMySuffix[]>) => res.ok),
                map((res: HttpResponse<IPrecheMySuffix[]>) => res.body)
            )
            .subscribe(
                (res: IPrecheMySuffix[]) => {
                    this.preches = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
