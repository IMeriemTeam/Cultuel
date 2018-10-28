import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CultuelSharedModule } from 'app/shared';
import {
    PrecheMySuffixComponent,
    PrecheMySuffixDetailComponent,
    PrecheMySuffixUpdateComponent,
    PrecheMySuffixDeletePopupComponent,
    PrecheMySuffixDeleteDialogComponent,
    precheRoute,
    prechePopupRoute
} from './';

const ENTITY_STATES = [...precheRoute, ...prechePopupRoute];

@NgModule({
    imports: [CultuelSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrecheMySuffixComponent,
        PrecheMySuffixDetailComponent,
        PrecheMySuffixUpdateComponent,
        PrecheMySuffixDeleteDialogComponent,
        PrecheMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PrecheMySuffixComponent,
        PrecheMySuffixUpdateComponent,
        PrecheMySuffixDeleteDialogComponent,
        PrecheMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelPrecheMySuffixModule {}
