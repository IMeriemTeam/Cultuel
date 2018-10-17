import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';
import { DonsMySuffixService } from './dons-my-suffix.service';

@Component({
    selector: 'jhi-dons-my-suffix-update',
    templateUrl: './dons-my-suffix-update.component.html'
})
export class DonsMySuffixUpdateComponent implements OnInit {
    dons: IDonsMySuffix;
    isSaving: boolean;

    constructor(private donsService: DonsMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dons }) => {
            this.dons = dons;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dons.id !== undefined) {
            this.subscribeToSaveResponse(this.donsService.update(this.dons));
        } else {
            this.subscribeToSaveResponse(this.donsService.create(this.dons));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDonsMySuffix>>) {
        result.subscribe((res: HttpResponse<IDonsMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
