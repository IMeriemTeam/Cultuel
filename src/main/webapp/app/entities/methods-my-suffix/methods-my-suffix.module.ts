import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CultuelSharedModule } from 'app/shared';
import {
    MethodsMySuffixComponent,
    MethodsMySuffixDetailComponent,
    MethodsMySuffixUpdateComponent,
    MethodsMySuffixDeletePopupComponent,
    MethodsMySuffixDeleteDialogComponent,
    methodsRoute,
    methodsPopupRoute
} from './';

const ENTITY_STATES = [...methodsRoute, ...methodsPopupRoute];

@NgModule({
    imports: [CultuelSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MethodsMySuffixComponent,
        MethodsMySuffixDetailComponent,
        MethodsMySuffixUpdateComponent,
        MethodsMySuffixDeleteDialogComponent,
        MethodsMySuffixDeletePopupComponent
    ],
    entryComponents: [
        MethodsMySuffixComponent,
        MethodsMySuffixUpdateComponent,
        MethodsMySuffixDeleteDialogComponent,
        MethodsMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CultuelMethodsMySuffixModule {}
