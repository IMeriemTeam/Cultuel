import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrayerMySuffix } from 'app/shared/model/prayer-my-suffix.model';

@Component({
    selector: 'jhi-prayer-my-suffix-detail',
    templateUrl: './prayer-my-suffix-detail.component.html'
})
export class PrayerMySuffixDetailComponent implements OnInit {
    prayer: IPrayerMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prayer }) => {
            this.prayer = prayer;
        });
    }

    previousState() {
        window.history.back();
    }
}
