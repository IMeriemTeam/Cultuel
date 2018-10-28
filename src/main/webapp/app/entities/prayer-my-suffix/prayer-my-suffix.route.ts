import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';
import { PrayerMySuffixService } from './prayer-my-suffix.service';
import { PrayerMySuffixComponent } from './prayer-my-suffix.component';
import { PrayerMySuffixDetailComponent } from './prayer-my-suffix-detail.component';
import { PrayerMySuffixUpdateComponent } from './prayer-my-suffix-update.component';
import { PrayerMySuffixDeletePopupComponent } from './prayer-my-suffix-delete-dialog.component';
import { IPrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PrayerMySuffixResolve implements Resolve<IPrayerMySuffix> {
    constructor(private service: PrayerMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((prayer: HttpResponse<PrayerMySuffix>) => prayer.body));
        }
        return of(new PrayerMySuffix());
    }
}

export const prayerRoute: Routes = [
    {
        path: 'prayer-my-suffix',
        component: PrayerMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prayer-my-suffix/:id/view',
        component: PrayerMySuffixDetailComponent,
        resolve: {
            prayer: PrayerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prayer-my-suffix/new',
        component: PrayerMySuffixUpdateComponent,
        resolve: {
            prayer: PrayerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prayer-my-suffix/:id/edit',
        component: PrayerMySuffixUpdateComponent,
        resolve: {
            prayer: PrayerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prayerPopupRoute: Routes = [
    {
        path: 'prayer-my-suffix/:id/delete',
        component: PrayerMySuffixDeletePopupComponent,
        resolve: {
            prayer: PrayerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
