import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CultuelSharedModule } from 'app/shared';
import { CultuelAdminModule } from 'app/admin/admin.module';
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
    imports: [CultuelSharedModule, CultuelAdminModule, RouterModule.forChild(ENTITY_STATES)],
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelDonsMySuffixModule {}
