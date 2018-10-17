import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';

type EntityResponseType = HttpResponse<IPrayerMySuffix>;
type EntityArrayResponseType = HttpResponse<IPrayerMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PrayerMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/prayers';

    constructor(private http: HttpClient) {}

    create(prayer: IPrayerMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPrayerMySuffix>(this.resourceUrl, prayer, { observe: 'response' });
    }

    update(prayer: IPrayerMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPrayerMySuffix>(this.resourceUrl, prayer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPrayerMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrayerMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
