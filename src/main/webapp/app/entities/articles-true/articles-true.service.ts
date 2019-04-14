import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArticlesTrue } from 'app/shared/model/articles-true.model';

type EntityResponseType = HttpResponse<IArticlesTrue>;
type EntityArrayResponseType = HttpResponse<IArticlesTrue[]>;

@Injectable({ providedIn: 'root' })
export class ArticlesTrueService {
    public resourceUrl = SERVER_API_URL + 'api/articles';

    constructor(protected http: HttpClient) {}

    create(articles: IArticlesTrue): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(articles);
        return this.http
            .post<IArticlesTrue>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(articles: IArticlesTrue): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(articles);
        return this.http
            .put<IArticlesTrue>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IArticlesTrue>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IArticlesTrue[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(articles: IArticlesTrue): IArticlesTrue {
        const copy: IArticlesTrue = Object.assign({}, articles, {
            date: articles.date != null && articles.date.isValid() ? articles.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((articles: IArticlesTrue) => {
                articles.date = articles.date != null ? moment(articles.date) : null;
            });
        }
        return res;
    }
}
