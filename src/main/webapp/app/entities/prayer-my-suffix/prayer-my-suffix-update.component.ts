import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';
import { PrayerMySuffixService } from './prayer-my-suffix.service';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from 'app/entities/location-my-suffix';
import { IMethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';
import { MethodsMySuffixService } from 'app/entities/methods-my-suffix';
import { IDegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';
import { DegreesMySuffixService } from 'app/entities/degrees-my-suffix';

@Component({
    selector: 'jhi-prayer-my-suffix-update',
    templateUrl: './prayer-my-suffix-update.component.html'
})
export class PrayerMySuffixUpdateComponent implements OnInit {
    prayer: IPrayerMySuffix;
    isSaving: boolean;

    locations: ILocationMySuffix[];

    methods: IMethodsMySuffix[];

    degrees: IDegreesMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private prayerService: PrayerMySuffixService,
        private locationService: LocationMySuffixService,
        private methodsService: MethodsMySuffixService,
        private degreesService: DegreesMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prayer }) => {
            this.prayer = prayer;
        });
        this.locationService.query({ filter: 'prayer-is-null' }).subscribe(
            (res: HttpResponse<ILocationMySuffix[]>) => {
                if (!this.prayer.location || !this.prayer.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.prayer.location.id).subscribe(
                        (subRes: HttpResponse<ILocationMySuffix>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.methodsService.query({ filter: 'prayer-is-null' }).subscribe(
            (res: HttpResponse<IMethodsMySuffix[]>) => {
                if (!this.prayer.method || !this.prayer.method.id) {
                    this.methods = res.body;
                } else {
                    this.methodsService.find(this.prayer.method.id).subscribe(
                        (subRes: HttpResponse<IMethodsMySuffix>) => {
                            this.methods = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.degreesService.query({ filter: 'prayer-is-null' }).subscribe(
            (res: HttpResponse<IDegreesMySuffix[]>) => {
                if (!this.prayer.degree || !this.prayer.degree.id) {
                    this.degrees = res.body;
                } else {
                    this.degreesService.find(this.prayer.degree.id).subscribe(
                        (subRes: HttpResponse<IDegreesMySuffix>) => {
                            this.degrees = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.prayer.id !== undefined) {
            this.subscribeToSaveResponse(this.prayerService.update(this.prayer));
        } else {
            this.subscribeToSaveResponse(this.prayerService.create(this.prayer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrayerMySuffix>>) {
        result.subscribe((res: HttpResponse<IPrayerMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocationMySuffix) {
        return item.id;
    }

    trackMethodsById(index: number, item: IMethodsMySuffix) {
        return item.id;
    }

    trackDegreesById(index: number, item: IDegreesMySuffix) {
        return item.id;
    }
}
