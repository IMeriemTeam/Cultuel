import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';

type EntityResponseType = HttpResponse<IMethodsMySuffix>;
type EntityArrayResponseType = HttpResponse<IMethodsMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MethodsMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/methods';

    constructor(private http: HttpClient) {}

    create(methods: IMethodsMySuffix): Observable<EntityResponseType> {
        return this.http.post<IMethodsMySuffix>(this.resourceUrl, methods, { observe: 'response' });
    }

    update(methods: IMethodsMySuffix): Observable<EntityResponseType> {
        return this.http.put<IMethodsMySuffix>(this.resourceUrl, methods, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMethodsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMethodsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
