import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';

@Component({
    selector: 'jhi-preche-my-suffix-detail',
    templateUrl: './preche-my-suffix-detail.component.html'
})
export class PrecheMySuffixDetailComponent implements OnInit {
    preche: IPrecheMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preche }) => {
            this.preche = preche;
        });
    }

    previousState() {
        window.history.back();
    }
}
