import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CultuelSharedModule } from 'app/shared';
import {
    DonsMySuffixComponent,
    DonsMySuffixDetailComponent,
    DonsMySuffixUpdateComponent,
    DonsMySuffixDeletePopupComponent,
    DonsMySuffixDeleteDialogComponent,
    donsRoute,
    donsPopupRoute
} from './';

const ENTITY_STATES = [...donsRoute, ...donsPopupRoute];

@NgModule({
    imports: [CultuelSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DonsMySuffixComponent,
        DonsMySuffixDetailComponent,
        DonsMySuffixUpdateComponent,
        DonsMySuffixDeleteDialogComponent,
        DonsMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DonsMySuffixComponent,
        DonsMySuffixUpdateComponent,
        DonsMySuffixDeleteDialogComponent,
        DonsMySuffixDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelDonsMySuffixModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
