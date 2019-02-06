import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CultuelPrecheMySuffixModule } from './preche-my-suffix/preche-my-suffix.module';
import { CultuelDonsMySuffixModule } from './dons-my-suffix/dons-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CultuelPrecheMySuffixModule,
        CultuelDonsMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelEntityModule {}
