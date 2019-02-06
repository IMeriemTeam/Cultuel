import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'jhi-prayer-my-suffix',
    templateUrl: './prayer-my-suffix.component.html',
    styleUrls: ['prayer.css']
})
export class PrayerMySuffixComponent implements OnInit {
    prayers: any;
    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.getPrayers();
    }

    getPrayers() {
        // https://muslimsalat.com/antibes/monthly.json?key=3a08715f449abd18920fdeacbb7d6d50
        this.http
            .get('http://api.aladhan.com/v1/calendarByCity?city=antibesd&country=France&method=2&month=01&year=2019')
            .subscribe(data => {
                this.prayers = data;
                console.log(data);
                console.log(this.prayers);
            });
    }
}
