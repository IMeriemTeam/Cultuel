import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArticlesTrue } from 'app/shared/model/articles-true.model';
import { ArticlesTrueService } from './articles-true.service';
import { ArticlesTrueComponent } from './articles-true.component';
import { ArticlesTrueDetailComponent } from './articles-true-detail.component';
import { ArticlesTrueUpdateComponent } from './articles-true-update.component';
import { ArticlesTrueDeletePopupComponent } from './articles-true-delete-dialog.component';
import { IArticlesTrue } from 'app/shared/model/articles-true.model';

@Injectable({ providedIn: 'root' })
export class ArticlesTrueResolve implements Resolve<IArticlesTrue> {
    constructor(private service: ArticlesTrueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticlesTrue> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ArticlesTrue>) => response.ok),
                map((articles: HttpResponse<ArticlesTrue>) => articles.body)
            );
        }
        return of(new ArticlesTrue());
    }
}

export const articlesRoute: Routes = [
    {
        path: '',
        component: ArticlesTrueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.articles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ArticlesTrueDetailComponent,
        resolve: {
            articles: ArticlesTrueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.articles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ArticlesTrueUpdateComponent,
        resolve: {
            articles: ArticlesTrueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.articles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ArticlesTrueUpdateComponent,
        resolve: {
            articles: ArticlesTrueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.articles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articlesPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ArticlesTrueDeletePopupComponent,
        resolve: {
            articles: ArticlesTrueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cultuelApp.articles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
