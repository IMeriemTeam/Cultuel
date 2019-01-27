import { Route } from '@angular/router';

import { SidenavComponent } from './sidenav.component';

export const sidenavbarRoute: Route = {
    path: '',
    component: SidenavComponent,
    outlet: 'sidenav'
};
