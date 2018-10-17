import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';

@Component({
    selector: 'jhi-degrees-my-suffix-detail',
    templateUrl: './degrees-my-suffix-detail.component.html'
})
export class DegreesMySuffixDetailComponent implements OnInit {
    degrees: IDegreesMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ degrees }) => {
            this.degrees = degrees;
        });
    }

    previousState() {
        window.history.back();
    }
}
