import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';
import { DegreesMySuffixService } from './degrees-my-suffix.service';
import { DegreesMySuffixComponent } from './degrees-my-suffix.component';
import { DegreesMySuffixDetailComponent } from './degrees-my-suffix-detail.component';
import { DegreesMySuffixUpdateComponent } from './degrees-my-suffix-update.component';
import { DegreesMySuffixDeletePopupComponent } from './degrees-my-suffix-delete-dialog.component';
import { IDegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DegreesMySuffixResolve implements Resolve<IDegreesMySuffix> {
    constructor(private service: DegreesMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((degrees: HttpResponse<DegreesMySuffix>) => degrees.body));
        }
        return of(new DegreesMySuffix());
    }
}

export const degreesRoute: Routes = [
    {
        path: 'degrees-my-suffix',
        component: DegreesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'degrees-my-suffix/:id/view',
        component: DegreesMySuffixDetailComponent,
        resolve: {
            degrees: DegreesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'degrees-my-suffix/new',
        component: DegreesMySuffixUpdateComponent,
        resolve: {
            degrees: DegreesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'degrees-my-suffix/:id/edit',
        component: DegreesMySuffixUpdateComponent,
        resolve: {
            degrees: DegreesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const degreesPopupRoute: Routes = [
    {
        path: 'degrees-my-suffix/:id/delete',
        component: DegreesMySuffixDeletePopupComponent,
        resolve: {
            degrees: DegreesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
