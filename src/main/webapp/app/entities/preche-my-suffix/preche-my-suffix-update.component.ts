import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IPrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';
import { PrecheMySuffixService } from './preche-my-suffix.service';

@Component({
    selector: 'jhi-preche-my-suffix-update',
    templateUrl: './preche-my-suffix-update.component.html'
})
export class PrecheMySuffixUpdateComponent implements OnInit {
    preche: IPrecheMySuffix;
    isSaving: boolean;
    dateDp: any;

    constructor(private precheService: PrecheMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ preche }) => {
            this.preche = preche;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.preche.id !== undefined) {
            this.subscribeToSaveResponse(this.precheService.update(this.preche));
        } else {
            this.subscribeToSaveResponse(this.precheService.create(this.preche));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrecheMySuffix>>) {
        result.subscribe((res: HttpResponse<IPrecheMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
