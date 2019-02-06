import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';
import { AccountService } from 'app/core';
import { DonsMySuffixService } from './dons-my-suffix.service';

@Component({
    selector: 'jhi-dons-my-suffix',
    templateUrl: './dons-my-suffix.component.html'
})
export class DonsMySuffixComponent implements OnInit, OnDestroy {
    dons: IDonsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected donsService: DonsMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.donsService
            .query()
            .pipe(
                filter((res: HttpResponse<IDonsMySuffix[]>) => res.ok),
                map((res: HttpResponse<IDonsMySuffix[]>) => res.body)
            )
            .subscribe(
                (res: IDonsMySuffix[]) => {
                    this.dons = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDons();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDonsMySuffix) {
        return item.id;
    }

    registerChangeInDons() {
        this.eventSubscriber = this.eventManager.subscribe('donsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
