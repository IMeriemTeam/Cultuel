import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CultuelSharedModule } from 'app/shared';
import { PrayerMySuffixComponent } from './prayer-my-suffix.component';

import { prayerRoute } from './prayer-my-suffix.route';

import { HttpClientModule } from '@angular/common/http';
const ENTITY_STATES = prayerRoute;

@NgModule({
    imports: [CultuelSharedModule, RouterModule.forChild(ENTITY_STATES), HttpClientModule],
    declarations: [
        PrayerMySuffixComponent
    ],
    entryComponents: [
        PrayerMySuffixComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelPrayerMySuffixModule {}
