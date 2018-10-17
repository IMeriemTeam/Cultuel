import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';
import { Principal } from 'app/core';
import { DegreesMySuffixService } from './degrees-my-suffix.service';

@Component({
    selector: 'jhi-degrees-my-suffix',
    templateUrl: './degrees-my-suffix.component.html'
})
export class DegreesMySuffixComponent implements OnInit, OnDestroy {
    degrees: IDegreesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private degreesService: DegreesMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.degreesService.query().subscribe(
            (res: HttpResponse<IDegreesMySuffix[]>) => {
                this.degrees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDegrees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDegreesMySuffix) {
        return item.id;
    }

    registerChangeInDegrees() {
        this.eventSubscriber = this.eventManager.subscribe('degreesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
