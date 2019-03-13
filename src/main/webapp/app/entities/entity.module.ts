import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'contact-my-suffix',
                loadChildren: './contact-my-suffix/contact-my-suffix.module#CultuelContactMySuffixModule'
            },
            {
                path: 'preche-my-suffix',
                loadChildren: './preche-my-suffix/preche-my-suffix.module#CultuelPrecheMySuffixModule'
            },
            {
                path: 'dons-my-suffix',
                loadChildren: './dons-my-suffix/dons-my-suffix.module#CultuelDonsMySuffixModule'
            },
            {
                path: 'prayer-my-suffix',
                loadChildren: './prayer-my-suffix/prayer-my-suffix.module#CultuelPrayerMySuffixModule'
            },
            {
                path: 'preche-my-suffix',
                loadChildren: './preche-my-suffix/preche-my-suffix.module#CultuelPrecheMySuffixModule'
            },
            {
                path: 'dons-my-suffix',
                loadChildren: './dons-my-suffix/dons-my-suffix.module#CultuelDonsMySuffixModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelEntityModule {}
