import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { PrayerMySuffixComponent } from './prayer-my-suffix.component';

export const prayerRoute: Routes = [
    {
        path: '',
        component: PrayerMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
