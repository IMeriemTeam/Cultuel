import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';

@Component({
    selector: 'jhi-methods-my-suffix-detail',
    templateUrl: './methods-my-suffix-detail.component.html'
})
export class MethodsMySuffixDetailComponent implements OnInit {
    methods: IMethodsMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ methods }) => {
            this.methods = methods;
        });
    }

    previousState() {
        window.history.back();
    }
}
