import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';

type EntityResponseType = HttpResponse<IDegreesMySuffix>;
type EntityArrayResponseType = HttpResponse<IDegreesMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DegreesMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/degrees';

    constructor(private http: HttpClient) {}

    create(degrees: IDegreesMySuffix): Observable<EntityResponseType> {
        return this.http.post<IDegreesMySuffix>(this.resourceUrl, degrees, { observe: 'response' });
    }

    update(degrees: IDegreesMySuffix): Observable<EntityResponseType> {
        return this.http.put<IDegreesMySuffix>(this.resourceUrl, degrees, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDegreesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDegreesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
