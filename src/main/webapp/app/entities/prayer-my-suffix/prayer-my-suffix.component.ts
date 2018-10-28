import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';
import { Principal } from 'app/core';
import { PrayerMySuffixService } from './prayer-my-suffix.service';

@Component({
    selector: 'jhi-prayer-my-suffix',
    templateUrl: './prayer-my-suffix.component.html'
})
export class PrayerMySuffixComponent implements OnInit, OnDestroy {
    prayers: IPrayerMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prayerService: PrayerMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.prayerService.query().subscribe(
            (res: HttpResponse<IPrayerMySuffix[]>) => {
                this.prayers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrayers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrayerMySuffix) {
        return item.id;
    }

    registerChangeInPrayers() {
        this.eventSubscriber = this.eventManager.subscribe('prayerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
