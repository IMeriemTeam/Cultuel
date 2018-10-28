import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';

type EntityResponseType = HttpResponse<IPrecheMySuffix>;
type EntityArrayResponseType = HttpResponse<IPrecheMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PrecheMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/preches';

    constructor(private http: HttpClient) {}

    create(preche: IPrecheMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(preche);
        return this.http
            .post<IPrecheMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(preche: IPrecheMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(preche);
        return this.http
            .put<IPrecheMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPrecheMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPrecheMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(preche: IPrecheMySuffix): IPrecheMySuffix {
        const copy: IPrecheMySuffix = Object.assign({}, preche, {
            date: preche.date != null && preche.date.isValid() ? preche.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((preche: IPrecheMySuffix) => {
            preche.date = preche.date != null ? moment(preche.date) : null;
        });
        return res;
    }
}
