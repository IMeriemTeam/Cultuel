import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CultuelRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { CultuelCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { CultuelLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { CultuelDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { CultuelTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { CultuelDonsMySuffixModule } from './dons-my-suffix/dons-my-suffix.module';
import { CultuelPrayerMySuffixModule } from './prayer-my-suffix/prayer-my-suffix.module';
import { CultuelDegreesMySuffixModule } from './degrees-my-suffix/degrees-my-suffix.module';
import { CultuelMethodsMySuffixModule } from './methods-my-suffix/methods-my-suffix.module';
import { CultuelPrecheMySuffixModule } from './preche-my-suffix/preche-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CultuelRegionMySuffixModule,
        CultuelCountryMySuffixModule,
        CultuelLocationMySuffixModule,
        CultuelDepartmentMySuffixModule,
        CultuelTaskMySuffixModule,
        CultuelDonsMySuffixModule,
        CultuelPrayerMySuffixModule,
        CultuelDegreesMySuffixModule,
        CultuelMethodsMySuffixModule,
        CultuelPrecheMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelEntityModule {}
