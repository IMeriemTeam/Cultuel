import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IArticlesTrue } from 'app/shared/model/articles-true.model';

@Component({
    selector: 'jhi-articles-true-detail',
    templateUrl: './articles-true-detail.component.html'
})
export class ArticlesTrueDetailComponent implements OnInit {
    articles: IArticlesTrue;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articles }) => {
            this.articles = articles;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
