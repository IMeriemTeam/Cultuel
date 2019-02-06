import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDonsMySuffix } from 'app/shared/model/dons-my-suffix.model';

@Component({
    selector: 'jhi-dons-my-suffix-detail',
    templateUrl: './dons-my-suffix-detail.component.html'
})
export class DonsMySuffixDetailComponent implements OnInit {
    dons: IDonsMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dons }) => {
            this.dons = dons;
        });
    }

    previousState() {
        window.history.back();
    }
}
