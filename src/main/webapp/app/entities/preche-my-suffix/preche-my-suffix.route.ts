import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';
import { PrecheMySuffixService } from './preche-my-suffix.service';
import { PrecheMySuffixComponent } from './preche-my-suffix.component';
import { PrecheMySuffixDetailComponent } from './preche-my-suffix-detail.component';
import { PrecheMySuffixUpdateComponent } from './preche-my-suffix-update.component';
import { PrecheMySuffixDeletePopupComponent } from './preche-my-suffix-delete-dialog.component';
import { IPrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PrecheMySuffixResolve implements Resolve<IPrecheMySuffix> {
    constructor(private service: PrecheMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((preche: HttpResponse<PrecheMySuffix>) => preche.body));
        }
        return of(new PrecheMySuffix());
    }
}

export const precheRoute: Routes = [
    {
        path: 'preche-my-suffix',
        component: PrecheMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.preche.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preche-my-suffix/:id/view',
        component: PrecheMySuffixDetailComponent,
        resolve: {
            preche: PrecheMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.preche.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preche-my-suffix/new',
        component: PrecheMySuffixUpdateComponent,
        resolve: {
            preche: PrecheMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.preche.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preche-my-suffix/:id/edit',
        component: PrecheMySuffixUpdateComponent,
        resolve: {
            preche: PrecheMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.preche.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prechePopupRoute: Routes = [
    {
        path: 'preche-my-suffix/:id/delete',
        component: PrecheMySuffixDeletePopupComponent,
        resolve: {
            preche: PrecheMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.preche.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
