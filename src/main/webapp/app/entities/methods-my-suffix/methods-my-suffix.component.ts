import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';
import { Principal } from 'app/core';
import { MethodsMySuffixService } from './methods-my-suffix.service';

@Component({
    selector: 'jhi-methods-my-suffix',
    templateUrl: './methods-my-suffix.component.html'
})
export class MethodsMySuffixComponent implements OnInit, OnDestroy {
    methods: IMethodsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private methodsService: MethodsMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.methodsService.query().subscribe(
            (res: HttpResponse<IMethodsMySuffix[]>) => {
                this.methods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMethods();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMethodsMySuffix) {
        return item.id;
    }

    registerChangeInMethods() {
        this.eventSubscriber = this.eventManager.subscribe('methodsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
