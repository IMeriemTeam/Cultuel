import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';
import { MethodsMySuffixService } from './methods-my-suffix.service';
import { MethodsMySuffixComponent } from './methods-my-suffix.component';
import { MethodsMySuffixDetailComponent } from './methods-my-suffix-detail.component';
import { MethodsMySuffixUpdateComponent } from './methods-my-suffix-update.component';
import { MethodsMySuffixDeletePopupComponent } from './methods-my-suffix-delete-dialog.component';
import { IMethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class MethodsMySuffixResolve implements Resolve<IMethodsMySuffix> {
    constructor(private service: MethodsMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((methods: HttpResponse<MethodsMySuffix>) => methods.body));
        }
        return of(new MethodsMySuffix());
    }
}

export const methodsRoute: Routes = [
    {
        path: 'methods-my-suffix',
        component: MethodsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'methods-my-suffix/:id/view',
        component: MethodsMySuffixDetailComponent,
        resolve: {
            methods: MethodsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'methods-my-suffix/new',
        component: MethodsMySuffixUpdateComponent,
        resolve: {
            methods: MethodsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'methods-my-suffix/:id/edit',
        component: MethodsMySuffixUpdateComponent,
        resolve: {
            methods: MethodsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const methodsPopupRoute: Routes = [
    {
        path: 'methods-my-suffix/:id/delete',
        component: MethodsMySuffixDeletePopupComponent,
        resolve: {
            methods: MethodsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
