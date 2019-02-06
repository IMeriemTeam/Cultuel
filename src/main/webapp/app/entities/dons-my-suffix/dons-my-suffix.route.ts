import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DonsMySuffix } from 'app/shared/model/dons-my-suffix.model';
import { DonsMySuffixService } from './dons-my-suffix.service';
import { DonsMySuffixComponent } from './dons-my-suffix.component';
import { DonsMySuffixDetailComponent } from './dons-my-suffix-detail.component';
import { DonsMySuffixUpdateComponent } from './dons-my-suffix-update.component';
import { DonsMySuffixDeletePopupComponent } from './dons-my-suffix-delete-dialog.component';
import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DonsMySuffixResolve implements Resolve<IDonsMySuffix> {
    constructor(private service: DonsMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDonsMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DonsMySuffix>) => response.ok),
                map((dons: HttpResponse<DonsMySuffix>) => dons.body)
            );
        }
        return of(new DonsMySuffix());
    }
}

export const donsRoute: Routes = [
    {
        path: '',
        component: DonsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DonsMySuffixDetailComponent,
        resolve: {
            dons: DonsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DonsMySuffixUpdateComponent,
        resolve: {
            dons: DonsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DonsMySuffixUpdateComponent,
        resolve: {
            dons: DonsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const donsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DonsMySuffixDeletePopupComponent,
        resolve: {
            dons: DonsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
