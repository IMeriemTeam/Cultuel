import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ContactMySuffixComponent } from './contact-my-suffix.component';

export const contactRoute: Routes = [
    {
        path: '',
        component: ContactMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
