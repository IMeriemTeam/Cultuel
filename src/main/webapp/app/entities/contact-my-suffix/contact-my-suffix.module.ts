import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CultuelSharedModule } from 'app/shared';
import { ContactMySuffixComponent } from './contact-my-suffix.component';

import { contactRoute } from './contact-my-suffix.route';

import { HttpClientModule } from '@angular/common/http';
const ENTITY_STATES = contactRoute;

@NgModule({
    imports: [CultuelSharedModule, RouterModule.forChild(ENTITY_STATES), HttpClientModule],
    declarations: [ContactMySuffixComponent],
    entryComponents: [ContactMySuffixComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelContactMySuffixModule {}
