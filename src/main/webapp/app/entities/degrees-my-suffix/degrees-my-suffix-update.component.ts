import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';
import { DegreesMySuffixService } from './degrees-my-suffix.service';

@Component({
    selector: 'jhi-degrees-my-suffix-update',
    templateUrl: './degrees-my-suffix-update.component.html'
})
export class DegreesMySuffixUpdateComponent implements OnInit {
    degrees: IDegreesMySuffix;
    isSaving: boolean;

    constructor(private degreesService: DegreesMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ degrees }) => {
            this.degrees = degrees;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.degrees.id !== undefined) {
            this.subscribeToSaveResponse(this.degreesService.update(this.degrees));
        } else {
            this.subscribeToSaveResponse(this.degreesService.create(this.degrees));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDegreesMySuffix>>) {
        result.subscribe((res: HttpResponse<IDegreesMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
