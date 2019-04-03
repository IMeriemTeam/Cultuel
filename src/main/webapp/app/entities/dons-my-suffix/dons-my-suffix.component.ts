import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';
import { DonsMySuffix } from 'app/shared/model/dons-my-suffix.model';

import { AccountService } from 'app/core';
import { DonsMySuffixService } from './dons-my-suffix.service';
import * as moment from 'moment';

declare let paypal: any;

@Component({
    selector: 'jhi-dons-my-suffix',
    templateUrl: './dons-my-suffix.component.html'
})
export class DonsMySuffixComponent implements OnInit, OnDestroy {
    dons: IDonsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    /** paypal code **/
    paypalPayment: IDonsMySuffix = new DonsMySuffix(null, null, moment(), 'Action2', 1);

    message: string;
    isSaving: boolean;
    addScript = false;
    paypalLoad = true;

    constructor(
        protected donsService: DonsMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.donsService
            .query()
            .pipe(
                filter((res: HttpResponse<IDonsMySuffix[]>) => res.ok),
                map((res: HttpResponse<IDonsMySuffix[]>) => res.body)
            )
            .subscribe(
                (res: IDonsMySuffix[]) => {
                    this.dons = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDons();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDonsMySuffix) {
        return item.id;
    }

    registerChangeInDons() {
        this.eventSubscriber = this.eventManager.subscribe('donsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    /** Paypal code **/

    ngAfterViewChecked() {
        if (!this.addScript) {
            this.addPaypalScript().then(() => {
                const _this = this;
                paypal
                    .Buttons({
                        createOrder(data, actions) {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: '100'
                                        }
                                    }
                                ]
                            });
                        },
                        onApprove(data, actions) {
                            // Capture the funds from the transaction
                            actions.order.capture().then(function(details) {
                                // Show a success message to your buyer
                                alert('Transaction completed by ' + details.payer.name.given_name);
                                _this.isSaving = true;
                                _this.paypalPayment.don = details.purchase_units[0].amount.value;
                                _this.paypalPayment.dateDons = moment();
                                console.log('don' + _this.paypalPayment.don);
                                console.log('dateDons' + _this.paypalPayment.dateDons);

                                //                            _this.paypalPayment.idPayment = details.id;
                                //                            _this.paypalPayment.currency = details.purchase_units[0].amount.currency_code;
                                //                            _this.paypalPayment.email = details.payer.email_address;
                                //                            _this.paypalPayment.name = details.purchase_units[0].shipping.name.full_name;
                                //                            _this.paypalPayment.status = details.status;
                                _this.accountService
                                    .fetch()
                                    .toPromise()
                                    .then(response => {
                                        const account = response.body;
                                        //                                    if (account) {
                                        //                                        _this.paypalPayment.donsUserId = account.identity();
                                        //                                    }
                                        console.log('paypalPayment' + _this.paypalPayment);
                                        _this.subscribeToSaveResponse(_this.donsService.create(_this.paypalPayment));
                                    });
                            });
                        }
                    })
                    .render('#paypal-checkout-btn');
                this.paypalLoad = false;
            });
        }
    }

    addPaypalScript() {
        this.addScript = true;
        return new Promise((resolve, reject) => {
            const scripttagElement = document.createElement('script');
            //scripttagElement.src = 'https://www.paypal.com/sdk/js?client-id=sb';
            scripttagElement.src =
                'https://www.paypal.com/sdk/js?client-id=AdbH0P_aaiaVqu-FSjGlysVGc6AHyeuxZoRWxyhRjh0gAGZjWFajIZQV7lyDkOJFjgvbpXcWCMQuV1Q0&currency=EUR';

            // last paypal script (before february 2019)
            // scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
            scripttagElement.onload = resolve;
            document.body.appendChild(scripttagElement);
        });
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDonsMySuffix>>) {
        console.log('result' + result);

        result.subscribe((res: HttpResponse<IDonsMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        console.log('Payment success with entity creation.');
        this.loadAll();
    }

    protected onSaveError() {
        this.isSaving = false;
        console.log('Fail to create payment entity.');
    }
}
