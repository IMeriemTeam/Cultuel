import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IArticlesTrue } from 'app/shared/model/articles-true.model';
import { ArticlesTrueService } from './articles-true.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-articles-true-update',
    templateUrl: './articles-true-update.component.html'
})
export class ArticlesTrueUpdateComponent implements OnInit {
    articles: IArticlesTrue;
    isSaving: boolean;

    users: IUser[];
    dateDp: any;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected articlesService: ArticlesTrueService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ articles }) => {
            this.articles = articles;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.articles.id !== undefined) {
            this.subscribeToSaveResponse(this.articlesService.update(this.articles));
        } else {
            this.subscribeToSaveResponse(this.articlesService.create(this.articles));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticlesTrue>>) {
        result.subscribe((res: HttpResponse<IArticlesTrue>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
