/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DonsMySuffixService } from 'app/entities/dons-my-suffix/dons-my-suffix.service';
import { IDonsMySuffix, DonsMySuffix } from 'app/shared/model/dons-my-suffix.model';

describe('Service Tests', () => {
    describe('DonsMySuffix Service', () => {
        let injector: TestBed;
        let service: DonsMySuffixService;
        let httpMock: HttpTestingController;
        let elemDefault: IDonsMySuffix;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DonsMySuffixService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new DonsMySuffix(0, 0, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateDons: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a DonsMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateDons: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateDons: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new DonsMySuffix(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DonsMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        don: 1,
                        dateDons: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateDons: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of DonsMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        don: 1,
                        dateDons: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateDons: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a DonsMySuffix', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
