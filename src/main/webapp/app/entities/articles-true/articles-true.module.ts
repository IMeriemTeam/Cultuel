import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CultuelSharedModule } from 'app/shared';
import {
    ArticlesTrueComponent,
    ArticlesTrueDetailComponent,
    ArticlesTrueUpdateComponent,
    ArticlesTrueDeletePopupComponent,
    ArticlesTrueDeleteDialogComponent,
    articlesRoute,
    articlesPopupRoute
} from './';

const ENTITY_STATES = [...articlesRoute, ...articlesPopupRoute];

@NgModule({
    imports: [CultuelSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ArticlesTrueComponent,
        ArticlesTrueDetailComponent,
        ArticlesTrueUpdateComponent,
        ArticlesTrueDeleteDialogComponent,
        ArticlesTrueDeletePopupComponent
    ],
    entryComponents: [
        ArticlesTrueComponent,
        ArticlesTrueUpdateComponent,
        ArticlesTrueDeleteDialogComponent,
        ArticlesTrueDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelArticlesTrueModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
