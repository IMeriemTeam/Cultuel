import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';

type EntityResponseType = HttpResponse<IDonsMySuffix>;
type EntityArrayResponseType = HttpResponse<IDonsMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DonsMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/dons';

    constructor(private http: HttpClient) {}

    create(dons: IDonsMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dons);
        return this.http
            .post<IDonsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(dons: IDonsMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dons);
        return this.http
            .put<IDonsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDonsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDonsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(dons: IDonsMySuffix): IDonsMySuffix {
        const copy: IDonsMySuffix = Object.assign({}, dons, {
            dateDons: dons.dateDons != null && dons.dateDons.isValid() ? dons.dateDons.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateDons = res.body.dateDons != null ? moment(res.body.dateDons) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((dons: IDonsMySuffix) => {
            dons.dateDons = dons.dateDons != null ? moment(dons.dateDons) : null;
        });
        return res;
    }
}
