import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';
import { Principal } from 'app/core';
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
        private donsService: DonsMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.donsService.query().subscribe(
            (res: HttpResponse<IDonsMySuffix[]>) => {
                this.dons = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
