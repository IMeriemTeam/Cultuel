import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        return this.http.post<IDonsMySuffix>(this.resourceUrl, dons, { observe: 'response' });
    }

    update(dons: IDonsMySuffix): Observable<EntityResponseType> {
        return this.http.put<IDonsMySuffix>(this.resourceUrl, dons, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDonsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDonsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
