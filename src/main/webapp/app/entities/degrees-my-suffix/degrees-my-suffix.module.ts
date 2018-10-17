import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CultuelSharedModule } from 'app/shared';
import {
    DegreesMySuffixComponent,
    DegreesMySuffixDetailComponent,
    DegreesMySuffixUpdateComponent,
    DegreesMySuffixDeletePopupComponent,
    DegreesMySuffixDeleteDialogComponent,
    degreesRoute,
    degreesPopupRoute
} from './';

const ENTITY_STATES = [...degreesRoute, ...degreesPopupRoute];

@NgModule({
    imports: [CultuelSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DegreesMySuffixComponent,
        DegreesMySuffixDetailComponent,
        DegreesMySuffixUpdateComponent,
        DegreesMySuffixDeleteDialogComponent,
        DegreesMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DegreesMySuffixComponent,
        DegreesMySuffixUpdateComponent,
        DegreesMySuffixDeleteDialogComponent,
        DegreesMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelDegreesMySuffixModule {}
