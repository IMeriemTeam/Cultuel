import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'contact',
                loadChildren: './contact-my-suffix/contact-my-suffix.module#CultuelContactMySuffixModule'
            },
            {
                path: 'prayer',
                loadChildren: './prayer-my-suffix/prayer-my-suffix.module#CultuelPrayerMySuffixModule'
            },
            {
                path: 'preche',
                loadChildren: './preche-my-suffix/preche-my-suffix.module#CultuelPrecheMySuffixModule'
            },
            {
                path: 'dons',
                loadChildren: './dons-my-suffix/dons-my-suffix.module#CultuelDonsMySuffixModule'
            },
            {
                path: 'articles',
                loadChildren: './articles-true/articles-true.module#CultuelArticlesTrueModule'
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
