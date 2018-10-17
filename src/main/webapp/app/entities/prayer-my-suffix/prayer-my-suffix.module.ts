import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CultuelSharedModule } from 'app/shared';
import {
    PrayerMySuffixComponent,
    PrayerMySuffixDetailComponent,
    PrayerMySuffixUpdateComponent,
    PrayerMySuffixDeletePopupComponent,
    PrayerMySuffixDeleteDialogComponent,
    prayerRoute,
    prayerPopupRoute
} from './';

const ENTITY_STATES = [...prayerRoute, ...prayerPopupRoute];

@NgModule({
    imports: [CultuelSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrayerMySuffixComponent,
        PrayerMySuffixDetailComponent,
        PrayerMySuffixUpdateComponent,
        PrayerMySuffixDeleteDialogComponent,
        PrayerMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PrayerMySuffixComponent,
        PrayerMySuffixUpdateComponent,
        PrayerMySuffixDeleteDialogComponent,
        PrayerMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelPrayerMySuffixModule {}
