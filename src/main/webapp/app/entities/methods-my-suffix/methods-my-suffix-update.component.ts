import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';
import { MethodsMySuffixService } from './methods-my-suffix.service';

@Component({
    selector: 'jhi-methods-my-suffix-update',
    templateUrl: './methods-my-suffix-update.component.html'
})
export class MethodsMySuffixUpdateComponent implements OnInit {
    methods: IMethodsMySuffix;
    isSaving: boolean;

    constructor(private methodsService: MethodsMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ methods }) => {
            this.methods = methods;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.methods.id !== undefined) {
            this.subscribeToSaveResponse(this.methodsService.update(this.methods));
        } else {
            this.subscribeToSaveResponse(this.methodsService.create(this.methods));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMethodsMySuffix>>) {
        result.subscribe((res: HttpResponse<IMethodsMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
