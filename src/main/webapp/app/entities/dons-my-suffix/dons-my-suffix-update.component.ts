import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';
import { DonsMySuffixService } from './dons-my-suffix.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-dons-my-suffix-update',
    templateUrl: './dons-my-suffix-update.component.html'
})
export class DonsMySuffixUpdateComponent implements OnInit {
    dons: IDonsMySuffix;
    isSaving: boolean;

    users: IUser[];
    dateDonsDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected donsService: DonsMySuffixService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dons }) => {
            this.dons = dons;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDonsMySuffix>>) {
        result.subscribe((res: HttpResponse<IDonsMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
